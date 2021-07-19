import { Model } from '@redux-model/react'
import { getSegmentfaultArt,getJuejinArt } from '../../api'
import Message from '../../components/common/message/Message'

interface IList {
  comments: number
  cover: null | string
  created: number
  id: number
  is_liked: boolean
  is_show_cover: boolean
  title: string
  url: string
  user?: {
    avatar_url: string
    id: number
    name: string
    url: string
    user_auth: null | string
  }
}

interface IJuejin{
  article_id:string,
  article_info:{
    article_id:string
    cover_image:string
    title:string
    brief_content:string
    view_count:number
    collect_count:number
    digg_count:number
    comment_count:number
    ctime:string
    mtime:string
    rtime:string
  }
  author_user_info:{
    user_id:string
    user_name:string
    company:string
    job_title:string
    avatar_large:string
    description:string
  }
  category:{
    category_id:string
    category_name:string
  }
  tags:{
    id:number
    tag_id:string
    tag_name:string
  }[]
}

interface Data {
  segmentfaultInfo: { list: Array<IList>; offset: number; hasMore: boolean }
  juejinInfo:{list:Array<IJuejin>;cursor:string;hasMore:boolean}
}

class RecommendModel extends Model<Data> {
  protected initialState(): Data {
    return {
      segmentfaultInfo: {
        list: [],
        offset: 0,
        hasMore: true
      },
      juejinInfo:{
        list:[],
        cursor:'0',
        hasMore:true
      }
    }
  }
  SET_OFFSET_SUCCESS = this.action((state, offset: number) => {
    state.segmentfaultInfo.offset = offset
  })
  SET_LIST_SUCCESS = this.action((state, list: Array<IList>) => {
    state.segmentfaultInfo.list = [...state.segmentfaultInfo.list, ...list]
  })
  SET_FETCH = this.action((state, fetch: boolean) => {
    state.segmentfaultInfo.hasMore = fetch
  })
  SET_CURSOR_SUCCESS = this.action((state,cursor:string)=>{
    state.juejinInfo.cursor = cursor
  })
  SET_JUEJIN_LIST_SUCCESS = this.action((state,list:Array<IJuejin>)=>{
    state.juejinInfo.list = [...state.juejinInfo.list,...list]
  })
  SET_JUEJIN_FETCH = this.action((state,fetch:boolean)=>{
    state.juejinInfo.hasMore = fetch
  })


  getArt = this.compose(async (offset: number) => {
    const res = await getSegmentfaultArt({ offset })
    if (res && res.code === 1) {
      if (res.result.rows && res.result.rows.length) {
        this.SET_FETCH(true)
        this.SET_LIST_SUCCESS(res.result.rows)
        this.SET_OFFSET_SUCCESS(res.result.offset)
      } else {
        this.SET_FETCH(false)
      }
    } else {
      Message({ type: 'error', message: res.message })
    }
  })

  getJuejinArt = this.compose(async (cursor:string)=>{
    const res = await getJuejinArt({cursor})
    if (res && res.code === 1) {
        this.SET_JUEJIN_FETCH(res.result.has_more)
        this.SET_JUEJIN_LIST_SUCCESS(res.result.data)
        this.SET_CURSOR_SUCCESS(res.result.cursor)
    }else{
      Message({ type: 'error', message: res.message })
    }
  })
}

export default new RecommendModel()
