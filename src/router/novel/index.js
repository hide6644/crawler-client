import authRoute from '@/router/auth-route'

export default {
  path: '/novel',
  name: 'Novel',
  component: () => import(/* webpackChunkName: "novels" */ '@/views/novel/Search.vue'),
  beforeEnter: authRoute.ifAuthenticated,
  children: [
    {
      path: 'detail/:id',
      name: 'NovelDetail',
      component: () => import(/* webpackChunkName: "novelDetail" */ '@/views/novel/Detail.vue'),
      beforeEnter: authRoute.ifAuthenticated
    }
  ]
}
