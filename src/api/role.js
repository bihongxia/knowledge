import request from '@/utils/request'

export function store(data) {
  return request({
    url: '/role/store',
    method: 'post',
    data
  })
}
export function getRolelist(data) {
  return request({
    url: '/role/list',
    method: 'post',
    data
  })
}
export function edit(data) {
  return request({
    url: '/admin/role/edit',
    method: 'post',
    data
  })
}
export function del(data) {
  return request({
    url: '/admin/role/delete',
    method: 'post',
    data
  })
}
// 获取select option
export function getRoleOption(data) {
  return request({
    url: '/admin/role/getRoleOption',
    method: 'post',
    data
  })
}

// 分配前端路由
export function privilegesVue(data) {
  return request({
    url: '/admin/role/privileges/vue',
    method: 'post',
    data
  })
}

// 分配后端路由
export function privilegesApi(data) {
  return request({
    url: '/admin/role/privileges/api',
    method: 'post',
    data
  })
}
