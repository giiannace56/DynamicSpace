const { app, BrowserWindow } = require('electron')
const path = require("path")
const isDev = require("electron-is-dev")
const fs = require('fs')
require('electron-reload')(__dirname);
function createWindow () {
  // Cria uma janela de navegação.
  const win = new BrowserWindow({
    show: false,
    width: 1024,
    height: 650,
    frame: false,
    icon: path.join(__dirname, 'public/icon.ico'),
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  })
  win.once('ready-to-show', () => {
    win.show()
  })
  win.setMenuBarVisibility(false)
  win.setFullScreen(false)
  win.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`)
}
app.whenReady().then(createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
