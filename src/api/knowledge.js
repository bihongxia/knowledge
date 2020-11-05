import request from '@/utils/request'

export function getList(params = {}) {
  return request({
    url: '/article/dir',
    method: 'get',
    params: {
      cate_id: params.cate_id,
      aid: params.fid
    }
  })
}

export function getCateList() {
  return request({
    url: '/cate/list',
    method: 'get'
  })
}

export function getHotTitles(params = {}) {
  return request({
    url: '/dir/search',
    method: 'get',
    params: {
      keywords: params.keywords,
      type: params.type
    }
  })
}

//创建文件夹
export function postFile(params = {}) {
  console.log(params)
  return request({
    url: '/article/create',
    method: 'post',
    params
  })
}

//创建文章
export function postArticle(params) {
  return request({
    url: '/article/create',
    method: 'post',
    params
  })
}

export function getCateAndDepat(params = {}) {
  return request({
    url: '/dir/search',
    method: 'get',
  })
}


export function getInfo(searchObj = {}, page = 1, pageSize = 10, id) {
  return request({
    url: baseUrl,
    method: 'get',
    params: {
        page: page,
        pageSize: pageSize,
        order_number: searchObj.order_number,
        merchant_number: searchObj.merchant_number,
        merchant_name: searchObj.merchant_name,
        status: searchObj.status,
    }
  })
}

export function getInfoById (id) {
  return request({
    url: baseUrl + '/' + id,
    method: 'get',
  })
}

export function updateInfo (id, data) {

    if (typeof data.order_time === 'string') {
      data.order_time = Math.ceil(Date.parse(data.order_time)/1000)
    } else {
      data.order_time =Math.ceil(((data.order_time).getTime())/1000)
    }
    return request({
      url: baseUrl +'/' + id,
      method: 'PATCH',
      data,
    })
}

export function deleteInfoById (id) {
  return request({
    url: baseUrl +'/' + id,
    method: 'delete',
  })
}

export function addInfo (data) {
  data.order_time =Math.ceil(((data.order_time).getTime())/1000)
  return request({
    url: baseUrl,
    method: 'post',
    data,
  })
}

export function deleteAll( params) {
  return request({
     url: baseUrl + '/deleteAll',
     method: 'post',
     data: {
       ids: params
     }
  })
}


// 获取订单对应的产品信息

export function getProductsById (id) {
  return request({
    url: baseUrl + '/' + id + '/products',
    method: 'get',
  })
}

export function getEnableProductsById (id) {
  return request({
    url: baseUrl + '/' + id + '/enable',
    method: 'get',
  })
}

export function getSummaryById (id) {
  return request({
    url: baseUrl + '/' + id + '/summary',
    method: 'get',
  })
}
