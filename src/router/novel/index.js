import AuthRoute from '@/router/auth-route'

export default {
  path: '/novel',
  name: 'novel',
  component: () => import(/* webpackChunkName: "novel" */ '@/views/Novel.vue'),
  beforeEnter: AuthRoute.ifAuthenticated
}
