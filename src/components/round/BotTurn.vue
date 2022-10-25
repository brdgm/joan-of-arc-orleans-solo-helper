<template>
  <h1 v-html="t('botTurn.title')"></h1>

  <p>...</p>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from '@/store'
import Bag from '@/services/Bag'
import CardDeck from '@/services/CardDeck'

export default defineComponent({
  name: 'BotTurn',
  props: {
    cardDeck: {
      type: CardDeck,
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
  }
})
</script>
