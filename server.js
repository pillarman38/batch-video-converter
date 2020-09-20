require('./app')
const { app, BrowserWindow } = require('electron')

let win;
const url = require("url");
const path = require("path");

function createWindow() {
    win = new BrowserWindow({
        width: 1000,
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