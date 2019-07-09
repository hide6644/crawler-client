import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ja'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI, {locale})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

const token = localStorage.getItem('user-token')

if (token) {
  axios.defaults.headers.common['Authorization'] = token
}
