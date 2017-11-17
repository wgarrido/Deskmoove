'use strict'

import { app, BrowserWindow, screen, Tray, Menu, dialog } from 'electron'
import path from 'path'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}
let tray = null
let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow (width, height) {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height,
    useContentSize: true,
    width,
    frame: false,
    type: 'desktop',
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
  const {width, height} = screen.getPrimaryDisplay().workAreaSize
  let iconPath = path.join(__dirname, '../img/icon.png')
  tray = new Tray(iconPath)
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'load',
      type: 'normal',
      click: () => {
        dialog.showOpenDialog({properties: ['openFile']}, (path) => {
          // Send message on change-src channel
          mainWindow.webContents.send('change-src', path)
        })
      }
    },
    {label: 'quit', type: 'normal', role: 'quit'}
  ])
  tray.setToolTip('VideoDesk')
  tray.setContextMenu(contextMenu)
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
