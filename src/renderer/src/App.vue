<script setup>
import { Help } from '@icon-park/vue-next'
import { useTipHook, useActionAndSuffixOptionHook, useFormActionHook } from './hooks.js'
const { showTip, showFoldTips, showSufiTips, showAllTips, showFileTips } = useTipHook()
const { actionOptions, suffixOptions } = useActionAndSuffixOptionHook()
const { form, focusFileFolder, focusFileName, save, reset } = useFormActionHook()
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
      <section>
        <span class="text-sm mr-5"> 去除注释:</span>
        <el-switch v-model="form.isRemoveComment" size="big" class="mr-3" />
      </section>
      <section class="w-full flex justify-between mt-3">
        <el-button class="w-[30%]" @click="save">转换</el-button>
        <el-button class="w-[30%]" @click="reset">重置</el-button>
      </section>
    </main>
  </div>
</template>
