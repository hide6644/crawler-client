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
  signup(payload) {
    return repository.post("/signup", payload)
  }
}
