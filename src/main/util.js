const officegen = require('officegen')
import fs from 'fs'
import { dialog } from 'electron'
const { exec } = require('child_process')

export const generateDocx = (content, filePath) => {
  if (!content || !filePath) {
    throw new Error('content or filePath is empty')
  }
  let docx = officegen('docx')
  let pObj = docx.createP()
  pObj.addText(content)
  const out = fs.createWriteStream(filePath)
  out.on('error', function (err) {
    throw new Error(err)
  })
  docx.generate(out)
  return out
}

export const openFile = (filePath) => {
  if (!filePath) {
    throw new Error('filePath is empty')
  }
  exec((process.platform === 'win32' ? 'start' : 'open') + ' ' + filePath, (error) => {
    if (error) {
      dialog.showMessageBox({
        type: 'error',
        title: '失败',
        message: '文件打开失败',
        buttons: ['确定']
      })
    }
  })
}
