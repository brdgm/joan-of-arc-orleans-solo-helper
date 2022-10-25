<template>
  <h1 v-html="t('playerTurn.title')"></h1>

  <p v-html="t('playerTurn.pickTile')"></p>
  <div class="mb-3">
    <Icon type="follower" :name="item"
        class="follower" :class="{selected: isSelected(index), notSelected: isNotSelected(index)}"
        v-for="(item,index) in bag.available" :key="index" @click="selectTile(index)"/>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import Bag from '@/services/Bag'
import Icon from '../structure/Icon.vue'

export default defineComponent({
  name: "PlayerTurn",
  components: {
    Icon
  },
  props: {
    bag: {
      type: Bag,
      required: true
    }
  },
  data() {
    return {
      selectedIndex: -1
    }
  },
  emits: {
    chooseTile(payload: { index : number }) {
      return payload.index >= 0
    }
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  methods: {
    selectTile(index : number) {
      this.selectedIndex = index
      this.$emit('chooseTile', {index:index})
    },
    isSelected(index : number) {
      return this.selectedIndex == index
    },
    isNotSelected(index : number) {
      return this.selectedIndex >= 0 && this.selectedIndex != index
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
  cursor: pointer;
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