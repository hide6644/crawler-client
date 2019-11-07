import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./validater"

import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ja'
import 'element-ui/lib/theme-chalk/index.css'

import VueI18n from 'vue-i18n'
import enNames from './locale/enNames.json'
import jaNames from './locale/jaNames.json'

Vue.config.productionTip = false
Vue.use(ElementUI, {locale})
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'ja',
  messages: {
    en: enNames,
    ja: jaNames
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
  i18n
}).$mount('#app')
