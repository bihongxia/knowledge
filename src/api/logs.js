import request from '@/utils/request'

export function getLogsList(data) {
  return request({
    url: '/actionlog/list',
    method: 'post',
    data
  })
}
