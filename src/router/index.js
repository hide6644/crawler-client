import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import authRoute from '@/router/auth-route'
import novelRoutes from '@/router/novel'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/crawler-client',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "Login" */ '@/views/Login.vue'),
      beforeEnter: authRoute.ifNotAuthenticated
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import(/* webpackChunkName: "Signup" */ '@/views/Signup.vue'),
      beforeEnter: authRoute.ifNotAuthenticated
    },
    { ...novelRoutes }
  ]
})
