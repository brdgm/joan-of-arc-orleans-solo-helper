<template>
  <h1 v-html="t('botTurn.title')"></h1>

  <div class="mb-3">
    <Icon type="follower" :name="item"
        class="follower" :class="{selected: isSelected(index), notSelected: isNotSelected(index)}"
        v-for="(item,index) in bag.available" :key="item"/>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from '@/store'
import Bag from '@/services/Bag'
import Bot from '@/services/Bot'
import Icon from '../structure/Icon.vue'

export default defineComponent({
  name: 'BotTurn',
  components: {
    Icon
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
    useStore()

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