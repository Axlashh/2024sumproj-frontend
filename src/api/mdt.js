import request from '@/utils/request'

export function appointmentApply(data) {
    return request({
        url:'/mdt/appointmentApply',
        method: 'post',
        data
    })
}

export function getMdtRecordList(data) {
    return request({
        url:'/mdt/getMdtRecordList',
        method: 'post',
        data
    })
}

export function getMdtGroupList() {
    return request({
        url:'/mdt/getMdtGroupList',
        method: 'get'
    })
}