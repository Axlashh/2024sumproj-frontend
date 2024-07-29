import {login} from "@/api/user";
import {getToken, setToken, removeToken} from "@/utils/auth";
import router, {resetRouter} from "@/router";
import store from "@/store";

const state = {
    token: getToken(),
    roles: []
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    }
}

const actions = {
    login({ commit }, userInfo) {
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            login({
                userName: username.trim(),
                password: password
            }).then(async response => {
                const {data} = response
                commit('SET_TOKEN', data)
                setToken(data)
                resolve(response)
                const accessRoutes = await store.dispatch('permission/generateRoutes')
                router.addRoutes(accessRoutes)
            }).catch(error => {
                reject(error)
            })
        })
    },
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
        })
    },
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resetRouter()

            resolve()
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}