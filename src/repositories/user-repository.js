import repository from "./base-repository"

const resource = "/users"

export default {
  get() {
    return repository.get(`${resource}`)
  },
  getByUsername(username) {
    return repository.get(`${resource}`, {
      params: {
        username: username
      }
    })
  },
  create(payload) {
    return repository.post(`${resource}`, payload)
  }
}
