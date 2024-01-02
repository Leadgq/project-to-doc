import { contextBridge, ipcRenderer, dialog } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { readeFile, readeFolderFile } from './tools'

const api = {
  async openFileFolder() {
    return await ipcRenderer.invoke('openFileFolder')
  },
  saveFolderFile(fileFolderName, suffix = '', isRecursion = false, isRemoveComment = true) {
    let content = readeFolderFile(fileFolderName, suffix, isRecursion, isRemoveComment)
    if (content) {
      ipcRenderer.send('saveFile', content)
    } else {
      dialog.showMessageBox({
        type: 'error',
        title: '提示',
        message: '文件夹下没有文件',
        buttons: ['确定']
      })
    }
  },
  async openFile() {
    const files = await ipcRenderer.invoke('openFile')
    return files.join(',') || []
  },
  saveFile(filePath, isRemoveComment) {
    const pathList = filePath.split(',')
    const content = readeFile(pathList, isRemoveComment)
    if (content) {
      ipcRenderer.send('saveFile', content)
    } else {
      dialog.showMessageBox({
        type: 'error',
        title: '提示',
        message: '文件夹下没有文件',
        buttons: ['确定']
      })
    }
  }
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
