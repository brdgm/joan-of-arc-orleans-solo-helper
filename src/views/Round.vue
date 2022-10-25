<template>
  <div class="roundNumber">
    {{t('round.roundNumber', {round:round, rounds:10})}}
  </div>

  <PlayerTurn v-if="playerTurn" :bag="bag" @choose-tile="playerChooseTile($event.index)"/>
  <BotTurn v-else :cardDeck="cardDeck" :bag="bag"/>

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

    return { t, round, tile, cardDeck, bag, playerTurn, botTurn }
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
      if (this.round == 10 && this.tile == 5) {
        return '/endOfGame'
      }
      else if (this.tile == 5) {
        return `/round/${this.round+1}/tile/1`
      }
      else {
        return `/round/${this.round}/tile/${this.tile+1}`
      }
    }
  },
  methods: {
    next() : void {
      if (this.playerTurn && this.playerSelectedIndex >= 0) {
        this.bag.chooseTilePlayer(this.bag.available[this.playerSelectedIndex])
        this.$store.commit('tile', {round:this.round,tile:this.tile,bag:this.bag.toPersistence()})
      }
      this.$router.push(this.nextButtonRouteTo)
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