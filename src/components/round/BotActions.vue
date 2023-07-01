<template>
  <table class="mb-3">
    <tr v-for="(action,index) in typedActions" :key="index">
      <td class="actionCell">
        <div v-if="isTradingStation(action)" class="townNumber">{{townNumber}}</div>
        <AppIcon type="action" :name="action" class="action"/>
      </td>
      <td>
        <span v-html="t(`botTurn.action.${action}`, {townNumber:townNumber})" class="text-muted small"></span>
        <template v-if="isPickPlaceCard(action)">
          <br/>
          <button class="btn btn-outline-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#pickPlaceCardModal">{{t('botTurn.pickPlaceCard.title')}}</button>
        </template>
      </td>
    </tr>
  </table>

  <ModalDialog id="pickPlaceCardModal" :title="t('botTurn.pickPlaceCard.title')">
    <template #body>
      <p v-if="placeCardSelection" v-html="t('botTurn.pickPlaceCard.removeCard')"></p>
      <p v-else v-html="t('botTurn.pickPlaceCard.howManyCards')"></p>
      <button v-for="cardNo of placeCardCount" :key="cardNo" @click="pickPlaceCard(cardNo)"
          class="btn btn-sm cardNoButton"
          :class="{
            'btn-primary': !placeCardSelection,
            'btn-danger': placeCardSelection == cardNo,
            'btn-secondary:': placeCardSelection != undefined && placeCardSelection!=cardNo,
            disabled: placeCardSelection != undefined
          }"><span v-if="placeCardSelection == cardNo">&cross; </span>{{cardNo}}</button>
    </template>
    <template #footer>
      <button v-if="placeCardSelection" @click="resetPlaceCard" class="btn btn-outline-secondary">{{t('action.reset')}}</button>
      <button class="btn btn-secondary" @click="resetPlaceCard"  data-bs-dismiss="modal">{{t('action.close')}}</button>
    </template>
  </ModalDialog>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../structure/AppIcon.vue'
import Action from '@/services/enum/Action'
import ModalDialog from 'brdgm-commons/src/components/structure/ModalDialog.vue'
import rollDice from 'brdgm-commons/src/util/random/rollDice'

export default defineComponent({
  name: 'BotActions',
  components: {
    AppIcon,
    ModalDialog
  },
  props: {
    actions: {
      type: Array,
      required: true
    },
    townNumber: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      placeCardCount: 4,
      placeCardSelection: undefined as number|undefined
    }
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  computed: {
    typedActions() : Action[] {
      return this.actions as Action[]
    }
  },
  methods: {
    isTradingStation(action : Action) {
      return action == Action.TRADING_STATION
    },
    isPickPlaceCard(action : Action) {
      return action == Action.PLACE_CARDS_1
          || action == Action.PLACE_CARDS_2
          || action == Action.PLACE_CARDS_3
          || action == Action.PLACE_CARDS_4
          || action == Action.PLACE_CARDS_5
    },
    pickPlaceCard(count : number) {
      this.placeCardCount = count
      this.placeCardSelection = rollDice(count)
    },
    resetPlaceCard() {
      this.placeCardCount = 4
      this.placeCardSelection = undefined
    }
  }
})
</script>

<style lang="scss" scoped>
.actionCell {
  position: relative;
  text-align: center;
  vertical-align: top;
  min-width: 5rem;
  .action {
    height: 3rem;
    margin: 0.5rem;
    filter: drop-shadow(2px 2px 2px #aaa);
  }
  .townNumber {
    position: absolute;
    left: 2.1rem;
    top: 1.3rem;
    width: 2rem;
    font-weight: bold;
    z-index: 100;
  }
}
.cardNoButton {
  margin: 0.5rem;
  min-width: 3rem;
}
</style>
