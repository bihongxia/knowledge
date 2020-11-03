const Mock = require('mockjs')

const data = Mock.mock({
  'items|10': [{
    id: '@increment',
    title: '@sentence(10, 20)',
    'status|1': ['禁用', '启用'],
    name: '@name',
    displayName: '@cname'
  }]
})
const treeList = Mock.mock({
  'items|20': [{
    id: '@increment',
    pid: '@integer(0, 20)',
    title: '@ctitle(2,6)'
  }]
})
// const tree = `{"code":10000,"msg":"\u6210\u529f","data":{"list":[{"id":1,"pid":0,"title":"\u7535\u5b50\u6807\u724c","children":[{"id":2,"pid":1,"title":"\u6807\u724c\u5206\u7c7b","children":[{"id":3,"pid":2,"title":"\u9996\u94a2\u957f\u94a2"},{"id":9,"pid":2,"title":"\u6750\u8d28\u4e66"}]},{"id":11,"pid":1,"title":"\u6807\u7b7e\u5217\u8868","children":[{"id":12,"pid":11,"title":"\u9996\u94a2\u957f\u94a2\u5217\u8868"}]}]},{"id":10,"pid":0,"title":"\u7cfb\u7edf\u8bbe\u7f6e","children":[{"id":5,"pid":10,"title":"\u7528\u6237\u7ba1\u7406"},{"id":6,"pid":10,"title":"\u89d2\u8272\u7ba1\u7406"},{"id":7,"pid":10,"title":"\u8def\u7531\u7ba1\u7406"},{"id":8,"pid":10,"title":"\u7cfb\u7edf\u53c2\u6570"}]}],"checked":[3,9,5,6,7,8,3,5,6,7,8,9,12,12]},"timestamp":1604382704}`

module.exports = [
  {
    url: '/admin/role/list',
    type: 'post',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length * 10,
          data: items
        }
      }
    }
  },
  {
    url: '/admin/route/vue/getTree',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: { list: treeList.items }
      }
    }
  },
  {
    url: '/admin/role/getRoleOption',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: data.items
      }
    }
  }
]
