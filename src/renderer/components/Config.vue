<template>
  <div id="container">
    <header class="toolbar toolbar-header">
      <h1 class="title">Configuration</h1>
      <div class="toolbar-actions">
      <button class="btn btn-default active">
        <span class="icon icon-video"></span>
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
        <button class="btn btn-large btn-default" @click="loadVideoFile()">Load mp4 file</button>
        <span>file: {{localVideo}}</span>
      </div>
      <div v-if="videoConfig === 'internet'">
        <div class="form-group">
          <input type="url" class="form-control" placeholder="Enter Youtube or Vimeo link">
        </div>
      </div>
    </div>
  </div>
    <footer class="toolbar toolbar-footer">
      <div class="toolbar-actions">
        <button class="btn btn-default">
          Cancel
        </button>

        <button class="btn btn-primary pull-right">
          Save
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
        videoConfig: 'local',
        localVideo: 'empty'
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
      }
    }
  }
</script>

<style>
@import "~@/assets/css/photon.min.css";
body {
  resize: none
}

#content {
  padding: 15px
}
</style>