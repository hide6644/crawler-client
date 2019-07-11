import Repository from "./Repository"

const resource = "/users"

export default {
  get() {
    return Repository.get(`${resource}`)
  },

  getUser(username) {
    return Repository.get(`${resource}`, {
      params: {
        username: username
      }
    })
  },

  createUser(payload) {
    return Repository.post(`${resource}`, payload)
  },

  signupUser(payload) {
    return Repository.post("signup", payload)
  }
}
