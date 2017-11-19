<template>
  <div id="wrapper">
    <main>
      <video id="my-player" class="video-js" preload="auto">
        <source src="http://vjs.zencdn.net/v/oceans.mp4" type="video/mp4">
        <source src="http://vjs.zencdn.net/v/oceans.webm" type="video/webm">
      </video>
    </main>
  </div>
</template>

<script>
  import 'video.js/dist/video-js.min.css'
  import VideoJs from 'video.js'
  import { ipcRenderer } from 'electron'

  export default {
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
      this.player.isFullscreen(true)

      // Listen Channel change-src on Main
      ipcRenderer.on('change-src', (event, arg) => {
        this.loadSource(arg[0], arg[1])
      })
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      // Load source in Video Player
      loadSource (source, context) {
        if (context === 'local') {
          this.player.src('file://' + source)
        }
      }
    }
  }
</script>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { 
    background-color: #000;
    overflow: hidden;
  }

  main {
    position: relative;
    height: 100vh;
    z-index: 0;
  }

  #my-player{
    -webkit-transform: translateX(-50%) translateY(-50%);
    -moz-transform: translateX(-50%) translateY(-50%);
    -ms-transform: translateX(-50%) translateY(-50%);
    -o-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    z-index: -100;
  }
</style>
