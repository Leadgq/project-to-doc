import { ipcMain, dialog, BrowserWindow } from 'electron'
import { generateDocx, openFile } from './util'

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
  try {
    const out = generateDocx(content, filePath)
    out.on('close', async function () {
      const { response } = await dialog.showMessageBox({
        type: 'info',
        title: '成功',
        message: '文件保存成功',
        buttons: ['打开文件', '确定']
      })
      // 打开文件
      if (response === 0) {
        openFile(filePath)
      }
    })
  } catch (e) {
    dialog.showMessageBox({
      type: 'error',
      title: '失败',
      message: '文件保存失败,你的后缀名可能不是docx',
      buttons: ['确定']
    })
  }
})

ipcMain.handle('openFile', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile', 'multiSelections']
  })
  if (!canceled) {
    return filePaths
  }
})
