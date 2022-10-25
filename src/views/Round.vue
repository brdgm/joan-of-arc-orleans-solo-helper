<template>
  <div class="roundNumber">
    {{t('round.roundNumber', {round:round, rounds:10})}}
  </div>

  <PlayerTurn v-if="playerTurn" :bag="bag" @choose-tile="playerChooseTile($event.index)"/>
  <BotTurn v-if="botTurn && bot" :bot="bot" :bag="bag"/>

  <button v-if="nextButtonRouteTo" class="btn btn-primary btn-lg mt-3" @click="next()"
      :disabled="playerTurn && playerSelectedIndex < 0">
    {{t('action.next')}}
  </button>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import NavigationState from '@/util/NavigationState'
import BotTurn from '@/components/round/BotTurn.vue'
import PlayerTurn from '@/components/round/PlayerTurn.vue'
import Bag from '@/services/Bag'

export default defineComponent({
  name: 'Round',
  components: {
    FooterButtons,
    PlayerTurn,
    BotTurn
  },
  setup() {
    const { t } = useI18n()
    const store = useStore()
    const route = useRoute()

    const state = new NavigationState(route, store)
    const round = state.round
    const tile = state.tile
    const cardDeck = state.cardDeck
    const bag = state.bag
    const playerTurn = state.isPlayerTurn
    const botTurn = state.isBotTurn
    const bot = state.bot

    return { t, round, tile, cardDeck, bag, playerTurn, botTurn, bot }
  },
  data() {
    return {
      playerSelectedIndex: -1
    }
  },
  computed: {
    backButtonRouteTo() : string {
      if (this.round == 1 && this.tile == 1) {
        return ''
      }
      else if (this.tile == 1) {
        return `/round/${this.round-1}/tile/5`
      }
      else {
        return `/round/${this.round}/tile/${this.tile-1}`
      }
    },
    nextButtonRouteTo() : string {
      if (this.endOfGame) {
        return '/endOfGame'
      }
      else if (this.tile == 5) {
        return `/round/${this.round+1}/tile/1`
      }
      else {
        return `/round/${this.round}/tile/${this.tile+1}`
      }
    },
    endOfGame() : boolean {
      return this.round == 10 && this.tile == 5
    }
  },
  methods: {
    next() : void {
      if (!this.endOfGame) {
        this.storeStateForNextRound()
      }
      this.$router.push(this.nextButtonRouteTo)
    },
    storeStateForNextRound() {
      let nextRound = this.round
      let nextTile = this.tile + 1
      if (nextTile > 5) {
        nextRound++
        nextTile = 1
      }
      if (this.playerTurn && this.playerSelectedIndex >= 0) {
        this.bag.chooseTilePlayer(this.bag.available[this.playerSelectedIndex])
      }
      if (this.botTurn && this.bot) {
        this.bag.chooseTileBot(this.bag.available[this.bot.selectedIndex])
      }
      if (nextRound > this.round) {
        this.bag.discardAll()
        if (this.bag.inside.length == 0) {
          this.bag = Bag.new()
        }
        this.bag.draw(5)
      }
      this.$store.commit('tile', {round:nextRound,tile:nextTile,bag:this.bag.toPersistence()})
    },
    playerChooseTile(index : number) : void {
      this.playerSelectedIndex = index
    }
  }
})
</script>

<style lang="scss" scoped>
.roundNumber {
  float: right;
}
</style>