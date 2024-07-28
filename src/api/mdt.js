import request from '@/utils/request'

export function appointmentApply(data) {
    return request({
        url:'/mdtRecord/appointmentApply',
        method: 'post',
        data
    })
}

export function getMdtRecordList(data) {
    return request({
        url:'/mdtRecord/list',
        method: 'post',
        data
    })
}

export function getMdtGroupList() {
    return request({
        url:'/mdtGroup/list',
        method: 'get'
    })
}

export function getFileList(data) {
    return request({
        url:'/mdtFile/list',
        method: 'post',
        data
    })
}

export function commitFile(data) {
    return request({
        url:'/mdtFile/commitFile',
        method: 'post',
        data
    })
}

export function getPatientFile(data) {
    return request({
        url:'mdtFile/getPatientFile',
        method: 'post',
        data
    })
}

export function synOneFile(data) {
    return request({
        url:'mdtFile/synFile',
        method:'post',
        data
    })
}

export function getMdtMeetingList(data) {
    return request({
        url:'mdtMeeting/getMdtMeetingList',
        method:'post',
        data
    })
}

export function meetingTimeCommit(data) {
    return request({
        url:'mdtMeeting/meetingTimeCommit',
        method:'post',
        params: data
    })
}
