/*
 *
 * 评论数据状态
 *
 */
import { Model } from '@redux-model/react'
import { getComment, postComment, likeComment, postHero } from '../../api'
import { AjaxResponse, Comment, Pagination } from '../../type'
import { articleModel } from './index'

interface Data {
  fetching: boolean
  posting: boolean
  data: {
    data: Comment[]
    pagination: Pagination
  }
}

class CommentModel extends Model<Data> {
  protected initialState(): Data {
    return {
      fetching: false,
      posting: false,
      data: {
        data: [],
        pagination: {}
      }
    }
  }
  // mutations

  // 获取评论
  REQUEST_LIST = this.action((state) => {
    state.fetching = true
  })

  // 清空评论
  CLEAR_LIST = this.action((state) => {
    state.data = {
      data: [],
      pagination: {}
    }
  })

  GET_LIST_SUCCESS = this.action(
    (
      state,
      action: {
        data: Comment[]
        pagination: Pagination
      }
    ) => {
      state.fetching = false
      state.data = action
    }
  )

  GET_LIST_FAILURE = this.action((state) => {
    state.fetching = false
    state.data = {
      data: [],
      pagination: {}
    }
  })

  POST_ITEM = this.action((state) => {
    state.posting = true
  })

  POST_ITEM_SUCCESS = this.action((state, action) => {
    state.posting = false
    state.data.pagination.total += 1
    state.data.data.unshift(action.result)
  })

  POST_ITEM_FAILURE = this.action((state) => {
    state.posting = false
  })

  // 喜欢某条评论
  LIKE_ITEM = this.action((state, action: Comment) => {
    const comment = state.data.data.find((comment) =>
      Object.is(comment._id, action._id)
    )
    if (comment) comment.likes++
  })

  //   // 提交留言墙
  //   postHero = this.compose(async (data:)=>{
  //       this.POST_ITEM()
  //       const res = await postHero(data);
  //       return res
  //   })

  // 发布评论
  postComment = this.compose(async (comment: Comment) => {
    this.POST_ITEM()
    const res = await postComment(comment)
    if (res && res.code === 1) {
      this.POST_ITEM_SUCCESS(res)
      if (Number(comment.post_id) !== 0) articleModel.ADD_COMMENT()
    } else {
      this.POST_ITEM_FAILURE()
    }
    return res
  })

  // 为某条回复点赞
  likeComment = this.compose(async (data) => {
    const res = await likeComment(data)
    if (res && res.code === 1) this.LIKE_ITEM(data)
    return
  })

  // 根据post-id获取评论列表
  loadCommentsByPostId = this.compose(async (data)=>{
    data.sort = data.sort || -1;
    data.current_page = data.current_page || 1;
    data.page_size = data.page_size || 100;
    
    this.REQUEST_LIST()
    setTimeout(async () => {
        const res = await getComment(data);
        if (res && res.code === 1) {
          let list : Comment[];
          if (res.result.pagination.current_page === 1) list = res.result.data;
          else list = [...this.data.data.data, ...res.result.data];
          this.GET_LIST_SUCCESS({data: list,
            pagination: res.result.pagination})
        } else this.GET_LIST_FAILURE()
        return res;
      }, 500);
  })
}

export default new CommentModel()