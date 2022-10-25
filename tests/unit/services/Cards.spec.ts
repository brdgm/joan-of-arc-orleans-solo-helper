import Cards from '@/services/Cards'
import { expect } from 'chai'

describe('Cards', () => {
  it('get', () => {
    const card = Cards.get('1B')

    expect(card).not.undefined
    expect(card?.id).to.eq('1B')
  })

  it('getAll', () => {
    const cards = Cards.getAll()

    expect(cards.length).eq(18)
  })
})
