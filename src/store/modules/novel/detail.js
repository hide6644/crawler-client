import { NOVEL_REQUEST, NOVEL_SUCCESS, NOVEL_ERROR } from '../../actions/novel/detail'
import { repositoryFactory } from '@/repositories/repository-factory'

const novelRepository = repositoryFactory.get('novel')

const state = { status: '' }

const getters = {
  getNovelSummary: state => state.novelSummary
}

const actions = {
  [NOVEL_REQUEST]: ({ commit }, novelId) => {
    return new Promise((resolve, reject) => {
      commit(NOVEL_REQUEST)
      novelRepository.getOne(novelId)
      .then(resp => {
        commit(NOVEL_SUCCESS, resp)
        resolve(resp)
      })
      .catch(err => {
        commit(NOVEL_ERROR)
        reject(err)
      })
    })
  }
}

const mutations = {
  [NOVEL_REQUEST]: state => {
    state.status = 'loading'
  },
  [NOVEL_SUCCESS]: (state, resp) => {
    state.status = 'success'
    state.novelSummary = resp.data.novel
  },
  [NOVEL_ERROR]: state => {
    state.status = 'error'
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
