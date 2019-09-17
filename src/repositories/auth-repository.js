import repository from "./base-repository"

export default {
  login(payload) {
    return repository.post("/login", payload)
  }
}
