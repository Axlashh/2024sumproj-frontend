import request from '@/utils/request'


export function getDictList(data) {
    return request({
        url: '/dictionary/list',
        method: "post",
        data
    })
}

export function addDict(data) {
    return request({
        url:'dictionary/addDict',
        method: 'post',
        data
    })
}

export function deleteDict(data) {
    return request({
        url:'dictionary/deleteDict',
        method: 'post',
        data
    })
}