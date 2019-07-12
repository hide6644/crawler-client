import Repository from "./Repository"

const resource = "/novels"

export default {
  get() {
    return Repository.get(`${resource}`)
  },
  getNovel(novelId) {
    return Repository.get(`${resource}/${novelId}`)
  },
  createNovel(payload) {
    return Repository.post(`${resource}`, payload)
  }
}
