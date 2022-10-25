import { BagPersistence } from "@/store"
import * as _ from "lodash"
import Follower from "./enum/Follower"

/**
 * Bag with follower tiles.
 */
export default class Bag {

  private _inside : Follower[]
  private _active : Follower[]
  private _holding : Follower[]

  public constructor(inside : Follower[], active : Follower[], holding : Follower[]) {
    this._inside = inside
    this._active = active
    this._holding = holding
  }

  public get inside() : readonly Follower[] {
    return this._inside
  }

  public get active() : readonly Follower[] {
    return this._active
  }

  public get holding() : readonly Follower[] {
    return this._holding
  }

  /**
   * Gets persistence view of bag.
   */
  public toPersistence() : BagPersistence {
    return {
      inside: this._inside.map(follower => follower.toString()),
      active: this._active.map(follower => follower.toString()),
      holding: this._holding.map(follower => follower.toString())
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
        this._active.push(tile)
      }
      else {
        throw new Error('No tile left in bag.')
      }
    }
  }

  /**
   * Moves tile to holding area
   * @param follower Follower
   */
  public discard(follower : Follower) : void {
    const index = this._active.indexOf(follower)
    if (index >= 0) {
      this._active.splice(index, 1)
      this._holding.push(follower)
    }
    else {
      throw new Error("No tile in active area: " + follower)
    }
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
    const bag = new Bag(inside, [], [])
    // draw first two tiles and put to holding
    for (let i=0; i<2; i++) {
      bag.draw(1)
      bag.discard(bag.active[0])
    }
    return bag
  }

  /**
   * Re-creates a bag from persistence.
   */
  public static fromPersistence(persistence : BagPersistence) : Bag {
    return new Bag(
      persistence.inside.map(name => name as Follower),
      persistence.active.map(name => name as Follower),
      persistence.holding.map(name => name as Follower)
    )
  }

}
