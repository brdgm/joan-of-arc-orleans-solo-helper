import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { State } from '@/store'
import { RouteLocation } from 'vue-router'
import { Store } from 'vuex'
import CardDeck from '@/services/CardDeck'
import Bag from '@/services/Bag'
import Bot from '@/services/Bot'

export default class NavigationState {

  readonly difficultyLevel : DifficultyLevel
  readonly round : number
  readonly tile : number
  readonly bag : Bag
  readonly cardDeck? : CardDeck
  readonly bot? : Bot

  constructor(route : RouteLocation, store : Store<State>) {    
    const setup = store.state.setup
    this.difficultyLevel = setup.difficultyLevel

    this.round = parseInt(route.params['round'] as string)
    this.tile = parseInt(route.params['tile'] as string)
    this.bag = NavigationState.getBag(this.round, this.tile, store)

    if (this.isBotTurn) {
      this.cardDeck = NavigationState.getCardDeck(this.round, this.tile, this.difficultyLevel, store)
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

  private static getCardDeck(round : number, tile : number, difficultyLevel: DifficultyLevel, store : Store<State>) : CardDeck {
    let cardDeck
    const currentTurn = store.state.botTurns.find(item => item.round == round && item.tile == tile)
    if (currentTurn) {
      cardDeck = CardDeck.fromPersistence(currentTurn.cardDeck)
    }
    else {
      cardDeck = CardDeck.new(difficultyLevel)
      cardDeck.draw()
      store.commit('botTurn', {round:round,tile:tile,cardDeck:cardDeck.toPersistence()})
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
