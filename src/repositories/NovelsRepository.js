import Repository from "./Repository"

const resource = "/novels"

export default {
  get(param) {
    return Repository.get(`${resource}?search=${param}`)
  },
  getOne(novelId) {
    return Repository.get(`${resource}/${novelId}`)
  },
  create(payload) {
    return Repository.post(`${resource}`, payload)
  }
}
