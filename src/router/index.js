import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import authRoute from '@/router/auth-route'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/crawler-client',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/login',
      component: () => import(/* webpackChunkName: "Login" */ '@/views/Login.vue'),
      beforeEnter: authRoute.ifNotAuthenticated
    },
    {
      path: '/signup',
      component: () => import(/* webpackChunkName: "Signup" */ '@/views/Signup.vue'),
      beforeEnter: authRoute.ifNotAuthenticated
    },
    {
      path: '/novel',
      component: () => import(/* webpackChunkName: "Novel" */ '@/views/novel/NovelSearch.vue'),
      beforeEnter: authRoute.ifAuthenticated
    },
    {
      path: '/novel/:id',
      component: () => import(/* webpackChunkName: "Novel" */ '@/views/novel/NovelDetail.vue'),
      beforeEnter: authRoute.ifAuthenticated
    }
  ]
})
