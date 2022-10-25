import Bag from '@/services/Bag'
import Bot from '@/services/Bot'
import CardDeck from '@/services/CardDeck'
import Action from '@/services/enum/Action'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Follower from '@/services/enum/Follower'
import { expect } from 'chai'

describe('Bot', () => {
  it('actions-1-2-CRAFTSMAN', () => {
    const bot = setupBot(DifficultyLevel.EASY, '1', '2',
        [Follower.FARMER,Follower.BOATMAN,Follower.CRAFTSMAN,Follower.FARMER,Follower.KNIGHT,Follower.SCHOLAR])

    expect(bot.selectedIndex).to.eq(2)  // CRAFTSMAN
    expect(bot.townNumber).to.eq(1)
    expect(bot.actions).to.eql([Action.TRADING_STATION])
  })

  it('actions-2-1-TRADER', () => {
    const bot = setupBot(DifficultyLevel.EASY, '2', '1',
        [Follower.FARMER,Follower.TRADER,Follower.CRAFTSMAN,Follower.FARMER,Follower.KNIGHT,Follower.SCHOLAR])

    expect(bot.selectedIndex).to.eq(1)  // TRADER
    expect(bot.actions).to.eql([Action.PLACE_CARDS_1,Action.SHIELD])
  })

  it('actions-2-4-FARMER-EASY', () => {
    const bot = setupBot(DifficultyLevel.EASY, '2', '4',
        [Follower.FARMER,Follower.TRADER,Follower.CRAFTSMAN,Follower.FARMER,Follower.KNIGHT,Follower.SCHOLAR])

    expect(bot.selectedIndex).to.eq(0)  // FARMER
    expect(bot.actions).to.eql([Action.FARMER_TRACK])
  })

  it('actions-2-4-FARMER-MEDIUM', () => {
    const bot = setupBot(DifficultyLevel.MEDIUM, '2', '4',
        [Follower.FARMER,Follower.TRADER,Follower.CRAFTSMAN,Follower.FARMER,Follower.KNIGHT,Follower.SCHOLAR])

    expect(bot.selectedIndex).to.eq(0)  // FARMER
    expect(bot.actions).to.eql([Action.FARMER_TRACK,Action.KNIGHT_TRACK,Action.SHIELD])
  })

  it('actions-4-13-FARMER-HARD', () => {
    const bot = setupBot(DifficultyLevel.HARD, '4', '13',
        [Follower.FARMER,Follower.TRADER,Follower.CRAFTSMAN,Follower.FARMER,Follower.KNIGHT,Follower.SCHOLAR])

    expect(bot.selectedIndex).to.eq(4)  // KNIGHT
    expect(bot.townNumber).to.eq(4)
    expect(bot.actions).to.eql([Action.KNIGHT_TRACK,Action.TRADING_STATION])
  })

  function setupBot(difficultyLevel: DifficultyLevel, activeCard: string, nextCard: string,
      availableFollowers: Follower[]) : Bot {
    return new Bot(
      CardDeck.fromPersistence({deck:[nextCard],discard:[activeCard]}),
      Bag.fromPersistence({inside:[],available:availableFollowers,chosenPlayer:[],chosenBot:[],discard:[]}),
      difficultyLevel)
  }

})
