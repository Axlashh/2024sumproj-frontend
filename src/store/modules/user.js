import {login} from "@/api/user";
import {getToken, setToken, removeToken} from "@/utils/auth";

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
            }).then(response => {
                const { data } = response
                commit('SET_TOKEN', data)
                setToken(data)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
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