import { Model } from '@redux-model/react'
import { getHero, postHero } from '../../api'
import { Pagination, Hero } from '../../type'
import message from '../../components/common/message/Message'

interface Data {
  data: {
    list: Hero[]
    pagination: Pagination
  }
  fetch: boolean
  posting: boolean
}

class HeroModel extends Model<Data> {
  protected initialState(): Data {
    return {
      data: {
        list: [],
        pagination: {}
      },

      fetch: false,
      posting: false
    }
  }

  // 获取列表
  FETCH_HERO = this.action((state) => {
    state.fetch = true
  })
  // 成功
  SET_HERO_SUCCESS = this.action((state, data) => {
    state.data = data
    state.fetch = false
  })
  // 失败
  SET_HERO_FILE = this.action((state) => {
    state.data = {
      list: [],
      pagination: {}
    }
    state.fetch = false
  })
  // 发布留言板
  POST_ITEM = this.action((state) => {
    state.posting = true
  })
  POST_ITEM_FINAL = this.action((state) => {
    state.posting = false
  })

  getHero = this.compose(async (data = {
    current_page: 1
  })=>{
      this.FETCH_HERO()
      const res = await getHero(data)
      if (res && res.code === 1) {
        let list
        if (res.result.pagination.current_page === 1) list = res.result.list
        else list = [...this.data.data.list, ...res.result.list]
        this.SET_HERO_SUCCESS({
            list,
            pagination: res.result.pagination
        })
      }else{
          this.SET_HERO_FILE()
      }
      return res.result
  })

  // 提交留言
  postHero = this.compose(async data=>{
      this.POST_ITEM()
      const res = await postHero(data).catch(err=> console.error(err))
      if (res && res.code === 1) message({type:'success',message:'留言成功，请等待管理员审核！'})
    else message({type:'error',message:'留言失败，请联系站长'})
      this.POST_ITEM_FINAL()
      return res
  })
}

export default new HeroModel() 