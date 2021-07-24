import { Model } from '@redux-model/react'
import { getArt, getArts, likeArt } from '../../api'
import { Pagination, Article, State } from '../../type'

interface Data {
  hotArt: {
    pagination: Pagination
    list: Article[]
  }
  art: {
    pagination: Pagination
    list: Article[]
  }
  relativeList: Article[]
  details: Article
  fetch: boolean
}

interface IParams {
  tag?: string
  page_size?: number
  current_page?: number
  keyword?: string
  state?: State
  publish?: State
  type?: State
}

class ArticleModel extends Model<Data> {
  protected initialState(): Data {
    return {
      // 热门文章
      hotArt: {
        pagination: {
          page_size: 0,
          total: 0,
          current_page: 0,
          total_page: 0
        },
        list: []
      },

      // 列表文章
      art: {
        pagination: {
          page_size: 0,
          total: 0,
          current_page: 0,
          total_page: 0
        },
        list: []
      },

      // 相关文章推荐
      relativeList: [],

      fetch: false,

      // 文章详情
      details: {
        title: '',
        keyword: '',
        thumb: '',
        state: 0,
        publish: 0,
        type: 0,
        descript: '',
        tag: []
      }
    }
  }

  // mutations
  FETCH_ART = this.action((state) => {
    state.fetch = true
    state.art = {
      pagination: {},
      list: []
    }
  })

  SET_ART_FILE = this.action((state) => {
    state.fetch = false
  })

  SET_HOT_ART = this.action(
    (
      state,
      data: {
        pagination: Pagination
        list: Article[]
      }
    ) => {
      state.hotArt = data
    }
  )

  SET_ART_SUCCESS = this.action(
    (
      state,
      data: {
        pagination: Pagination
        list: Article[]
      }
    ) => {
      state.art = data
      state.fetch = false
    }
  )

  SET_ART_FAIL = this.action((state) => {
    state.art = {
      pagination: {},
      list: []
    }
    state.fetch = false
  })

  SET_DETAILS = this.action((state, data: Article) => {
    state.details = data
  })

  ADD_COMMENT = this.action((state) => {
    state.details.meta.comments += 1
  })

  SET_RELATIVE_ART_LIST = this.action((state, list: Article[]) => {
    state.relativeList = list.filter((item) => item.id !== state.details.id)
  })

  // 获取文章
  getArtList = this.compose(
    async (
      data: IParams = {
        current_page: 1,
        tag: '',
        page_size: 0
      }
    ) => {
      this.FETCH_ART()
      const res = await getArts({
        ...data,
        page_size: data.page_size || 6
      })
      if (res && res.code === 1) {
        if (!process.browser) {
          this.SET_ART_SUCCESS(res.result)
        } else {
          setTimeout(() => {
            this.SET_ART_SUCCESS(res.result)
          })
        }
      } else {
        this.SET_ART_FILE()
      }
    }
  )

  // 获取热门文章
  getHotArt = this.compose(async () => {
    const res = await getArts({
      hot: true
    })
    this.SET_HOT_ART(
      res.result || {
        pagination: {},
        list: []
      }
    )
  })

  // 文章详情
  getArt = this.compose(async (id: string) => {
    const res = await getArt(id)
    this.SET_DETAILS(res.result || {})
  })

  // 根据条件获取文章
  getRelativeList = this.compose(async () => {
    const list = await getArts({
      tag: this.data.details.tag[0]._id || 0,
      current_page: 1,
      page_size: 4
    })
    this.SET_RELATIVE_ART_LIST(list.result.list || [])
  })

  // 喜欢文章
  likeArt = this.compose(async (data: Article) => {
    const res = likeArt({
      _id: data._id,
      type: 0
    })
    return res
  })
}

export default new ArticleModel()
