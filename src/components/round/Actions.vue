<template>
  <table class="mb-3">
    <tr v-for="(action,index) in typedActions" :key="index">
      <td class="actionCell">
        <div v-if="isTradingStation(action)" class="townNumber">{{townNumber}}</div>
        <Icon type="action" :name="action" class="action"/>
      </td>
      <td v-html="t(`botTurn.action.${action}`)" class="text-muted small"></td>
    </tr>
  </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import Icon from '../structure/Icon.vue'
import Action from '@/services/enum/Action'

export default defineComponent({
  name: 'Actions',
  components: {
    Icon
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
    }
  }
})
</script>

<style lang="scss" scoped>
.actionCell {
  position: relative;
  text-align: center;
  vertical-align: top;
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
  }
}
</style>
