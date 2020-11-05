import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function wxLogin(data) {
  return request({
    url: '/auth/wxlogin',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}
export function getUserlist(data) {
  return request({
    url: '/admin/user/list',
    method: 'post',
    data
  })
}
export function edit(data) {
  return request({
    url: '/admin/user/edit',
    method: 'post',
    data
  })
}
export function store(data) {
  return request({
    url: '/admin/user/store',
    method: 'post',
    data
  })
}
export function del(data) {
  return request({
    url: '/admin/user/delete',
    method: 'post',
    data
  })
}
// 从后台获取菜单
export function getMenus(data) {
  return request({
    url: '/admin/user/getMenus',
    method: 'post',
    data
  })
}

// 从后台获取菜单
export function qqAuth(data) {
  return request({
    url: '/admin/user/qqAuth',
    method: 'post',
    data
  })
}
