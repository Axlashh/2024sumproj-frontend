import request from '@/utils/request'

export function getRoleList(data) {
    return request({
        url:'/role/list',
        method:'post',
        data
    })
}

export function getCheckedMenuIds(data) {
    return request({
        url:'/role/getCheckedMenuIds',
        method:'post',
        data
    })
}