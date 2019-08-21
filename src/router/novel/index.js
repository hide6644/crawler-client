import AuthRoute from '@/router/auth-route'

export default {
  path: '/novels',
  name: 'novels',
  component: () => import(/* webpackChunkName: "novel" */ '@/views/Novels.vue'),
  beforeEnter: AuthRoute.ifAuthenticated
}
