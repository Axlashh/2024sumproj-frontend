import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/login',
        method: 'post',
        data
    })
}

export function qwe() {
    return request({
        url: '/33',
        method: 'get'
    })
}