import Vue from 'vue'
import { USER_REQUEST, USER_ERROR, USER_SUCCESS, USER_SIGNUP } from '../actions/user'
import { AUTH_REQUEST, AUTH_LOGOUT } from '../actions/auth'
import { RepositoryFactory } from '@/repositories/RepositoryFactory'

const state = { status: '', profile: {} }
const UsersRepository = RepositoryFactory.get('users')

const getters = {
  getProfile: state => state.profile,
  isProfileLoaded: state => !!state.profile.username
}

const actions = {
  [USER_REQUEST]: ({commit, dispatch}, username) => {
    commit(USER_REQUEST)
    UsersRepository.getUser(username)
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
    UsersRepository.signupUser(user)
    .then(resp => {
      dispatch(AUTH_REQUEST, resp.data)
    })
    .catch(() => {
      dispatch(AUTH_LOGOUT)
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
