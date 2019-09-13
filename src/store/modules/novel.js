import { NOVEL_SEARCH, NOVEL_UPDATE_FAV } from '../actions/novel'
import { repositoryFactory } from '@/repositories/repository-factory'

const novelRepository = repositoryFactory.get('novel')

const state = { searchParameter: {} }

const getters = {
  getSearchParameter: state => state.searchParameter
}

const actions = {
  [NOVEL_SEARCH]: (param) => {
    return new Promise((resolve, reject) => {
      novelRepository.get(param)
      .then(resp => {
        resolve(resp)
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  [NOVEL_UPDATE_FAV]: ({ commit }, novel) => {
    return new Promise((resolve, reject) => {
      novelRepository.updateFavorite(novel)
      .then(resp => {
        resolve(resp)
      })
      .catch(err => {
        reject(err)
      })
    })
  }
}

const mutations = {
  [NOVEL_SEARCH]: (state, searchParameter) => {
    state.searchParameter = searchParameter
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
