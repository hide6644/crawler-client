import NovelsRepository from "./NovelsRepository";

const repositories = {
  novels: NovelsRepository
  // other repositories ...
};

export const RepositoryFactory = {
  get: name => repositories[name]
};
