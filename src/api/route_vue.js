import request from '@/utils/request'

export function store(data) {
  return request({
    url: '/admin/route/vue/store',
    method: 'post',
    data
  })
}
export function getRoutelist(data) {
  return request({
    url: '/admin/route/vue/list',
    method: 'post',
    data
  })
}
export function edit(data) {
  return request({
    url: '/admin/route/vue/edit',
    method: 'post',
    data
  })
}
export function del(data) {
  return request({
    url: '/admin/route/vue/delete',
    method: 'post',
    data
  })
}
// 权限分配列表
export function privileges(data) {
  return request({
    url: '/admin/route/vue/getTree',
    method: 'post',
    data
  })
}
