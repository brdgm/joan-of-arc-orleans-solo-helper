<template>
  <h1 v-html="t('endOfGame.title')"></h1>

  <p v-html="t('endOfGame.tradingStationMajority')"></p>
  <p v-html="t('endOfGame.victoryPoints')"></p>
  <ul>
    <li v-html="t('endOfGame.victoryPointsJoan1')"></li>
    <li v-html="t('endOfGame.victoryPointsJoan2')"></li>
    <li v-html="t('endOfGame.victoryPointsJoan3')"></li>
  </ul>
  <p v-html="t('endOfGame.scoringResult')"></p>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="endGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'

export default defineComponent({
  name: 'EndOfGame',
  components: {
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  computed: {
    backButtonRouteTo() : string {
      return `/round/10/tile/5`
    }
  }
})
</script>
