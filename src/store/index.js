import { createStore } from 'vuex'
import CreatePersistedState from "vuex-persistedstate"
import auth from './modules/auth'
import user from './modules/user'
import novelSearch from './modules/novel/search'
import novelDetail from './modules/novel/detail'

export default createStore({
  modules: {
    auth,
    user,
    novelSearch,
    novelDetail
  },
  strict: process.env.NODE_ENV !== 'production',
  plugins: [CreatePersistedState({
    key: 'crawler-client',
    storage: window.sessionStorage
  })]
})
