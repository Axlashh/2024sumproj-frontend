import request from '@/utils/request'


export function getMenuList(data) {
    return request({
        url: '/menu/list',
        method: "post",
        data
    })
}

export function addMenu(data) {
    return request({
        url:'menu/addMenu',
        method: 'post',
        data
    })
}

export function deleteMenu(data) {
    return request({
        url:'menu/deleteMenu',
        method: 'post',
        data
    })
}

export function updateMenu(data) {
    return request({
        url:'menu/updateMenu',
        method: 'post',
        data
    })
}