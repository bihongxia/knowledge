import request from '@/utils/request'

export function list(data) {
  return request({
    url: '/department/list',
    method: 'post',
    data
  })
}
