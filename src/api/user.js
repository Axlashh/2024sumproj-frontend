import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/user/login',
        method: 'post',
        data
    })
}

export function getInfo() {
    return request({
        url: '/user/info',
        method: 'get'
    })
}

export function getAuthMenu(token) {
    return request({
        url: '/user/authmenu',
        method: 'get'
    })
}

export function qwe() {
    return request({
        url: '/33',
        method: 'get'
    })
}