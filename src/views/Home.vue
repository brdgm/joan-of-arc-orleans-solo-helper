<template>

  <div class="float-end m-2 w-25">
    <a href="https://boardgamegeek.com/boardgame/364641/joan-arc-orleans-draw-write" target="_blank" rel="noopener">
      <img src="../assets/game-joan-of-arc-orleans.jpg" class="rounded shadow w-75"/>
    </a>
  </div>

  <h1>{{t('home.title')}}</h1>

  <p v-html="t('home.play1')"></p>
  <p v-html="t('home.play2')"></p>

<!--
  <p class="text-muted fst-italic">
    {{t('home.feedback')}}
    <a href="https://boardgamegeek.com/thread/XXX" target="_blank" rel="noopener">Board Game Geek Thread</a> |
    <a href="https://github.com/brdgm/joan-of-arc-orleans-solo-helper" target="_blank" rel="noopener">GitHub</a>
  </p>
-->

  <router-link to="/setupGame" class="btn btn-primary btn-lg mt-3">{{t('action.playGame')}}</router-link>

  <p class="disclaimer">
    This is not an official Game Brewer product and has no affiliation with <a href="https://www.dlp-games.de/" target="_blank" rel="noopener">dlp games</a>.
    All art in this app is from <a href="https://www.dlp-games.de/spiele/orleans-johanna" target="_blank" rel="noopener">Joan of Arc: Orléans</a>.
    See <a href="#" data-bs-toggle="modal" data-bs-target="#creditsModal">{{t('footer.credits')}}</a>.
  </p>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'Home',
  setup() {
    const { t } = useI18n()
    return { t }
  },
})
</script>

<style lang="scss" scoped>
.disclaimer {
  clear: both;
  margin-top: 4rem;
  font-size: smaller;
}
</style>