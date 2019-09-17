import authRoute from '@/router/auth-route'

export default {
  path: '/novel',
  name: 'Novel',
  component: () => import(/* webpackChunkName: "NovelSearch" */ '@/views/novel/Search.vue'),
  beforeEnter: authRoute.ifAuthenticated,
  children: [
    {
      path: 'detail/:id',
      name: 'NovelDetail',
      component: () => import(/* webpackChunkName: "NovelDetail" */ '@/views/novel/Detail.vue'),
      beforeEnter: authRoute.ifAuthenticated
    }
  ]
}
