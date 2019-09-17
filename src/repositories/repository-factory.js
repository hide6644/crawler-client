import authRepository from "./auth-repository"
import userRepository from "./user-repository"
import novelRepository from "./novel-repository"

const repositories = {
  auth: authRepository,
  user: userRepository,
  novel: novelRepository
  // other repositories ...
}

export const repositoryFactory = {
  get: name => repositories[name]
}
