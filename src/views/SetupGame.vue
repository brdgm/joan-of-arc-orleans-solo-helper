<template>
  <h1>{{t('setup.title')}}</h1>

  <h3 v-html="t('setup.preparation.title')"></h3>
  <ol>
    <li v-html="t('setup.preparation.takeSheet')"></li>
    <li v-html="t('setup.preparation.placeCards')"></li>
    <li v-html="t('setup.preparation.remainingCards')"></li>
  </ol>

  <DifficultyLevel/>

  <button class="btn btn-primary btn-lg mt-4" @click="startGame">
    {{t('action.startGame')}}
  </button>

  <FooterButtons endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import DifficultyLevel from '@/components/setup/DifficultyLevel.vue'
import FooterButtons from '@/components/structure/FooterButtons.vue'

export default defineComponent({
  name: 'SetupGame',
  components: {
    DifficultyLevel,
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  methods: {
    startGame() : void {
      this.$store.commit('resetGame')
      this.$router.push('/round/1/tile/1')
    }
  }
})
</script>
