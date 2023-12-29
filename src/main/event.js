import { ipcMain, dialog, BrowserWindow } from 'electron'
const officegen = require('officegen')
import fs from 'fs'

ipcMain.handle('openFileFolder', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openDirectory']
  })
  if (!canceled) {
    return filePaths[0]
  }
})

ipcMain.on('saveFile', async (event, content) => {
  const wind = BrowserWindow.fromWebContents(event.sender)
  const { filePath } = await dialog.showSaveDialog([wind], {
    title: '保存文件',
    defaultPath: 'new.docx',
    filters: [{ name: 'Word', extensions: ['doc'] }]
  })
  if (!filePath) return
  let docx = officegen('docx')
  let pObj = docx.createP()
  pObj.addText(content)
  const out = fs.createWriteStream(filePath)
  out.on('error', function (err) {
    console.log(err)
  })
  docx.generate(out)
  out.on('close', function () {
    dialog.showMessageBox({
      type: 'info',
      title: '成功',
      message: '文件保存成功',
      buttons: ['确定']
    })
  })
})
