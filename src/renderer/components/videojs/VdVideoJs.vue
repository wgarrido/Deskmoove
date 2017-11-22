<template>
<div id="container-player">
  <video id="my-player" class="video-js" preload="auto" :data-setup="dataSetup" v-if="context === 'external'"></video>
  <video id="my-player" class="video-js" preload="auto" v-if="context === 'local'">
      <source :src="srcVideo" type="video/mp4">
  </video>
</div>
</template>

<script>
import VideoJs from 'video.js'
import 'video.js/dist/video-js.min.css'
import 'videojs-youtube/dist/Youtube.min.js'
export default {
  props: {
    srcVideo: String,
    dataSetup: String,
    context: String
  },
  data () {
    return {
      player: null,
      optionsPlayer: {
        autoplay: true,
        controls: false,
        loop: true,
        muted: true,
        preload: 'auto',
        fluid: true
      }
    }
  },
  mounted: function () {
    this.player = VideoJs('my-player', this.optionsPlayer)
  },
  beforeDestroy: function () {
    this.player.dispose()
  }
}
</script>

<style>
</style>