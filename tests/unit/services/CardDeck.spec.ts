import CardDeck from '@/services/CardDeck'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { expect } from 'chai'

describe('CardDeck', () => {
  it('new', () => {
    const cardDeck = CardDeck.new(DifficultyLevel.EASY)

    expect(cardDeck.deck.length, 'deck size').to.eq(14)
    expect(cardDeck.discard.length, 'discard size').to.eq(0)

    cardDeck.draw()

    expect(cardDeck.deck.length, 'deck size').to.eq(13)
    expect(cardDeck.discard.length, 'discard size').to.eq(1)
    expect(cardDeck.activeCard, 'active card').to.not.null
    expect(cardDeck.nextCard, 'next card').to.not.null
  })
})
