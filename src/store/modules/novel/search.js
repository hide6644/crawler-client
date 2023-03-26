import { NOVEL_SEARCH, NOVEL_SEARCH_SUCCESS, NOVEL_SEARCH_ERROR, NOVEL_UPDATE_FAV } from '../../actions/novel/search'
import { repositoryFactory } from '@/repositories/repository-factory'

const novelRepository = repositoryFactory.get('novel')

const state = {
  status: '',
  searchParameter: {
    title: '',
    writername: '',
    description: ''
  }
}

const getters = {
  getSearchParameter: state => state.searchParameter,
  getNovelSummaryList: state => state.novelSummaryList,
  getAggregateByKeywords: state => state.aggregateByKeywords
}

const actions = {
  [NOVEL_SEARCH]: ({ commit }, param) => {
    return new Promise((resolve, reject) => {
      commit(NOVEL_SEARCH, param)
      novelRepository.get(searchParameterBuilder(param))
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
  [NOVEL_SEARCH]: (state, param) => {
    state.status = 'loading'
    state.searchParameter = param
  },
  [NOVEL_SEARCH_SUCCESS]: (state, resp) => {
    state.status = 'success'
    state.novelSummaryList = resp.data.novels
    state.aggregateByKeywords = resp.data.aggregateByKeywords
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

const searchParameter = {
  data: function () {
    return {
      param: ''
    }
  },
  init: function () {
    this.param = ''
    return this
  },
  add: function (key, val) {
    if (val != '') {
      if (this.param != '') {
        this.param = this.param + ','
      }
      this.param = this.param + key + ':' + val
    }
    return this
  },
  get: function () {
    return this.param
  }
}

function searchParameterBuilder(param) {
  const { title, writername, description } = param
  return searchParameter.init()
      .add('title', title)
      .add('writername', writername)
      .add('description', description)
      .get()
}

export default {
  state,
  getters,
  actions,
  mutations
}
