import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT } from '../actions/auth'
import { USER_REQUEST } from '../actions/user'
import { repositoryFactory } from '@/repositories/repository-factory'

const authRepository = repositoryFactory.get('auth')

const state = { token: '', status: '', hasLoadedOnce: false }

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status
}

const actions = {
  [AUTH_REQUEST]: ({commit, dispatch}, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      authRepository.login(user)
      .then(resp => {
        commit(AUTH_SUCCESS, resp)
        dispatch(USER_REQUEST, user.username)
        resolve(resp)
      })
      .catch(err => {
        commit(AUTH_ERROR, err)
        reject(err)
      })
    })
  },
  [AUTH_LOGOUT]: ({commit}) => {
    return new Promise((resolve) => {
      commit(AUTH_LOGOUT)
      resolve()
    })
  }
}

const mutations = {
  [AUTH_REQUEST]: state => {
    state.status = 'loading'
  },
  [AUTH_SUCCESS]: (state, resp) => {
    state.status = 'success'
    state.token = resp.data.token
    state.hasLoadedOnce = true
  },
  [AUTH_ERROR]: state => {
    state.status = 'error'
    state.hasLoadedOnce = true
  },
  [AUTH_LOGOUT]: state => {
    state.token = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
