import repository from "./base-repository"

export default {
  login(payload) {
    return repository.post("/login", payload)
  },
  signup(payload) {
    return repository.post("/signup", payload)
  }
}
