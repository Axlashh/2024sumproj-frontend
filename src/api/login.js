import request from '@/utils/request'

export function sendCaptcha(query) {
  return request({
    url: '/smsLog/getSmsCode',
    method: 'get',
    params: query
  })
}

export function resetPassword(data) {
  return request({
    url: '/user/resetPassword',
    method: 'post',
    data
  })
}
