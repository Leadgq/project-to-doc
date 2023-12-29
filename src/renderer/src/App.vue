<script setup>
import { reactive } from 'vue'
import { Help } from '@icon-park/vue-next'
import { ElMessage } from 'element-plus'
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
  }
]
const form = reactive({
  action: 'file',
  FileFolderName: '',
  suffix: '',
  isRecursion: false,
  fileFileName: ''
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
    window.api.saveFolderFile(form.FileFolderName, form.suffix, form.isRecursion)
  } else {
    if (!form.fileFileName) {
      ElMessage.error('请选择文件位置')
      return
    }
    window.api.saveFile(form.fileFileName)
  }
}

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
</script>

<template>
  <div class="w-full h-full flex flex-col items-center">
    <main class="flex flex-col">
      <section class="flex items-center mt-3">
        <span class="text-sm"> 操作行为:</span>
        <el-select v-model="form.action" class="ml-5 mr-3">
          <el-option
            v-for="item in actionOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <Help theme="outline" size="18" fill="#fff" class="cursor-pointer" @click="showTip" />
      </section>
      <section v-if="form.action === 'folder'" class="flex flex-col">
        <div class="flex items-center mt-3">
          <div class="text-sm mr-2">文件夹位置:</div>
          <el-input
            v-model="form.FileFolderName"
            autosize
            type="textarea"
            class="w-[200px]"
            :autosize="{ minRows: 2 }"
            @click="focusFileFolder"
          ></el-input>
          <Help
            theme="outline"
            size="18"
            fill="#fff"
            class="ml-3 cursor-pointer"
            @click="showFoldTips"
          />
        </div>
        <div>
          <div class="flex items-center mt-3">
            <span class="text-sm"> 文件后缀:</span>
            <el-select v-model="form.suffix" class="ml-5 mr-3">
              <el-option
                v-for="item in suffixOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <Help
              theme="outline"
              size="18"
              fill="#fff"
              class="cursor-pointer"
              @click="showSufiTips"
            />
          </div>
          <div class="flex items-center mt-3">
            <span class="text-sm mr-5"> 全部获取:</span>
            <el-switch v-model="form.isRecursion" size="big" class="mr-3" />
            <Help
              theme="outline"
              size="18"
              fill="#fff"
              class="cursor-pointer"
              @click="showAllTips"
            />
          </div>
        </div>
      </section>

      <section v-if="form.action === 'file'" class="flex flex-col mb-2">
        <div class="flex items-center mt-3">
          <div class="text-sm mr-2">文件的位置:</div>
          <el-input
            v-model="form.fileFileName"
            autosize
            type="textarea"
            class="w-[200px]"
            :autosize="{ minRows: 2 }"
            @click="focusFileName"
          ></el-input>
          <Help
            theme="outline"
            size="18"
            fill="#fff"
            class="ml-3 cursor-pointer"
            @click="showFileTips"
          />
        </div>
      </section>
      <section class="w-full flex justify-end mt-1">
        <el-button class="w-[50px]" @click="save">转换</el-button>
      </section>
    </main>
  </div>
</template>
