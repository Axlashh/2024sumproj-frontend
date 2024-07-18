import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: () => import('@/views/AboutView')
  },
  {
    path: '/dashboard',
    component: () => import('@/views/HomeView')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
