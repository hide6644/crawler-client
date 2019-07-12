import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import AuthRoute from '@/router/auth-route'
import NovelRoutes from '@/router/novel'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
      beforeEnter: AuthRoute.ifNotAuthenticated
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import(/* webpackChunkName: "login" */ '@/views/Signup.vue'),
      beforeEnter: AuthRoute.ifNotAuthenticated
    },
    { ...NovelRoutes }
  ]
})
