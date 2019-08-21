import Vue from 'vue'
import { USER_REQUEST, USER_ERROR, USER_SUCCESS, USER_SIGNUP } from '../actions/user'
import { AUTH_REQUEST, AUTH_LOGOUT } from '../actions/auth'
import { repositoryFactory } from '@/repositories/repository-factory'

const state = { status: '', profile: {} }
const authRepository = repositoryFactory.get('auth')
const userRepository = repositoryFactory.get('user')

const getters = {
  getProfile: state => state.profile,
  isProfileLoaded: state => !!state.profile.username
}

const actions = {
  [USER_REQUEST]: ({commit, dispatch}, username) => {
    commit(USER_REQUEST)
    userRepository.getByUsername(username)
    .then(resp => {
      commit(USER_SUCCESS, resp)
    })
    .catch(() => {
      commit(USER_ERROR)
      // if resp is unauthorized, logout, to
      dispatch(AUTH_LOGOUT)
    })
  },
  [USER_SIGNUP]: ({dispatch}, user) => {
    return new Promise((resolve, reject) => {
      authRepository.signup(user)
      .then(resp => {
        dispatch(AUTH_REQUEST, user)
        resolve(resp)
      })
      .catch(err => {
        reject(err)
      })
    })
  }
}

const mutations = {
  [USER_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [USER_SUCCESS]: (state, resp) => {
    state.status = 'success'
    Vue.set(state, 'profile', resp.data)
  },
  [USER_ERROR]: (state) => {
    state.status = 'error'
  },
  [AUTH_LOGOUT]: (state) => {
    state.profile = {}
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
