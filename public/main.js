const { BrowserWindow, app, Tray, Menu, ipcMain } = require('electron')

const path = require('path')
const isDev = require('electron-is-dev')

let win = null;
let tray = null;

function createWindow() {
    win = new BrowserWindow({
        width: 512,
        height: 512,
        frame: false,
        center: true,

        icon: path.join(__dirname, "icon.ico"),

        webPreferences: {
            nodeIntegration: false,
            enableRemoteModule: false,
            contextIsolation: true,
            preload: path.join(__dirname, "preload.js")
        }
    }) 
    
    win.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    )

    win.setIcon(
        isDev
            ? path.join(__dirname, './icon.ico')
            : `${path.join(__dirname, '../build/icon.ico')}`
    )
}

app.whenReady().then(() => {

    createWindow();

    tray = new Tray(
        isDev
          ? path.join(__dirname, './icon.ico')
          : `${path.join(__dirname, '../build/icon.ico')}`
    )
    
    const contextMenu = Menu.buildFromTemplate([
        {
            label: "Quit Tic Tac Toe",
            click() { app.quit() }
        }
    ])

    tray.setToolTip('Tic Tac Toe')
    tray.setContextMenu(contextMenu)
  })

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    if (BrowserWindow.getAllWindows.length === 0) createWindow()
})

// events

ipcMain.handle("close", (ipcEvent) => {
    const window = findBrowserWindow(ipcEvent)
    window.close();
})

ipcMain.handle("maximize", (ipcEvent) => {
    const window = findBrowserWindow(ipcEvent)
    if (window.isMaximized()) {
        window.unmaximize();
    } else {
        window.maximize();
    }
})

ipcMain.handle("minimize", (ipcEvent) => {
    const window = findBrowserWindow(ipcEvent)
    window.minimize();
})

function findBrowserWindow (ipcEvent) {
    return BrowserWindow.fromWebContents(ipcEvent.sender)
}