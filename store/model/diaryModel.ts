import { Model } from '@redux-model/react'
import { getDiary, likeDiary } from '../../api'
import { Pagination, Diary } from '../../type'

interface Data {
  diaries: {
    pagination: Pagination
    list: Diary[]
  }
  fetch: boolean
}

class DiaryModel extends Model<Data> {
  protected initialState(): Data {
    return {
      // 日记列表
      diaries: {
        pagination: {
          page_size: 0,
          total: 0,
          current_page: 0,
          total_page: 0
        },
        list: []
      },
      fetch: false
    }
  }
  // mutations
  FETCH_DIARY = this.action((state) => {
    state.fetch = true
    state.diaries = {
      pagination: {},
      list: []
    }
  })

  SET_DIARY_FILE = this.action((state) => {
    state.fetch = false
  })

  SET_DIARY_SUCCESS = this.action(
    (
      state,
      data: {
        pagination: Pagination
        list: Diary[]
      }
    ) => {
      state.diaries = data
      state.fetch = false
    }
  )

  SET_DIARY_FAIL = this.action((state) => {
    state.diaries = {
      pagination: {},
      list: []
    }
    state.fetch = false
  })

  // 获取日记
  getDiaries = this.compose(async (data:{
    current_page: number,
    page_size: number
  })=>{
      this.FETCH_DIARY()
      const res = await getDiary({
          ...data,
          page_size: data.page_size || 6
      })
      if (res && res.code === 1) {
          this.SET_DIARY_SUCCESS(res.result)
      }else{
          this.SET_DIARY_FILE()
      }
      return res.result
  })

  // 点赞日记
  likeDiary = this.compose(async (data:Diary)=>{
      const res = likeDiary({
          ...data,
          type:1
      })
      return res
  })
}
export default new DiaryModel()
