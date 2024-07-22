import { createRouter, createWebHashHistory } from 'vue-router'
import store from "@/store";

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login/index')
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

router.beforeEach((to, from, next) => {
  //如果没有token，则统统重定向至登录页面
  if (!store.getters.token) {
    if (to.path === '/login') {
      next()
    }
    console.log("222w")
    next('/login')
  } else {
    console.log("11")
    //如果有token且想访问登录页面，则重定向至主页
    if (to.path === "/login") {
      next('/dashboard')
    }
    next()
  }
})

export default router
