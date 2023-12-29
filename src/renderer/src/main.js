import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import '@renderer/assets/css/tailwind.scss'
import '@renderer/assets/css/styles.less'

createApp(App).use(ElementPlus).mount('#app')
