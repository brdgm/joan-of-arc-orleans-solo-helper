<template>
  <h1>/Round/</h1>

  ...

  <router-link v-if="nextButtonRouteTo" :to="nextButtonRouteTo" class="btn btn-primary btn-lg mt-3">
    {{t('action.next')}}
  </router-link>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import NavigationState from '@/util/NavigationState'

export default defineComponent({
  name: 'Round',
  components: {
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    const store = useStore()
    const route = useRoute()

    const state = new NavigationState(route, store)
    const round = state.round
    const tile = state.tile

    return { t, round, tile }
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
  }
})
</script>
