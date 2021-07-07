import { Model } from '@redux-model/react'
import { getLink,postLink } from '../../api'
import { Pagination, Link } from '../../type'
import message from '../../components/common/message/Message'

interface Data {
  data: {
    list: Link[]
    pagination: Pagination
  }
  fetch: boolean
  posting: boolean
}

class LinkModel extends Model<Data> {
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

  SET_LINK_SUCCESS = this.action(
    (
      state,
      data: {
        list: Link[]
        pagination: Pagination
      }
    ) => {
      state.data = data
      state.fetch = false
    }
  )

  SET_LINK_FILE = this.action(
    (
      state
    ) => {
      state.data = {
        list: [],
        pagination: {}
      }
      state.fetch = false
    }
  )

  POST_BOOK = this.action(
    (state)=>{
      state.posting = true;
    }
  )

  POST_BOOK_FINAL = this.action(
    (state)=>{
      state.posting = false;
    }
  )


  getLink = this.compose(
    async (
      data: Pagination = {
        current_page: 1,
        page_size: 30
      }
    ) => {
        const res = await getLink(data)
        if(res && res.code === 1){
            this.SET_LINK_SUCCESS({
                list: res.result.list as Link[],
                pagination:res.result.pagination as Pagination
            })
        }else{
            this.SET_LINK_FILE()
        }
        return res
    }
  )

  postLink = this.compose(async (link:Link)=>{
    this.POST_BOOK()
    const res = await postLink(link)
    if (res && res.code === 1) message({type:'success',message:'友链申请成功，请等待管理员审核！'})
    else message({type:'error',message:res.message})
    this.POST_BOOK_FINAL()
    return res
  })
}

export default new LinkModel()
