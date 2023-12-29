import fs from 'fs'
import { transform } from '../main/util'
import path from 'path'

export const readeFile = (pathList) => {
  let content = ''
  for (const path of pathList) {
    const strippedCode = transform(path)
    content += strippedCode + '\n'
  }
  return content
}

export const readeFolderFile = (folderPath, suffix = '', isRecursion = false) => {
  let content = ''
  const files = fs.readdirSync(folderPath)
  for (const file of files) {
    const filePath = path.join(folderPath, file)
    if (fs.statSync(filePath).isDirectory()) {
      if (isRecursion) {
        content += readeFolderFile(filePath, suffix, isRecursion)
      }
    } else {
      const strippedCode = transform(filePath)
      if (suffix && path.extname(filePath) === suffix) {
        content += strippedCode + '\n'
      } else if (!suffix) {
        content += strippedCode + '\n'
      }
    }
  }
  return content
}
