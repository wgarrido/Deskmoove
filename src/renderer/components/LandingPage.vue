<template>
  <div id="wrapper">
    <main v-for="player in videoPlayer" :key="player.id">
      <vd-video-js :context="player.context" :src-video="player.src" :data-setup="player.dataSetup"></vd-video-js>
    </main>
  </div>
</template>

<script>
  import { ipcRenderer } from 'electron'
  import VdVideoJs from './videojs/VdVideoJS.vue'

  export default {
    components: {VdVideoJs},
    data () {
      return {
        videoPlayer: [{context: 'local', src: 'http://vjs.zencdn.net/v/oceans.mp4', id: 1}]
      }
    },
    mounted: function () {
      // Listen Channel change-src on Main
      ipcRenderer.on('change-src', (event, arg) => {
        this.context = arg[1]
        if (this.context === 'local') {
          this.videoPlayer.splice(0, 1)
          this.videoPlayer.push({context: this.context, src: `file://${arg[0]}`})
        } else if (this.context === 'external') {
          this.setup = arg[0]
          this.videoPlayer.splice(0, 1)
          this.videoPlayer.push({context: this.context, dataSetup: this.setup})
        }
      })
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
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

  #container-player {
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
