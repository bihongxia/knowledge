import request from '@/utils/request'

export function list(data) {
  return request({
    url: '/article/keywords/list',
    method: 'post',
    data
  })
}

export function stat(data) {
  return request({
    url: '/article/keywords/stat',
    method: 'post',
    data
  })
}
