<template>
  <div id="container">
    <header class="toolbar toolbar-header">
      <div class="toolbar-actions">
      <button class="btn btn-default active">
        <span class="icon icon-video"></span>
      </button>
      <button class="btn btn-negative btn-mini pull-right" @click="quitApp()">
          Quit app
        </button>
  </div>
    </header>
  <div id="content">
    <div id="video">
      <div class="radio">
        <label>
          <input type="radio" name="radios" value="local" v-model="videoConfig">
          local video
        </label>
        <label>
          <input type="radio" name="radios" value="internet" v-model="videoConfig">
          internet video
        </label>
      </div>
      <div v-if="videoConfig === 'local'">
        <button class="btn btn-default btn-default" @click="loadVideoFile()">Load mp4 file</button>
        <span>file: {{localVideo}}</span>
      </div>
      <div v-if="videoConfig === 'internet'">
        <div class="form-group">
          <input type="url" class="form-control" placeholder="Enter Youtube or Vimeo link" v-model="videoUrl">
           <button class="btn btn-default btn-primary" @click="formatSetupExternal(videoUrl)">Apply</button>
        </div>
      </div>
    </div>
  </div>
    <footer class="toolbar toolbar-footer">
      <div class="toolbar-actions">
        <button class="btn btn-default pull-right" @click="hideWindow()">
          Close
        </button>
      </div>
    </footer>
  </div>
</template>

<script>
  import { remote, ipcRenderer } from 'electron'
  export default {
    data () {
      return {
        videoUrl: '',
        videoConfig: 'local',
        localVideo: 'empty',
        BrowserWindow: remote.BrowserWindow.fromId(remote.getCurrentWindow().id)
      }
    },
    methods: {
      loadVideoFile () {
        remote.dialog.showOpenDialog({
          properties: ['openFile'],
          filters: [{name: 'Movies', extensions: ['mp4']}]
        }, (path) => {
          // Send message on Main channel
          ipcRenderer.send('videoSrc', [path, 'local'])
          this.localVideo = path[0].substr(path[0].lastIndexOf('/') + 1)
        })
      },
      quitApp () {
        remote.app.quit()
      },
      hideWindow () {
        this.BrowserWindow.hide()
      },
      formatSetupExternal (url) {
        let setup = `{ "techOrder": ["youtube"], "sources": [{ "type": "video/youtube", "src": "${url}"}] }`
        ipcRenderer.send('videoSrc', [setup, 'external'])
      }
    }
  }
</script>

<style>
@import "~@/assets/css/photon.min.css";
body {
  resize: none;
}
#content {
  padding: 20px 15px;
}
.radio{
  margin-top: 0px;
}
</style>