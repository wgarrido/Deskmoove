'use strict'

import { app, BrowserWindow, screen, Tray, nativeImage } from 'electron'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}
let tray = null
let mainWindow
let paramWindow = null
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

const configURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080/#/config`
  : `file://${__dirname}/index.html#config`

function createWindow (width, height) {
  mainWindow = new BrowserWindow({
    height,
    width,
    frame: true,
    type: 'desktop',
    useContentSize: true,
    enableLargerThanScreen: true,
    webPreferences: {
      webSecurity: false
    }
  })

  mainWindow.loadURL(winURL)
  mainWindow.closeDevTools()
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', () => {
  // hide icon dock
  // app.dock.hide()
  // get size screen
  const {width, height} = screen.getPrimaryDisplay().size
  // tray
  console.log(__static)
  const nicon = nativeImage.createFromPath(`${__static}/img/icon.png`)
  tray = new Tray(nicon)
  /* const contextMenu = Menu.buildFromTemplate([
    {
      label: 'load',
      type: 'normal',
      click: () => {
        dialog.showOpenDialog({
          properties: ['openFile'],
          filters: [{name: 'Movies', extensions: ['mp4']}]
        }, (path) => {
          // Send message on change-src channel
          mainWindow.webContents.send('change-src', [path, 'local'])
        })
      }
    },
    {label: 'quit', type: 'normal', role: 'quit'}
  ]) */
  tray.setToolTip('VideoDesk')
  // tray.setContextMenu(contextMenu)
  tray.on('click', () => {
    if (paramWindow === null) {
      paramWindow = new BrowserWindow({
        y: screen.getMenuBarHeight(),
        x: screen.getCursorScreenPoint().x - 200,
        height: 200,
        width: 400,
        frame: false,
        useContentSize: true,
        webPreferences: {
          devTools: false
        }
      })
      paramWindow.loadURL(configURL)
    } else {
      paramWindow.destroy()
      paramWindow = null
    }
  })
  createWindow(width, height)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
