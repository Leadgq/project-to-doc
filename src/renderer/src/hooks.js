import { ElMessage } from 'element-plus'
import { reactive } from 'vue'
export const useTipHook = () => {
  const showTip = () => {
    ElMessage.info(
      '文件夹: 选择想要转换的文件夹位置（不建议选择整个工程）, 文件: 具体是那个文件、具体选择在下面操作'
    )
  }
  const showFoldTips = () => {
    ElMessage.info('会弹出一个弹出选择你要转换的文件夹位置')
  }

  const showSufiTips = () => {
    ElMessage.info('选择你要转换的文件后缀，不选择所有文件都会转换')
  }

  const showAllTips = () => {
    ElMessage.info('是否递归获取文件夹下的所有文件, 不选择只会获取当前文件夹下的文件')
  }

  const showFileTips = () => {
    ElMessage.info('会弹出一个弹出选择你要转换的文件位置,多选')
  }

  return {
    showTip,
    showFoldTips,
    showSufiTips,
    showAllTips,
    showFileTips
  }
}

export const useActionAndSuffixOptionHook = () => {
  const actionOptions = [
    {
      label: '文件夹',
      value: 'folder'
    },
    {
      label: '文件',
      value: 'file'
    }
  ]
  const suffixOptions = [
    {
      label: '全部',
      value: ''
    },
    {
      label: 'vue',
      value: '.vue'
    },
    {
      label: 'ts',
      value: '.ts'
    },
    {
      label: 'js',
      value: '.js'
    },
    {
      label: 'java',
      value: '.java'
    }
  ]
  return {
    actionOptions,
    suffixOptions
  }
}

export const useFormActionHook = () => {
  const form = reactive({
    action: 'folder',
    FileFolderName: '',
    suffix: '',
    isRecursion: false,
    fileFileName: '',
    isRemoveComment: true
  })

  const focusFileFolder = async () => {
    form.FileFolderName = await window.api.openFileFolder()
  }

  const focusFileName = async () => {
    form.fileFileName = await window.api.openFile()
  }

  const save = () => {
    if (form.action === 'folder') {
      if (!form.FileFolderName) {
        ElMessage.error('请选择文件夹位置')
        return
      }
      window.api.saveFolderFile(
        form.FileFolderName,
        form.suffix,
        form.isRecursion,
        form.isRemoveComment
      )
    } else {
      if (!form.fileFileName) {
        ElMessage.error('请选择文件位置')
        return
      }
      window.api.saveFile(form.fileFileName, form.isRemoveComment)
    }
  }
  const reset = () => {
    form.action = 'folder'
    form.FileFolderName = ''
    form.suffix = ''
    form.isRecursion = false
    form.fileFileName = ''
    form.isRemoveComment = true
  }

  return {
    form,
    focusFileFolder,
    focusFileName,
    save,
    reset
  }
}
