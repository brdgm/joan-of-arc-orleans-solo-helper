import DifficultyLevel from "@/services/enum/DifficultyLevel"
import { Round, State } from "@/store"
import { RouteLocation } from "vue-router"
import { Store } from "vuex"
import CardDeck from "@/services/CardDeck"
import Bag from "@/services/Bag"

export default class NavigationState {

  readonly difficultyLevel : DifficultyLevel
  readonly round : number
  readonly tile : number
  readonly cardDeck : CardDeck
  readonly bag : Bag

  constructor(route : RouteLocation, store : Store<State>) {    
    const setup = store.state.setup
    this.difficultyLevel = setup.difficultyLevel

    this.round = parseInt(route.params['round'] as string)
    this.tile = parseInt(route.params['tile'] as string)
    this.cardDeck = NavigationState.getCardDeck(this.round, this.difficultyLevel, store)
    this.bag = NavigationState.getBag(this.round, this.tile, store)

    // draw new card for first tile, draw from bag
    if (this.tile == 1) {
      this.cardDeck.draw()
      store.commit('round', {round:this.round,cardDeck:this.cardDeck.toPersistence(),tiles:[]})
      this.bag.draw(5)
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
    if (round > 1) {
      const previousRound = store.state.rounds.find(item => item.round==round-1)
      if (previousRound) {
        return CardDeck.fromPersistence(previousRound.cardDeck)
      }
    }
    return CardDeck.new(difficultyLevel)
  }

  private static getBag(round : number, tile : number, store : Store<State>) : Bag {
    if (round > 1 && round != 6) {
      if (tile > 1) {
        const currentRound = store.state.rounds.find(item => item.round==round)
        if (currentRound) {
          const previousTile = currentRound.tiles.find(item => item.tile==tile-1)
          if (previousTile) {
            return Bag.fromPersistence(previousTile.bag)
          }
        }
      }
      const previousRound = store.state.rounds.find(item => item.round==round-1)
      if (previousRound) {
        const previousTile = previousRound.tiles[previousRound.tiles.length-1]
        if (previousTile) {
          return Bag.fromPersistence(previousTile.bag)
        }
      }
    }
    return Bag.new()
  }

}
