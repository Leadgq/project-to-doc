const officegen = require('officegen')
import fs from 'fs'
const stripComments = require('strip-comments')
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
  const execMap = {
    darwin: 'open',
    win32: 'start',
    linux: 'xdg-open',
    win64: 'start'
  }
  const cmd = execMap[process.platform]
  if (!cmd) {
    throw new Error('platform is not support')
  }
  exec(`${cmd} ${filePath}`, (error) => {
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
// 转换文件
export const transform = (path, isRemoveComment = true) => {
  const sourceCode = fs.readFileSync(path, 'utf8')
  if (!isRemoveComment) return sourceCode
  return stripComments(sourceCode).replace(/<!--[\s\S]*?-->/g, '')
}
