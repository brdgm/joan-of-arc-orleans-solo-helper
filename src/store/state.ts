import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { defineStore } from 'pinia'
import { name } from '@/../package.json'

export const useStateStore = defineStore(`${name}.store`, {
  state: () => {
    return {
      language: 'en',
      baseFontSize: 1.0,
      setup: {
        difficultyLevel: DifficultyLevel.EASY
      },
      tiles: [],
      botTurns: []
    } as State
  },
  actions: {
    tile(tile: Tile) {
      this.tiles = this.tiles.filter(item => !(item.round == tile.round && item.tile == tile.tile))
      this.tiles.push(tile)
    },
    botTurn(botTurn: BotTurn) {
      this.botTurns = this.botTurns.filter(item => !(item.round == botTurn.round && item.tile == botTurn.tile))
      this.botTurns.push(botTurn)
    },
    resetGame() {
      this.tiles = []
      this.botTurns = []
    }
  },
  persist: true
})

export interface State {
  language: string
  baseFontSize: number
  setup: Setup
  tiles: Tile[]
  botTurns: BotTurn[]
}
export interface Setup {
  difficultyLevel: DifficultyLevel
}
export interface Tile {
  round: number
  tile: number
  bag: BagPersistence
}
export interface BotTurn {
  round: number
  tile: number
  cardDeck: CardDeckPersistence
}
export interface CardDeckPersistence {
  deck: string[]
  discard: string[]
}
export interface BagPersistence {
  inside: string[]
  available: string[]
  chosenPlayer: string[]
  chosenBot: string[]
  discard: string[]
}
