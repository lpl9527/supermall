//首页的所有网络请求

import {request, request2} from './request'

//请求首页的轮播图函数
export function getHomeMultiData() {  //这个函数返回的是request封装的网络请求函数，是一个Promise，所以在调用方可以使用then、catch。
  return request({
    url: '/home/multidata',
    type: 'GET'
  })
}

//获取首页的商品数据
export function getHomeGoods(type, page) {  //type为商品分类，page为页码
  return request2({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
