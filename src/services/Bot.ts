import * as _ from "lodash"
import Bag from "./Bag";
import CardDeck from "./CardDeck";
import Action from "./enum/Action";
import DifficultyLevel from "./enum/DifficultyLevel"
import Direction from "./enum/Direction";
import Follower from "./enum/Follower";

/**
 * Picks follower tile and determines the actions based on the currend card and difficulty level.
 */
export default class Bot {

  private _cardDeck : CardDeck
  private _bag : Bag
  private _difficultyLevel : DifficultyLevel
  private _selectedIndex : number
  private _townNumber : number
  private _actions : Action[]
  private _monkBonusActions : Action[]

  constructor(cardDeck : CardDeck, bag : Bag, difficultyLevel : DifficultyLevel) {
    this._cardDeck = cardDeck
    this._bag = bag
    this._difficultyLevel = difficultyLevel
    this._selectedIndex = Bot.selectTile(this._cardDeck, this._bag)
    this._townNumber = this._cardDeck.activeCard.townNumber
    this._actions = Bot.getActions(this._cardDeck, this._bag.available[this._selectedIndex], this._difficultyLevel)
    this._monkBonusActions = Bot.getMonkBonusActions(this._cardDeck)
  }

  /**
   * Tile index selected by bot.
   */
  public get selectedIndex() : number {
    return this._selectedIndex
  }

  /**
   * Town number for trading station action.
   */
  public get townNumber() : number {
    return this._townNumber
  }

  /**
   * Bot actions
   */
   public get actions() : Action[] {
    return this._actions
  }

  /**
   * Monk bonus actions
   */
   public get monkBonusActions() : Action[] {
    return this._monkBonusActions
  }

  private static selectTile(cardDeck : CardDeck, bag : Bag) : number {
    // get list of preferred follower tiles - listed downwards or upwards
    const followerActions = _.clone(cardDeck.activeCard.followerActions)
    if (cardDeck.nextCard.direction == Direction.UP) {
      _.reverse(followerActions)
    }
    // find first matching
    const followerAction = followerActions.find(item => bag.available.includes(item.follower))
    if (!followerAction) {
      throw new Error('Found no matching follower tile.')
    }
    return bag.available.indexOf(followerAction.follower)
  }

  private static getActions(cardDeck : CardDeck, follower : Follower, difficultyLevel : DifficultyLevel) : Action[] {
    const result = []

    // add action if there is a dedicated track for this type of follower
    const actionForFollower = Bot.followerToAction(follower)
    if (actionForFollower) {
      result.push(actionForFollower)
    }

    // add actions from card
    const followerAction = cardDeck.activeCard.followerActions.find(item => item.follower == follower)
    if (!followerAction) {
      throw new Error("No follower action: " + follower)
    }
    followerAction.actions
        // filter out MONK actions on EASY difficulty level
        .filter(item => item!=Action.MONK || difficultyLevel!=DifficultyLevel.EASY)
        .forEach(action => {
          // translate MONK action to action depicted on next card
          if (action == Action.MONK) {
            result.push(...Bot.getMonkBonusActions(cardDeck))
          }
          // add standard actions
          else {
            result.push(action)
          }
        })

    return result
  }

  private static getMonkBonusActions(cardDeck : CardDeck) : Action[] {
    const result = []

    // add action if there is a dedicated track for this type of follower
    const actionForFollower = Bot.followerToAction(cardDeck.nextCard.monkFollower)
    if (actionForFollower) {
      result.push(actionForFollower)
    }

    // add monk bonus action
    result.push(cardDeck.nextCard.monkAction)

    return result
  }

  private static followerToAction(follower : Follower) : Action|undefined {
    switch (follower) {
      case Follower.FARMER:
        return Action.FARMER_TRACK
      case Follower.BOATMAN:
        return Action.BOATMAN_TRACK
      case Follower.KNIGHT:
        return Action.KNIGHT_TRACK
      case Follower.SCHOLAR:
        return Action.SCHOLAR_TRACK
      default:
        return undefined
    }
  }

}
