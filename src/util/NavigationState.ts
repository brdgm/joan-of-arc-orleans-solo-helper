import DifficultyLevel from "@/services/enum/DifficultyLevel"
import { State } from "@/store"
import { RouteLocation } from "vue-router"
import { Store } from "vuex"
import CardDeck from "@/services/CardDeck"
import Bag from "@/services/Bag"
import Bot from "@/services/Bot"

export default class NavigationState {

  readonly difficultyLevel : DifficultyLevel
  readonly round : number
  readonly tile : number
  readonly cardDeck : CardDeck
  readonly bag : Bag
  readonly bot? : Bot

  constructor(route : RouteLocation, store : Store<State>) {    
    const setup = store.state.setup
    this.difficultyLevel = setup.difficultyLevel

    this.round = parseInt(route.params['round'] as string)
    this.tile = parseInt(route.params['tile'] as string)
    this.cardDeck = NavigationState.getCardDeck(this.round, this.difficultyLevel, store)
    this.bag = NavigationState.getBag(this.round, this.tile, store)

    if (this.isBotTurn) {
      this.bot = new Bot(this.cardDeck, this.bag, this.difficultyLevel)
    }
  }

  public get isPlayerTurn() : boolean {
    // player draws 1,3,5 in all uneven turns
    if (this.round % 2 != 0) {
      return this.tile % 2 != 0
    }
    else {
      return this.tile % 2 == 0
    }
  }

  public get isBotTurn() : boolean {
    return !this.isPlayerTurn
  }

  private static getCardDeck(round : number, difficultyLevel: DifficultyLevel, store : Store<State>) : CardDeck {
    let cardDeck
    const currentRound = store.state.rounds.find(item => item.round==round)
    if (currentRound) {
      cardDeck = CardDeck.fromPersistence(currentRound.cardDeck)
    }
    else {
      const previousRound = store.state.rounds.find(item => item.round==round-1)
      if (previousRound) {
        cardDeck = CardDeck.fromPersistence(previousRound.cardDeck)
      }
      else {
        cardDeck = CardDeck.new(difficultyLevel)
      }
      cardDeck.draw()
      store.commit('round', {round:round,cardDeck:cardDeck.toPersistence(),tiles:[]})
    }
    return cardDeck
  }

  private static getBag(round : number, tile : number, store : Store<State>) : Bag {
    let bag
    const currentTile = store.state.tiles.find(item => item.round == round && item.tile == tile)
    if (currentTile) {
      bag = Bag.fromPersistence(currentTile.bag)
    }
    else {
      bag = Bag.new()
      bag.draw(5)
      store.commit('tile', {round:round,tile:tile,bag:bag.toPersistence()})
    }
    return bag
  }

}
