import { CardDeckPersistence } from '@/store'
import * as _ from 'lodash'
import Card from './Card'
import Cards from './Cards'
import DifficultyLevel from './enum/DifficultyLevel'

/**
 * Deck of automa cards.
 */
export default class CardDeck {

  private _deck : Card[]
  private _discard : Card[]

  public constructor(deck : Card[], discard : Card[]) {
    this._deck = deck
    this._discard = discard
  }

  public get deck() : readonly Card[] {
    return this._deck
  }

  public get discard() : readonly Card[] {
    return this._discard
  }

  public get activeCard() : Card {
    return this._discard[0]
  }

  public get nextCard() : Card {
    return this._deck[0]
  }

  /**
   * Gets persistence view of card deck.
   */
  public toPersistence() : CardDeckPersistence {
    return {
      deck: this._deck.map(card => card.id),
      discard: this._discard.map(card => card.id)      
    }
  }

  /**
   * Draw next card.
   */
  public draw() : void {
    const drawnCard = this._deck.shift()
    if (drawnCard) {
      this._discard.unshift(drawnCard)
    }
    else {
      throw new Error('No card left in deck.')
    }
  }

  /**
   * Creates a shuffled new card deck for the given difficulty level.
   */
  public static new(difficultyLevel : DifficultyLevel) : CardDeck {
    let deck = Cards.getAll(difficultyLevel)
    deck = _.shuffle(deck)
    return new CardDeck(deck, [])
  }

  /**
   * Re-creates a card deck from persistence.
   */
  public static fromPersistence(persistence : CardDeckPersistence) : CardDeck {
    return new CardDeck(
      persistence.deck.map(Cards.get),
      persistence.discard.map(Cards.get)
    )
  }

}
