import { createRouter, createWebHashHistory } from 'vue-router'
import store from "@/store";
import Layout from "@/layout/index.vue";
import NProgress from "core-js/internals/string-pad";

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    hidden: true,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/HomeView'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      },
      {
        path: 'sys',
        children: [
          {
            path: 'dict',
            component: () => import('@/views/sys/dict/Dict'),
            name: 'Dict',
            meta: { title: '字典管理', icon: 'dashboard', affix: true }
          },
          {
            path: 'menu',
            component: () => import('@/views/sys/menu/Menu'),
            name: 'Menu',
            meta: { title: '菜单管理', icon: 'dashboard', affix: true }
          },
          {
            path: 'role',
            component: () => import('@/views/sys/role/Role'),
            name: 'Role',
            meta: { title: '角色管理', icon: 'dashboard', affix: true }
          },
          {
            path: 'dept',
            component: () => import('@/views/sys/dept/dept'),
            name: 'Dept',
            meta: { title: '部门管理', icon: 'dashboard', affix: true }
          },
          {
            path: 'user',
            component: () => import('@/views/sys/User/User'),
            name: 'User',
            meta: { title: '用户管理', icon: 'dashboard', affix: true }
          },
        ]
      },
      {
        path: 'mdt',
        children: [
          {
            path: 'mdtRecord',
            component:() => import('@/views/mdt/MDTRecord'),
            meta: { title: 'MDT管理', icon: 'dashboard', affix: true }
          },
          {
            path: 'mdtGroup',
            component: () => import('@/views/sys/MdtGroup/MdtGroup'),
            name: 'MdtGroup',
            meta: { title: 'mdt团队管理', icon: 'dashboard', affix: true }
          },
        ]
      }
    ]
  },
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  //如果没有token，则统统重定向至登录页面
  if (!store.getters.token) {
    if (to.path === '/login') {
      next()
    }
    next('/login')
  } else {
    console.log("11")
    // 如果有token且想访问登录页面，则重定向至主页
    if (to.path === "/login") {
      next('/dashboard')
    }
    if (store.getters.permission_routes == null || store.getters.permission_routes.length === 0) {
      const accessRoutes = await store.dispatch('permission/generateRoutes')
    }
    console.log(store.getters.permission_routes)
    next()
  }
})

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router

export const errorRoutes = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

export const asyncRoutes = []

export const constantRoutes = []