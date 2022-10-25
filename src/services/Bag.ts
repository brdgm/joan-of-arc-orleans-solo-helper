import { BagPersistence } from "@/store"
import * as _ from "lodash"
import Follower from "./enum/Follower"

/**
 * Bag with follower tiles.
 * Also manages the available and chosen tiles by player/bot, and the discard (holding) area.
 */
export default class Bag {

  private _inside : Follower[]
  private _available : Follower[]
  private _chosenPlayer : Follower[]
  private _chosenBot : Follower[]
  private _discard : Follower[]

  public constructor(inside : Follower[], available : Follower[], chosenPlayer : Follower[], chosenBot : Follower[], discard : Follower[]) {
    this._inside = inside
    this._available = available
    this._chosenPlayer = chosenPlayer
    this._chosenBot = chosenBot
    this._discard = discard
  }

  public get inside() : readonly Follower[] {
    return this._inside
  }

  public get available() : readonly Follower[] {
    return this._available
  }

  public get chosenPlayer() : readonly Follower[] {
    return this._chosenPlayer
  }

  public get chosenBot() : readonly Follower[] {
    return this._chosenBot
  }

  public get discard() : readonly Follower[] {
    return this._discard
  }

  /**
   * Gets persistence view of bag.
   */
  public toPersistence() : BagPersistence {
    return {
      inside: this._inside.map(follower => follower.toString()),
      available: this._available.map(follower => follower.toString()),
      chosenPlayer: this._chosenPlayer.map(follower => follower.toString()),
      chosenBot: this._chosenBot.map(follower => follower.toString()),
      discard: this._discard.map(follower => follower.toString())
    }
  }

  /**
   * Draw tiles.
   * @param count Number of tiles
   */
  public draw(count : number) : void {
    for (let i=0; i<count; i++) {
      const tile = this._inside.shift()
      if (tile) {
        this._available.push(tile)
      }
      else {
        throw new Error('No tile left in bag.')
      }
    }
  }

  /**
   * Choose a tile for the player.
   * @param follower follower
   */
  public chooseTilePlayer(follower : Follower) : void {
    Bag.chooseTile(follower, this._available, this._chosenPlayer)
  }

  /**
   * Choose a tile for the bot.
   * @param follower follower
   */
  public chooseTileBot(follower : Follower) : void {
    Bag.chooseTile(follower, this._available, this._chosenBot)
  }

  private static chooseTile(follower : Follower, available : Follower[], chosen : Follower[]) : void {
    const index = available.indexOf(follower)
    if (index < 0) {
      throw new Error("Tile not available: " + follower)
    }
    available.splice(index, 1)
    chosen.push(follower)
  }

  /**
   * Discard all tiles.
   */
  public discardAll() : void {
    this._discard.push(...this._available)
    this._discard.push(...this._chosenPlayer)
    this._discard.push(...this._chosenBot)
    this._available = []
    this._chosenPlayer = []
    this._chosenBot = []
  }

  /**
   * Creates a shuffled new card deck for the given difficulty level.
   */
  public static new() : Bag {
    let inside = [
      Follower.FARMER,Follower.FARMER,Follower.FARMER,Follower.FARMER,
      Follower.CRAFTSMAN,Follower.CRAFTSMAN,Follower.CRAFTSMAN,Follower.CRAFTSMAN,Follower.CRAFTSMAN,
      Follower.BOATMAN,Follower.BOATMAN,Follower.BOATMAN,Follower.BOATMAN,
      Follower.TRADER,Follower.TRADER,Follower.TRADER,Follower.TRADER,Follower.TRADER,
      Follower.KNIGHT,Follower.KNIGHT,Follower.KNIGHT,Follower.KNIGHT,
      Follower.SCHOLAR,Follower.SCHOLAR,Follower.SCHOLAR,Follower.SCHOLAR,Follower.SCHOLAR
    ]
    inside = _.shuffle(inside)
    const bag = new Bag(inside, [], [], [], [])
    // draw first two tiles and put to holding
    bag.draw(2)
    bag.discardAll()
    return bag
  }

  /**
   * Re-creates a bag from persistence.
   */
  public static fromPersistence(persistence : BagPersistence) : Bag {
    return new Bag(
      persistence.inside.map(name => name as Follower),
      persistence.available.map(name => name as Follower),
      persistence.chosenPlayer.map(name => name as Follower),
      persistence.chosenBot.map(name => name as Follower),
      persistence.discard.map(name => name as Follower)
    )
  }

}
