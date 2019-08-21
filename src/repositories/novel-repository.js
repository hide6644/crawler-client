import repository from "./base-repository"

const resource = "/novels"

export default {
  get(param) {
    return repository.get(`${resource}?search=${param}`)
  },
  getOne(novelId) {
    return repository.get(`${resource}/${novelId}`)
  },
  create(payload) {
    return repository.post(`${resource}`, payload)
  }
}
