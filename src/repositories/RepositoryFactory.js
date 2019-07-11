import AuthRepository from "./AuthRepository";
import UsersRepository from "./UsersRepository";
import NovelsRepository from "./NovelsRepository";

const repositories = {
  auth: AuthRepository,
  users: UsersRepository,
  novels: NovelsRepository
  // other repositories ...
}

export const RepositoryFactory = {
  get: name => repositories[name]
}
