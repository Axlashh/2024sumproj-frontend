import { asyncRoutes, errorRoutes, constantRoutes } from '@/router'
import { getAuthMenu } from '@/api/user'
import { ElMessage } from 'element-plus'
import Layout from '@/layout'

/**
 * 验证当前用户是否有某种特定权限
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 后台查询的菜单数据拼装成路由格式的数据
 * @param routes
 */
export function generateAuthMenu(routes, data) {
  data.forEach(item => {
    const menu = {
      path: item.url,
      component: item.url === null || item.url === '' ? Layout : resolve => require([`@/views${item.url}`], resolve),
      name: item.name,
      // redirect: item.redirect,
      hidden: false,
      children: [],
      meta: { title: item.name, icon: item.icon }
      // meta: { title: item.name, icon: item.meta.icon, roles: item.meta.roles }
    }
    if (item.children) {
      generateAuthMenu(menu.children, item.children)
    }
    console.log(menu)

    routes.push(menu)
  })
}

/**
 * 递归地验证菜单权限
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }) {
    return new Promise(resolve => {
      const authMenuData = []
      getAuthMenu(state.token).then(response => {
        // let data = response
        if (response.code === 20000) {
          const data = response.data
          Object.assign(authMenuData, data)
          console.log(data)
          asyncRoutes.length = 0;
          generateAuthMenu(asyncRoutes, authMenuData)
          console.log(asyncRoutes)
          // asyncRoutesAll.forEach(item => {
          //   asyncRoutes.push(item)
          // })
          errorRoutes.forEach(item => {
            asyncRoutes.push(item)
          })
          let accessedRoutes
          accessedRoutes = asyncRoutes || []
          console.log('accessedRoutes:', accessedRoutes)
          commit('SET_ROUTES', accessedRoutes)
          resolve(accessedRoutes)
        } else {
          ElMessage.error('获取菜单失败')
        }
      }).catch(error => {
        console.log(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
