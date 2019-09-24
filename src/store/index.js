import Vue from 'vue'
import Vuex from 'vuex'
import CreatePersistedState from "vuex-persistedstate"
import auth from './modules/auth'
import user from './modules/user'
import novelSearch from './modules/novel/search'
import novelDetail from './modules/novel/detail'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    auth,
    user,
    novelSearch,
    novelDetail
  },
  strict: debug,
  plugins: [CreatePersistedState({
    key: 'crawler-client',
    storage: window.sessionStorage
  })]
})
