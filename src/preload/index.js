import { contextBridge, ipcRenderer, dialog } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
const stripComments = require('strip-comments')
import fs from 'fs'
import path from 'path'

const api = {
  async openFileFolder() {
    return await ipcRenderer.invoke('openFileFolder')
  },
  saveFile(fileFolderName, suffix = '', isRecursion = false) {
    let content = readerFile(fileFolderName, suffix, isRecursion)
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

const readerFile = (folderPath, suffix = '', isRecursion = false) => {
  let content = ''
  const files = fs.readdirSync(folderPath)
  for (const file of files) {
    const filePath = path.join(folderPath, file)
    if (fs.statSync(filePath).isDirectory()) {
      if (isRecursion) {
        content += readerFile(filePath, suffix, isRecursion) // 递归调用
      }
    } else {
      const sourceCode = fs.readFileSync(filePath, 'utf8')
      const strippedCode = stripComments(sourceCode).replace(/<!--[\s\S]*?-->/g, '')
      if (suffix && path.extname(filePath) === suffix) {
        content += strippedCode + '\n'
      } else if (!suffix) {
        content += strippedCode + '\n'
      }
    }
  }
  return content
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
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
