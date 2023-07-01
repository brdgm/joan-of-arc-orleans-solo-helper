import findMandatory from 'brdgm-commons/src/util/map/findMandatory';
import Card from './Card';
import Action from './enum/Action';
import DifficultyLevel from './enum/DifficultyLevel';
import Direction from './enum/Direction';
import Follower from './enum/Follower';

const cards = [
  {
    id: '1',
    townNumber: 1,
    direction: Direction.DOWN,
    followerActions: [
      {follower: Follower.KNIGHT, actions: [Action.CITIZEN]},
      {follower: Follower.BOATMAN, actions: [Action.BENEFICAL_DEED_RIGHT]},
      {follower: Follower.FARMER, actions: [Action.MONK]},
      {follower: Follower.TRADER, actions: [Action.PLACE_CARDS_4,Action.SHIELD]},
      {follower: Follower.SCHOLAR, actions: [Action.DEVELOPMENT_LEVEL]},
      {follower: Follower.CRAFTSMAN, actions: [Action.TRADING_STATION]},
    ],
    monkFollower: Follower.FARMER,
    monkAction: Action.SHIELD,
    difficultyLevel: [DifficultyLevel.EASY,DifficultyLevel.MEDIUM]
  },
  {
    id: '2',
    townNumber: 2,
    direction: Direction.UP,
    followerActions: [
      {follower: Follower.BOATMAN, actions: [Action.SHIELD]},
      {follower: Follower.TRADER, actions: [Action.PLACE_CARDS_1,Action.SHIELD]},
      {follower: Follower.KNIGHT, actions: [Action.BENEFICAL_DEED_LEFT]},
      {follower: Follower.SCHOLAR, actions: [Action.PLACE_CARDS_3,Action.SHIELD]},
      {follower: Follower.CRAFTSMAN, actions: [Action.TRADING_STATION]},
      {follower: Follower.FARMER, actions: [Action.MONK]},
    ],
    monkFollower: Follower.CRAFTSMAN,
    monkAction: Action.TRADING_STATION,
    difficultyLevel: [DifficultyLevel.EASY,DifficultyLevel.MEDIUM]
  },
  {
    id: '3',
    townNumber: 3,
    direction: Direction.DOWN,
    followerActions: [
      {follower: Follower.FARMER, actions: [Action.BENEFICAL_DEED_RIGHT]},
      {follower: Follower.SCHOLAR, actions: [Action.MONK]},
      {follower: Follower.CRAFTSMAN, actions: [Action.TRADING_STATION]},
      {follower: Follower.BOATMAN, actions: [Action.SHIELD]},
      {follower: Follower.KNIGHT, actions: [Action.BENEFICAL_DEED_LEFT]},
      {follower: Follower.TRADER, actions: [Action.PLACE_CARDS_4,Action.SHIELD]},
    ],
    monkFollower: Follower.BOATMAN,
    monkAction: Action.SHIELD,
    difficultyLevel: [DifficultyLevel.EASY,DifficultyLevel.MEDIUM]
  },
  {
    id: '4',
    townNumber: 4,
    direction: Direction.UP,
    followerActions: [
      {follower: Follower.KNIGHT, actions: [Action.MONK]},
      {follower: Follower.BOATMAN, actions: [Action.BANK_SHIELD_BONUS]},
      {follower: Follower.FARMER, actions: [Action.SHIELD]},
      {follower: Follower.TRADER, actions: [Action.PLACE_CARDS_3,Action.SHIELD]},
      {follower: Follower.SCHOLAR, actions: [Action.BENEFICAL_DEED_RIGHT]},
      {follower: Follower.CRAFTSMAN, actions: [Action.TRADING_STATION]},
    ],
    monkFollower: Follower.KNIGHT,
    monkAction: Action.SHIELD,
    difficultyLevel: [DifficultyLevel.EASY,DifficultyLevel.MEDIUM]
  },
  {
    id: '5',
    townNumber: 5,
    direction: Direction.DOWN,
    followerActions: [
      {follower: Follower.BOATMAN, actions: [Action.BANK_SHIELD_BONUS]},
      {follower: Follower.TRADER, actions: [Action.PLACE_CARDS_5,Action.SHIELD]},
      {follower: Follower.KNIGHT, actions: [Action.SHIELD]},
      {follower: Follower.SCHOLAR, actions: [Action.DEVELOPMENT_LEVEL]},
      {follower: Follower.CRAFTSMAN, actions: [Action.TRADING_STATION]},
      {follower: Follower.FARMER, actions: [Action.CITIZEN,Action.WAREHOUSE_CITIZEN_BONUS]},
    ],
    monkFollower: Follower.KNIGHT,
    monkAction: Action.SHIELD,
    difficultyLevel: [DifficultyLevel.EASY,DifficultyLevel.MEDIUM,DifficultyLevel.HARD]
  },
  {
    id: '6',
    townNumber: 6,
    direction: Direction.UP,
    followerActions: [
      {follower: Follower.CRAFTSMAN, actions: [Action.TRADING_STATION]},
      {follower: Follower.KNIGHT, actions: [Action.CITIZEN]},
      {follower: Follower.BOATMAN, actions: [Action.MONK]},
      {follower: Follower.FARMER, actions: [Action.SHIELD]},
      {follower: Follower.TRADER, actions: [Action.PLACE_CARDS_4,Action.SHIELD]},
      {follower: Follower.SCHOLAR, actions: [Action.BENEFICAL_DEED_LEFT]},
    ],
    monkFollower: Follower.KNIGHT,
    monkAction: Action.SHIELD,
    difficultyLevel: [DifficultyLevel.EASY,DifficultyLevel.MEDIUM,DifficultyLevel.HARD]
  },
  {
    id: '7',
    townNumber: 7,
    direction: Direction.DOWN,
    followerActions: [
      {follower: Follower.TRADER, actions: [Action.PLACE_CARDS_5,Action.SHIELD]},
      {follower: Follower.CRAFTSMAN, actions: [Action.TRADING_STATION]},
      {follower: Follower.SCHOLAR, actions: [Action.DEVELOPMENT_LEVEL]},
      {follower: Follower.KNIGHT, actions: [Action.SHIELD,Action.SHIELD]},
      {follower: Follower.FARMER, actions: [Action.BENEFICAL_DEED_RIGHT]},
      {follower: Follower.BOATMAN, actions: [Action.BANK_SHIELD_BONUS]},
    ],
    monkFollower: Follower.SCHOLAR,
    monkAction: Action.SHIELD,
    difficultyLevel: [DifficultyLevel.EASY,DifficultyLevel.MEDIUM,DifficultyLevel.HARD]
  },
  {
    id: '8',
    townNumber: 8,
    direction: Direction.UP,
    followerActions: [
      {follower: Follower.SCHOLAR, actions: [Action.SHIELD]},
      {follower: Follower.FARMER, actions: [Action.SHIELD,Action.SHIELD]},
      {follower: Follower.TRADER, actions: [Action.PLACE_CARDS_3,Action.SHIELD]},
      {follower: Follower.CRAFTSMAN, actions: [Action.TRADING_STATION]},
      {follower: Follower.BOATMAN, actions: [Action.BENEFICAL_DEED_LEFT]},
      {follower: Follower.KNIGHT, actions: [Action.CITIZEN]},
    ],
    monkFollower: Follower.BOATMAN,
    monkAction: Action.SHIELD,
    difficultyLevel: [DifficultyLevel.EASY,DifficultyLevel.MEDIUM,DifficultyLevel.HARD]
  },
  {
    id: '9',
    townNumber: 9,
    direction: Direction.DOWN,
    followerActions: [
      {follower: Follower.FARMER, actions: [Action.SHIELD]},
      {follower: Follower.SCHOLAR, actions: [Action.DEVELOPMENT_LEVEL]},
      {follower: Follower.CRAFTSMAN, actions: [Action.TRADING_STATION]},
      {follower: Follower.BOATMAN, actions: [Action.CITIZEN,Action.BANK_CITIZEN_BONUS]},
      {follower: Follower.KNIGHT, actions: [Action.MONK]},
      {follower: Follower.TRADER, actions: [Action.PLACE_CARDS_2,Action.SHIELD,Action.SHIELD]},
    ],
    monkFollower: Follower.FARMER,
    monkAction: Action.SHIELD,
    difficultyLevel: [DifficultyLevel.EASY,DifficultyLevel.MEDIUM,DifficultyLevel.HARD]
  },
  {
    id: '10',
    townNumber: 10,
    direction: Direction.UP,
    followerActions: [
      {follower: Follower.TRADER, actions: [Action.PLACE_CARDS_1,Action.SHIELD]},
      {follower: Follower.CRAFTSMAN, actions: [Action.TRADING_STATION]},
      {follower: Follower.SCHOLAR, actions: [Action.DEVELOPMENT_LEVEL]},
      {follower: Follower.KNIGHT, actions: [Action.SHIELD,Action.SHIELD]},
      {follower: Follower.FARMER, actions: [Action.SHIELD]},
      {follower: Follower.BOATMAN, actions: [Action.BANK_SHIELD_BONUS]},
    ],
    monkFollower: Follower.FARMER,
    monkAction: Action.SHIELD,
    difficultyLevel: [DifficultyLevel.EASY,DifficultyLevel.MEDIUM,DifficultyLevel.HARD]
  },
  {
    id: '11',
    townNumber: 11,
    direction: Direction.DOWN,
    followerActions: [
      {follower: Follower.SCHOLAR, actions: [Action.DEVELOPMENT_LEVEL]},
      {follower: Follower.FARMER, actions: [Action.CITIZEN,Action.WAREHOUSE_CITIZEN_BONUS]},
      {follower: Follower.TRADER, actions: [Action.PLACE_CARDS_2,Action.SHIELD]},
      {follower: Follower.CRAFTSMAN, actions: [Action.TRADING_STATION]},
      {follower: Follower.BOATMAN, actions: [Action.SHIELD,Action.SHIELD]},
      {follower: Follower.KNIGHT, actions: [Action.MONK]},
    ],
    monkFollower: Follower.SCHOLAR,
    monkAction: Action.SHIELD,
    difficultyLevel: [DifficultyLevel.EASY,DifficultyLevel.MEDIUM,DifficultyLevel.HARD]
  },
  {
    id: '12',
    townNumber: 12,
    direction: Direction.UP,
    followerActions: [
      {follower: Follower.CRAFTSMAN, actions: [Action.TRADING_STATION]},
      {follower: Follower.KNIGHT, actions: [Action.SHIELD,Action.SHIELD]},
      {follower: Follower.BOATMAN, actions: [Action.CITIZEN,Action.BANK_CITIZEN_BONUS]},
      {follower: Follower.FARMER, actions: [Action.BENEFICAL_DEED_RIGHT]},
      {follower: Follower.TRADER, actions: [Action.PLACE_CARDS_1,Action.SHIELD,Action.SHIELD]},
      {follower: Follower.SCHOLAR, actions: [Action.MONK]},
    ],
    monkFollower: Follower.SCHOLAR,
    monkAction: Action.SHIELD,
    difficultyLevel: [DifficultyLevel.EASY,DifficultyLevel.MEDIUM,DifficultyLevel.HARD]
  },
  {
    id: '13',
    townNumber: 13,
    direction: Direction.DOWN,
    followerActions: [
      {follower: Follower.TRADER, actions: [Action.PLACE_CARDS_5,Action.SHIELD,Action.SHIELD]},
      {follower: Follower.CRAFTSMAN, actions: [Action.TRADING_STATION]},
      {follower: Follower.SCHOLAR, actions: [Action.DEVELOPMENT_LEVEL]},
      {follower: Follower.KNIGHT, actions: [Action.MONK]},
      {follower: Follower.FARMER, actions: [Action.SHIELD]},
      {follower: Follower.BOATMAN, actions: [Action.SHIELD]},
    ],
    monkFollower: Follower.CRAFTSMAN,
    monkAction: Action.TRADING_STATION,
    difficultyLevel: [DifficultyLevel.EASY,DifficultyLevel.MEDIUM,DifficultyLevel.HARD]
  },
  {
    id: '14',
    townNumber: 14,
    direction: Direction.UP,
    followerActions: [
      {follower: Follower.SCHOLAR, actions: [Action.SHIELD]},
      {follower: Follower.FARMER, actions: [Action.BENEFICAL_DEED_LEFT]},
      {follower: Follower.TRADER, actions: [Action.PLACE_CARDS_3,Action.SHIELD,Action.SHIELD]},
      {follower: Follower.CRAFTSMAN, actions: [Action.TRADING_STATION]},
      {follower: Follower.BOATMAN, actions: [Action.MONK]},
      {follower: Follower.KNIGHT, actions: [Action.SHIELD]},
    ],
    monkFollower: Follower.CRAFTSMAN,
    monkAction: Action.TRADING_STATION,
    difficultyLevel: [DifficultyLevel.EASY,DifficultyLevel.MEDIUM,DifficultyLevel.HARD]
  },
  {
    id: '1B',
    townNumber: 1,
    direction: Direction.DOWN,
    followerActions: [
      {follower: Follower.KNIGHT, actions: [Action.CITIZEN]},
      {follower: Follower.BOATMAN, actions: [Action.SHIELD,Action.SHIELD]},
      {follower: Follower.FARMER, actions: [Action.MONK]},
      {follower: Follower.TRADER, actions: [Action.PLACE_CARDS_4,Action.SHIELD,Action.SHIELD]},
      {follower: Follower.SCHOLAR, actions: [Action.DEVELOPMENT_LEVEL]},
      {follower: Follower.CRAFTSMAN, actions: [Action.TRADING_STATION]},
    ],
    monkFollower: Follower.FARMER,
    monkAction: Action.SHIELD,
    difficultyLevel: [DifficultyLevel.HARD]
  },
  {
    id: '2B',
    townNumber: 2,
    direction: Direction.UP,
    followerActions: [
      {follower: Follower.BOATMAN, actions: [Action.CITIZEN]},
      {follower: Follower.TRADER, actions: [Action.PLACE_CARDS_1,Action.SHIELD,Action.SHIELD]},
      {follower: Follower.KNIGHT, actions: [Action.MONK]},
      {follower: Follower.SCHOLAR, actions: [Action.DEVELOPMENT_LEVEL]},
      {follower: Follower.CRAFTSMAN, actions: [Action.TRADING_STATION]},
      {follower: Follower.FARMER, actions: [Action.SHIELD,Action.SHIELD]},
    ],
    monkFollower: Follower.CRAFTSMAN,
    monkAction: Action.TRADING_STATION,
    difficultyLevel: [DifficultyLevel.HARD]
  },
  {
    id: '3B',
    townNumber: 3,
    direction: Direction.DOWN,
    followerActions: [
      {follower: Follower.FARMER, actions: [Action.SHIELD,Action.SHIELD]},
      {follower: Follower.SCHOLAR, actions: [Action.DEVELOPMENT_LEVEL]},
      {follower: Follower.CRAFTSMAN, actions: [Action.TRADING_STATION]},
      {follower: Follower.BOATMAN, actions: [Action.MONK]},
      {follower: Follower.KNIGHT, actions: [Action.CITIZEN]},
      {follower: Follower.TRADER, actions: [Action.PLACE_CARDS_4,Action.SHIELD,Action.SHIELD]},
    ],
    monkFollower: Follower.SCHOLAR,
    monkAction: Action.SHIELD,
    difficultyLevel: [DifficultyLevel.HARD]
  },
  {
    id: '4B',
    townNumber: 4,
    direction: Direction.UP,
    followerActions: [
      {follower: Follower.KNIGHT, actions: [Action.SHIELD,Action.SHIELD]},
      {follower: Follower.BOATMAN, actions: [Action.MONK]},
      {follower: Follower.FARMER, actions: [Action.CITIZEN]},
      {follower: Follower.TRADER, actions: [Action.PLACE_CARDS_3,Action.SHIELD,Action.SHIELD]},
      {follower: Follower.SCHOLAR, actions: [Action.DEVELOPMENT_LEVEL]},
      {follower: Follower.CRAFTSMAN, actions: [Action.TRADING_STATION]},
    ],
    monkFollower: Follower.SCHOLAR,
    monkAction: Action.SHIELD,
    difficultyLevel: [DifficultyLevel.HARD]
  },
]

const cardsMap = new Map<string,Card>()
cards.forEach(card => cardsMap.set(card.id, card))

export default {

  /**
   * Get card by ID
   * @param id ID
   * @returns Card
   */
  get(id: string) : Card {
    return findMandatory(cardsMap, id)
  },

  /**
   * Get all cards
   * @param difficultyLevel Difficulty Level
   * @returns cards
   */
  getAll(difficultyLevel: DifficultyLevel) : Card[] {
    return cards.filter(card => card.difficultyLevel.includes(difficultyLevel))
  },

}
