import Repository from "./Repository"

const resource = "/login"

export default {
  login(payload) {
    return Repository.post(`${resource}`, payload)
  }
}
