import { AxiosPromise } from 'axios'
import { AjaxResponse, State } from '../type'
import request from '../untils/request'

// 获取博主信息
export function getInfo() {
  return request({
    url: '/auth',
    method: 'get'
  })
}

// 获取网站配置项
export function getOpt() {
  return request({
    url: '/option',
    method: 'get'
  })
}

// 留言墙列表
export function getHero(params: any) {
  return request({
    url: '/hero',
    method: 'get',
    params
  })
}

// 增加英雄榜
export function postHero(data: any) {
  return request({
    url: '/hero',
    method: 'post',
    data
  })
}

// 标签列表
export function getTag(params: any) {
  return request<AjaxResponse>({
    url: '/tag',
    method: 'get',
    params
  })
}

// 获取文章列表
export function getArts(params: {
  page_size?: number
  tag?: string
  current_page?: number
  keyword?: string
  state?: State
  publish?: State
  type?: State
  hot?: boolean
}) {
  return request<AjaxResponse>({
    url: '/article',
    method: 'get',
    params
  })
}

// 文章归档
export function getallArts() {
  return request<AjaxResponse>({
    url: '/allArticle',
    method: 'get'
  })
}

// 获取单个文章
export function getArt( id: string ) {
  return request<AjaxResponse>({
    url: `/article/${id}`,
    method: 'get'
  })
}

// 文章点赞
export function likeArt(data) {
  return request({
    url: '/like',
    method: 'post',
    data
  })
}
// 获取日记
export function getDiary(params: any) {
  return request({
    url: '/diary',
    method: 'get',
    params
  })
}
// 日记点赞
export function likeDiary(data: any) {
  return request({
    url: '/like',
    method: 'post',
    data
  })
}
// 获取评价
export function getComment(params: any) {
  return request({
    url: '/comment',
    method: 'get',
    params
  })
}

// 提交评价
export function postComment(data: any) {
  return request({
    url: '/comment',
    method: 'post',
    data
  })
}

// 评论点赞
export function likeComment(data: any) {
  return request({
    url: '/like',
    method: 'post',
    data
  })
}

// 获取友链
export function getLink(params: any) {
  return request({
    url: '/link',
    method: 'get',
    params
  })
}
