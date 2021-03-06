import repository from "./base-repository"

const resource = "/novels"

export default {
  get(param) {
    if (param) {
      return repository.get(`${resource}?search=${param}`)
    } else {
      return repository.get(`${resource}`)
    }
  },
  getOne(novelId) {
    return repository.get(`${resource}/${novelId}`)
  },
  create(payload) {
    return repository.post(`${resource}`, payload)
  },
  updateFavorite(payload) {
    return repository.put(`${resource}/${payload.novelId}/favorite`, payload.favorite)
  }
}
