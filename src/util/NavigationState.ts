import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { useStateStore } from '@/store/state'
import { RouteLocation } from 'vue-router'
import CardDeck from '@/services/CardDeck'
import Bag from '@/services/Bag'
import Bot from '@/services/Bot'

export default class NavigationState {

  readonly state
  readonly difficultyLevel : DifficultyLevel
  readonly round : number
  readonly tile : number
  readonly bag : Bag
  readonly cardDeck? : CardDeck
  readonly bot? : Bot

  constructor(route : RouteLocation) {
    this.state = useStateStore()
    const setup = this.state.setup
    this.difficultyLevel = setup.difficultyLevel

    this.round = Number.parseInt(route.params['round'] as string)
    this.tile = Number.parseInt(route.params['tile'] as string)
    this.bag = this.getBag(this.round, this.tile)

    if (this.isBotTurn) {
      this.cardDeck = this.getCardDeck(this.round, this.tile, this.difficultyLevel)
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

  private getCardDeck(round : number, tile : number, difficultyLevel: DifficultyLevel) : CardDeck {
    let cardDeck
    const currentTurn = this.state.botTurns.find(item => item.round == round && item.tile == tile)
    if (currentTurn) {
      cardDeck = CardDeck.fromPersistence(currentTurn.cardDeck)
    }
    else {
      cardDeck = CardDeck.new(difficultyLevel)
      cardDeck.draw()
      this.state.botTurn({round:round,tile:tile,cardDeck:cardDeck.toPersistence()})
    }
    return cardDeck
  }

  private getBag(round : number, tile : number) : Bag {
    let bag
    const currentTile = this.state.tiles.find(item => item.round == round && item.tile == tile)
    if (currentTile) {
      bag = Bag.fromPersistence(currentTile.bag)
    }
    else {
      bag = Bag.new()
      bag.draw(5)
      this.state.tile({round:round,tile:tile,bag:bag.toPersistence()})
    }
    return bag
  }

}
