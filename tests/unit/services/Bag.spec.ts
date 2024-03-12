import Bag from '@/services/Bag'
import Follower from '@/services/enum/Follower'
import { expect } from 'chai'

describe('Bag', () => {
  it('new', () => {
    const bag = Bag.new()

    expect(bag.inside.length, 'inside initial').to.eq(25)
    expect(bag.available.length, 'available initial').to.eq(0)
    expect(bag.chosenPlayer.length, 'chosenPlayer initial').to.eq(0)
    expect(bag.chosenBot.length, 'chosenBot initial').to.eq(0)
    expect(bag.discard.length, 'discard initial').to.eq(2)
  })

  it('drawChooseDiscard', () => {
    const bag = Bag.fromPersistence({
      inside: [Follower.FARMER,Follower.BOATMAN,Follower.CRAFTSMAN,Follower.FARMER,Follower.KNIGHT,Follower.SCHOLAR,Follower.FARMER],
      available: [],
      chosenPlayer: [],
      chosenBot: [],
      discard: [Follower.TRADER]
    })

    let inside = bag.getInsidePerFollower()
    expect(inside.get(Follower.FARMER)).to.eq(3)
    expect(inside.get(Follower.BOATMAN)).to.eq(1)
    expect(inside.get(Follower.SCHOLAR)).to.eq(1)

    bag.draw(5)

    expect(bag.inside).to.eql([Follower.SCHOLAR,Follower.FARMER])
    expect(bag.available).to.eql([Follower.FARMER,Follower.BOATMAN,Follower.CRAFTSMAN,Follower.FARMER,Follower.KNIGHT])
    expect(bag.chosenPlayer).to.eql([])
    expect(bag.chosenBot).to.eql([])
    expect(bag.discard).to.eql([Follower.TRADER])

    bag.chooseTilePlayer(Follower.BOATMAN)
    bag.chooseTileBot(Follower.FARMER)
    bag.chooseTilePlayer(Follower.KNIGHT)
    bag.chooseTileBot(Follower.FARMER)
    bag.chooseTilePlayer(Follower.CRAFTSMAN)

    expect(bag.inside).to.eql([Follower.SCHOLAR,Follower.FARMER])
    expect(bag.available).to.eql([])
    expect(bag.chosenPlayer).to.eql([Follower.BOATMAN,Follower.KNIGHT,Follower.CRAFTSMAN])
    expect(bag.chosenBot).to.eql([Follower.FARMER,Follower.FARMER])
    expect(bag.discard).to.eql([Follower.TRADER])

    inside = bag.getInsidePerFollower()
    expect(inside.get(Follower.FARMER)).to.eq(1)
    expect(inside.get(Follower.BOATMAN)).to.undefined
    expect(inside.get(Follower.SCHOLAR)).to.eq(1)

    bag.discardAll()

    expect(bag.inside).to.eql([Follower.SCHOLAR,Follower.FARMER])
    expect(bag.available).to.eql([])
    expect(bag.chosenPlayer).to.eql([])
    expect(bag.chosenBot).to.eql([])
    expect(bag.discard).to.eql([Follower.TRADER,Follower.BOATMAN,Follower.KNIGHT,Follower.CRAFTSMAN,Follower.FARMER,Follower.FARMER])
  })
})
