<template>
  <div class="roundNumber">
    <p>{{t('round.roundNumber', {round:round, rounds:10})}}</p>
    <AppIcon v-if="isMonkActionAvailable" type="follower" name="monk" class="monkBonusAction" data-bs-toggle="modal" data-bs-target="#monkBonusActionModal"/>
    <p class="cardInfo text-muted" v-if="bot">
      {{t('botTurn.currentCard')}} {{bot.cardDeck.activeCard.id}}<br/>
      {{t('botTurn.nextCard')}} {{bot.cardDeck.nextCard.id}}
    </p>
</div>

  <PlayerTurn v-if="playerTurn" :bag="bag" @choose-tile="playerChooseTile($event.index)"/>
  <BotTurn v-if="botTurn && bot" :bot="bot" :bag="bag"/>

  <button v-if="nextButtonRouteTo" class="btn btn-primary btn-lg mt-3" @click="next()"
      :disabled="playerTurn && playerSelectedIndex < 0">
    {{t('action.next')}}
  </button>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>

  <ModalDialog id="monkBonusActionModal" :title="t('round.monkBonusAction.title')">
    <template #body>
      <p v-html="t('round.monkBonusAction.intro')"></p>
      <BotActions v-if="bot" :actions="bot.monkBonusActions" :town-number="bot.townNumber"/>
    </template>
  </ModalDialog>

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
import AppIcon from '@/components/structure/AppIcon.vue'
import BotActions from '@/components/round/BotActions.vue'
import ModalDialog from 'brdgm-commons/src/components/structure/ModalDialog.vue'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import CardDeck from '@/services/CardDeck'

export default defineComponent({
  name: 'RoundTurn',
  components: {
    FooterButtons,
    PlayerTurn,
    BotTurn,
    AppIcon,
    BotActions,
    ModalDialog
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
    const difficultyLevel = state.difficultyLevel

    return { t, round, tile, cardDeck, bag, playerTurn, botTurn, bot, difficultyLevel }
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
    },
    isMonkActionAvailable() : boolean {
      return this.botTurn && this.difficultyLevel != DifficultyLevel.EASY
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
      let cardDeck = this.cardDeck
      if (nextTile > 5) {
        nextRound++
        nextTile = 1
      }
      let nextBotRound = nextRound
      let nextBotTile = nextTile
      if (this.playerTurn && this.playerSelectedIndex >= 0) {
        this.bag.chooseTilePlayer(this.bag.available[this.playerSelectedIndex])
      }
      if (this.botTurn && this.bot && this.cardDeck) {
        this.bag.chooseTileBot(this.bag.available[this.bot.selectedIndex])
        nextBotTile++
        if (nextBotTile > 5) {
          nextBotRound++
          nextBotTile = 1
        }
      }
      if (nextRound > this.round) {
        this.bag.discardAll()
        if (this.bag.inside.length == 0) {
          // back is empty - put all tiles bag in bag, and shuffle new card deck
          this.bag = Bag.new()
          cardDeck = CardDeck.new(this.difficultyLevel)
        }
        this.bag.draw(5)
      }
      this.$store.commit('tile', {round:nextRound,tile:nextTile,bag:this.bag.toPersistence()})
      if (cardDeck) {
        cardDeck.draw()
        this.$store.commit('botTurn', {round:nextBotRound,tile:nextBotTile,cardDeck:cardDeck.toPersistence()})
      }
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
  text-align: right;
}
.monkBonusAction {
  height: 2rem;
  cursor: pointer;
}
.cardInfo {
  margin-top: 1rem;
  font-size: x-small;
}
</style>