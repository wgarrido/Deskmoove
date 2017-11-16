<template>
  <div id="wrapper">
    <main>
      <video id="my-player" class="video-js" preload="auto">
        <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4">
        <source src="//vjs.zencdn.net/v/oceans.webm" type="video/webm">
      </video>
    </main>
  </div>
</template>

<script>
  import 'video.js/dist/video-js.min.css'
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import SystemInformation from './LandingPage/SystemInformation'
  import VideoJs from 'video.js'
  @Component({
    components: {
      'system-information': SystemInformation
    }
  })
  export default class App extends Vue {
    player = null
    optionsPlayer = {
      autoplay: true,
      controls: false,
      loop: true,
      muted: true,
      preload: 'auto',
      fluid: true
    }

    mounted () {
      this.player = VideoJs('my-player', this.optionsPlayer)
      console.log(this.player.isFullscreen(true))
    }
    // Open link in external browser
    open (link) {
      this.$electron.shell.openExternal(link)
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { 
    font-family: 'Source Sans Pro', sans-serif;
    background-color: #000;
  }
</style>
