import Vue from 'vue'
import Vuex from 'vuex'
import CreatePersistedState from "vuex-persistedstate"
import auth from './modules/auth'
import user from './modules/user'
import novel from './modules/novel'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    auth,
    user,
    novel
  },
  strict: debug,
  plugins: [CreatePersistedState({
    key: 'crawler-client',
    storage: window.sessionStorage
  })]
})
