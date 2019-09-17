import Vue from 'vue'
import { NOVEL_SEARCH, NOVEL_SEARCH_SUCCESS, NOVEL_SEARCH_ERROR, NOVEL_UPDATE_FAV } from '../actions/novel'
import { repositoryFactory } from '@/repositories/repository-factory'

const novelRepository = repositoryFactory.get('novel')

const state = { status: '', searchParameter: {} }

const getters = {
  getNovelSearchParameter: state => state.searchParameter,
  getNovelSummary: state => state.summary
}

const actions = {
  [NOVEL_SEARCH]: ({ commit }, searchParameter) => {
    return new Promise((resolve, reject) => {
      commit(NOVEL_SEARCH, searchParameter)
      novelRepository.get(searchParameter)
      .then(resp => {
        commit(NOVEL_SEARCH_SUCCESS, resp)
        resolve(resp)
      })
      .catch(err => {
        commit(NOVEL_SEARCH_ERROR)
        reject(err)
      })
    })
  },
  [NOVEL_UPDATE_FAV]: ({ commit }, novel) => {
    return new Promise((resolve, reject) => {
      novelRepository.updateFavorite(novel)
      .then(resp => {
        commit(NOVEL_UPDATE_FAV)
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
  },
  [NOVEL_SEARCH_SUCCESS]: (state, resp) => {
    state.status = 'success'
    Vue.set(state, 'summary', resp.data.novels)
  },
  [NOVEL_SEARCH_ERROR]: (state) => {
    state.status = 'error'
  },
  [NOVEL_UPDATE_FAV]: (state) => {
    state.status = 'success'
    // TODO 検索結果一覧のFavorite情報を書き換える
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
