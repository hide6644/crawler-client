import Vue from 'vue'
import { NOVEL_SEARCH, NOVEL_SEARCH_SUCCESS, NOVEL_SEARCH_ERROR, NOVEL_UPDATE_FAV } from '../actions/novel'
import { repositoryFactory } from '@/repositories/repository-factory'

const novelRepository = repositoryFactory.get('novel')

const state = { status: '', searchParameter: {} }

const getters = {
  getNovelSearchParameter: state => state.searchParameter,
  getNovelSummaryList: state => state.novelSummaryList
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
        commit(NOVEL_UPDATE_FAV, novel)
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
    Vue.set(state, 'novelSummaryList', resp.data.novels)
  },
  [NOVEL_SEARCH_ERROR]: state => {
    state.status = 'error'
  },
  [NOVEL_UPDATE_FAV]: (state, novel) => {
    if (state.novelSummaryList) {
      state.novelSummaryList.find(novelSummary => novelSummary.id === novel.novelId)
          .novelInfoSummary.favorite = novel.favorite
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
