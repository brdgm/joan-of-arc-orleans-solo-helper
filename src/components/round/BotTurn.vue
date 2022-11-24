<template>
  <h1 v-html="t('botTurn.title')"></h1>

  <div class="mb-3">
    <AppIcon type="follower" :name="item"
        class="follower" :class="{selected: isSelected(index), notSelected: isNotSelected(index)}"
        v-for="(item,index) in bag.available" :key="index"/>
  </div>

  <h2 v-html="t('botTurn.actions')"></h2>
  <BotActions :actions="bot.actions" :town-number="bot.townNumber"/>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import Bag from '@/services/Bag'
import Bot from '@/services/Bot'
import AppIcon from '../structure/AppIcon.vue'
import BotActions from './BotActions.vue'

export default defineComponent({
  name: 'BotTurn',
  components: {
    AppIcon,
    BotActions
  },
  props: {
    bot: {
      type: Bot,
      required: true
    },
    bag: {
      type: Bag,
      required: true
    }
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  methods: {
    isSelected(index : number) {
      return this.bot.selectedIndex == index
    },
    isNotSelected(index : number) {
      return this.bot.selectedIndex != index
    }
  }
})
</script>

<style lang="scss" scoped>
.follower {
  height: 4rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  filter: drop-shadow(3px 3px 3px #888);
  &.notSelected {
    opacity: 40%;
  }
  &.selected {
    height: 6rem;
    margin-top: 0;
    margin-bottom: 0;
  }
}
</style>
