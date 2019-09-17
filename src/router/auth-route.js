import store from '@/store'

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next({
    path: '/login',
    query: { redirect: to.fullPath }
  })
}

export default {
  ifNotAuthenticated,
  ifAuthenticated
}
