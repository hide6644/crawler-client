import Vue from 'vue'
import Router from 'vue-router'
import Store from '@/store'
import Home from '@/views/Home.vue'

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  if (!Store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (Store.getters.isAuthenticated) {
    next()
    return
  }
  next({
    path: '/login',
    query: { redirect: to.fullPath }
  })
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: '/novel',
      name: 'novel',
      component: () => import(/* webpackChunkName: "novel" */ '@/views/Novel.vue'),
      beforeEnter: ifAuthenticated,
    }
  ]
})
