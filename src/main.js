import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./validater"

import ElementPlus from 'element-plus'
import ja from 'element-plus/dist/locale/ja.mjs'
import 'element-plus/dist/index.css'

import { createI18n } from 'vue-i18n'
import enNames from './locales/enNames.json'
import jaNames from './locales/jaNames.json'

const i18n = createI18n({
  legacy: false, // you must set `false`, to use Composition API
  locale: 'ja',
  messages: {
    en: enNames,
    ja: jaNames
  }
});

const app = createApp(App)

app.use(router)
app.use(store)
app.use(i18n)
app.use(ElementPlus, {ja})

app.mount('#app')
