import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

const LOCALSTORAGE_KEY = process.env.VUE_APP_LOCALSTORAGE_KEY_PREFIX + "store"

export interface State {
  language: string
  baseFontSize: number
  setup: Setup
  rounds: Round[]
  tiles: Tile[]
}
export interface Setup {
  difficultyLevel: DifficultyLevel
}
export interface Round {
  round: number
  cardDeck: CardDeckPersistence
}
export interface Tile {
  round: number
  tile: number
  bag: BagPersistence
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

declare module '@vue/runtime-core' {
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    language: "en",
    baseFontSize: 1.0,
    setup: {
      difficultyLevel: DifficultyLevel.EASY
    },
    rounds: [],
    tiles: []
  },
  mutations: {
    // reload state from local storage
    initialiseStore(state) {
      const localStorageCache = localStorage.getItem(LOCALSTORAGE_KEY)
      if (localStorageCache) {
        this.replaceState(Object.assign(state, JSON.parse(localStorageCache)));
      }
    },
    language(state : State, language: string) {
      state.language = language
    },
    setupDifficultyLevel(state : State, level: number) {
      state.setup.difficultyLevel = level
    },
    round(state : State, round: Round) {
      state.rounds = state.rounds.filter(item => !(item.round == round.round))
      state.rounds.push(round)
    },
    tile(state : State, tile: Tile) {
      state.tiles = state.tiles.filter(item => !(item.round == tile.round && item.tile == tile.tile))
      state.tiles.push(tile)
    },
    endGame(state : State) {
      state.rounds = []
      state.tiles = []
    },
    zoomFontSize(state : State, baseFontSize: number) {
      state.baseFontSize = baseFontSize
    }
  }
})

store.subscribe((_mutation, state) => {
	// store state asJSON string in local storage
	localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(state));
})

// define your own `useStore` composition function
export function useStore() : Store<State> {
  return baseUseStore(key)
}
