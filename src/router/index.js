import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/qyweixin'),
    hidden: true
  },
  {
    path: '/auth/getlogin',
    component: () => import('@/views/login/callback'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/knowledge',
    meta: { title: '知识库', icon: 'el-icon-s-data' },
    children: [
      {
        path: 'knowledge',
        name: 'Knowledge',
        component: () => import('@/views/knowledge/index'),
        meta: { title: '知识库列表', icon: 'dashboard' },
        hidden: true
      },
      {
        path: 'knowledge/create',
        name: 'createDocument',
        component: () => import('@/views/knowledge/create'),
        meta: { title: '知识库新增', icon: 'dashboard' },
        hidden: true
      },
      {
        path: 'knowledge/article/:id(\\d+)',
        name: 'article',
        component: () => import('@/views/knowledge/article'),
        meta: { title: '文章展示', icon: 'dashboard' },
        hidden: true
      }
    ]
  },

  {
    path: '/hotword',
    component: Layout,
    redirect: '/index',
    children: [{
      path: 'index',
      name: 'Hotword',
      component: () => import('@/views/hotword/index'),
      meta: { title: '热词统计', icon: 'el-icon-s-data' }
    }]
  },

  {
    path: '/logs',
    component: Layout,
    redirect: '/index',
    children: [{
      path: 'index',
      name: 'Logs',
      component: () => import('@/views/logs/index'),
      meta: { title: '操作日志', icon: 'el-icon-document-copy' }
    }]
  },

  {
    path: '/setting',
    component: Layout,
    redirect: '/setting/department',
    name: 'Setting',
    meta: { title: '系统设置', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'department',
        name: 'Department',
        component: () => import('@/views/setting/department'),
        meta: { title: '部门管理', icon: 'el-icon-document-copy' }
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/setting/user'),
        meta: { title: '用户管理', icon: 'el-icon-s-custom' }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/setting/role'),
        meta: { title: '角色管理', icon: 'tree' }
      },
      {
        path: 'face',
        name: 'Face',
        component: () => import('@/views/setting/face'),
        meta: { title: '添加人脸', icon: 'el-icon-document-copy' }
      },
      // {
      //   path: 'power',
      //   name: 'Power',
      //   component: () => import('@/views/setting/power'),
      //   meta: { title: '权限管理', icon: 'tree' }
      // }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
