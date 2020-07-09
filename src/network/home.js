//首页的所有网络请求

import {request} from './request'

//请求首页的轮播图函数
export function getHomeMultiData() {  //这个函数返回的是request封装的网络请求函数，是一个Promise，所以在调用方可以使用then、catch。
  return request({
    url: '/home/multidata',
    type: 'GET'
  })
}

//
