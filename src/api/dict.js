import request from '@/utils/request'


export function getDictList() {
    return request({
        url: '/dictionary/list',
        method: "get"
    })
}