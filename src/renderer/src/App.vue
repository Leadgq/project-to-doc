<script setup>
import { reactive } from 'vue'
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
  action: 'folder',
  FileFolderName: '',
  suffix: '',
  isRecursion: false
})

const focusFileFolder = async () => {
  form.FileFolderName = await window.api.openFileFolder()
}

const save = () => {
  window.api.saveFile(form.FileFolderName, form.suffix, form.isRecursion)
}
</script>

<template>
  <div class="w-full h-full flex flex-col items-center">
    <div class="flex flex-col">
      <div class="flex items-center mt-3">
        <span class="text-sm"> 操作行为:</span>
        <el-select v-model="form.action" class="ml-5">
          <el-option
            v-for="item in actionOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div v-if="form.action === 'folder'" class="flex flex-col">
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
        </div>
        <div>
          <div class="flex items-center mt-3">
            <span class="text-sm"> 文件后缀:</span>
            <el-select v-model="form.suffix" class="ml-5">
              <el-option
                v-for="item in suffixOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="flex items-center mt-3">
            <span class="text-sm mr-5"> 全部获取:</span>
            <el-switch v-model="form.isRecursion" size="big" />
          </div>
        </div>
      </div>
      <div class="w-full flex justify-end mt-1">
        <el-button class="w-[50px]" @click="save">转换</el-button>
      </div>
    </div>
  </div>
</template>
