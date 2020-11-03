const Mock = require('mockjs')

const data = Mock.mock({
  'items|10': [{
    id: '@id',
    title: '@sentence(10, 20)',
    'status|1': ['禁用', '启用'],
    name: '@name',
    displayName: '@cname'
  }]
})

module.exports = [
  {
    url: '/admin/role/list',
    type: 'post',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length*10,
          data: items
        }
      }
    }
  }
]
