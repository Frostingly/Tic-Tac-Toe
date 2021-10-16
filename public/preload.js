const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld('app', {
    close: () => ipcRenderer.invoke("close"),
    maximize: () => ipcRenderer.invoke("maximize"),
    minimize: () => ipcRenderer.invoke("minimize"),

    cube_clicked: () => ipcRenderer.invoke("game/cube-clicked")
})