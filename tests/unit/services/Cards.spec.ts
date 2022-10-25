import Cards from '@/services/Cards'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { expect } from 'chai'

describe('Cards', () => {
  it('get', () => {
    const card = Cards.get('1B')

    expect(card).not.undefined
    expect(card?.id).to.eq('1B')
  })

  it('getAll', () => {
    expect(Cards.getAll(DifficultyLevel.EASY).length).eq(14)
    expect(Cards.getAll(DifficultyLevel.MEDIUM).length).eq(14)
    expect(Cards.getAll(DifficultyLevel.HARD).length).eq(14)
  })
})
