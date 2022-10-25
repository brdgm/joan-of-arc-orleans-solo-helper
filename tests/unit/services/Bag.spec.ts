import Bag from '@/services/Bag'
import { expect } from 'chai'

describe('Bag', () => {
  it('new', () => {
    const bag = Bag.new()

    expect(bag.inside.length, 'inside initial').to.eq(25)
    expect(bag.active.length, 'active initial').to.eq(0)
    expect(bag.holding.length, 'holding initial').to.eq(2)

    bag.draw(5)

    expect(bag.inside.length, 'inside after draw').to.eq(20)
    expect(bag.active.length, 'active after draw').to.eq(5)
    expect(bag.holding.length, 'holding after draw').to.eq(2)

    bag.discard(bag.active[4])

    expect(bag.inside.length, 'inside after discard').to.eq(20)
    expect(bag.active.length, 'active after discard').to.eq(4)
    expect(bag.holding.length, 'holding after discard').to.eq(3)
  })
})
