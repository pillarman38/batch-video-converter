require('./app')
const { app, BrowserWindow } = require('electron')

let win;
const url = require("url");
const path = require("path");
const fs = require('fs')

function createWindow() {
    win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
          },
        width: 1200,
        height: 800
    })
    win.loadURL(
        url.format({
          pathname: path.join(__dirname, `/dist/index.html`),
          protocol: "file:",
          slashes: true
        })
    );
    
    win.webContents.openDevTools()
    win.on('closed', function(){
        win = null
    })
}

app.on('ready', createWindow)