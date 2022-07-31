import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/ ',
    // 子路由的path 没有/ 会将父级的path和子级的path拼接
    // 子路由的path 有/ 不会拼接 直接访问该路径
    children: [
      {
        path: '/ ',
        component: () => import('@/views/home')
      },
      {
        path: '/video',
        component: () => import('@/views/video')
      },
      {
        path: '/qa',
        component: () => import('@/views/qa')
      },
      {
        path: '/my',
        component: () => import('@/views/my')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
