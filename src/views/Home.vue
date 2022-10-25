<template>

  <div class="float-end m-2 w-25">
    <a href="https://boardgamegeek.com/boardgame/323156/stroganov" target="_blank" rel="noopener">
      <img src="../assets/game-stroganov.jpg" class="rounded shadow w-100"/>
    </a>
  </div>

  <h1>{{t('home.title')}}</h1>

  <p v-html="t('home.play1')"></p>
  <p v-html="t('home.play2')"></p>

  <p class="text-muted fst-italic">
    {{t('home.feedback')}}
    <a href="https://boardgamegeek.com/thread/2926785/brdgmme-stroganov-solo-helper-web-application" target="_blank" rel="noopener">Board Game Geek Thread</a> |
    <a href="https://github.com/brdgm/stroganov-solo-helper" target="_blank" rel="noopener">GitHub</a>
  </p>

  <router-link to="/setupGame" class="btn btn-primary btn-lg mt-3">{{t('action.playGame')}}</router-link>

  <p class="disclaimer">
    This is not an official Game Brewer product and has no affiliation with <a href="https://gamebrewer.com/" target="_blank" rel="noopener">Game Brewer</a>.
    All art in this app is from <a href="https://gamebrewer.com/games/stroganov/?v=3a52f3c22ed6" target="_blank" rel="noopener">Stroganov</a>.
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