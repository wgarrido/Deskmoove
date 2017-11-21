<template>
  <div id="wrapper">
    <main v-html="videoPlayer">
    </main>
  </div>
</template>

<script>
  import Vue from 'vue'
  import 'video.js/dist/video-js.min.css'
  import VideoJs from 'video.js'
  import 'videojs-youtube/dist/Youtube.min.js'
  import { ipcRenderer } from 'electron'

  export default {
    data () {
      return {
        player: null,
        videoPlayer: `<video id="my-player" class="video-js" preload="auto" v-if="context === 'local'">
                        <source src="http://vjs.zencdn.net/v/oceans.mp4" type="video/mp4">
                      </video>`,
        context: 'local',
        setup: '{ "techOrder": ["youtube"], "sources": [{ "type": "video/youtube", "src": "https://www.youtube.com/watch?v=xjS6SftYQaQ"}] }',
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

      // Listen Channel change-src on Main
      ipcRenderer.on('change-src', (event, arg) => {
        this.context = arg[1]
        if (this.context === 'local') {
          this.player.dispose()
          this.videoPlayer = `<video id="my-player" class="video-js" preload="auto" v-if="context === 'local'">
                                <source src="file://${arg[0]}" type="video/mp4">
                              </video>`
          Vue.nextTick(() => {
            this.player = VideoJs('my-player', this.optionsPlayer)
          })
          // this.loadSource(arg[0], arg[1])
        } else if (this.context === 'external') {
          this.player.dispose()
          this.setup = arg[0]
          this.videoPlayer = `<video id="my-player" class="video-js" preload="auto" data-setup='${this.setup}'>
                              </video>`
          Vue.nextTick(() => {
            this.player = VideoJs('my-player', this.optionsPlayer)
          })
        }
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
