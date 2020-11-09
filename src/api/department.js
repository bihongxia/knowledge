import request from '@/utils/request'

export function list(data) {
  return request({
    url: '/department/list',
    method: 'post',
    data
  })
}
export function getUsers(data) {
  return request({
    url: '/department/getUser',
    method: 'post',
    data
  })
}
