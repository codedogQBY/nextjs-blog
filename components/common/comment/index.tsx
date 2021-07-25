import React, {
  FC,
  useEffect,
  useState,
  useRef,
  Fragment,
  useMemo,
  useCallback
} from 'react'
import style from './index.module.scss'
import { commentModel } from '../../../store/model'
import { useViewport } from '../../../hooks/viewportContext'
import markdown from '../../../untils/marked'
import CommentInput from './components/comment-input'
import useClickOutsize from '../../../hooks/useClickOutside'
import { Comment as CommentType } from '../../../type'
import { ThumbsUp, CommentOne } from '@icon-park/react'
import { dateStr } from '../../../untils' 

const Comment: FC<{ post_id: number }> = ({ post_id }) => {
  const [likeComments, setLikeComments] = useState<string[]>([])
  const [replyId, setReplyId] = useState<number>(-1)
  const comments = commentModel.useData((data) => data.data.data)

  // 寻找祖先评论
  const findPId = useCallback(
    (comments: CommentType[], comment: CommentType): number => {
      const item = comments.find((item) => item.id === comment.pid)
      if (item) {
        if (item.pid !== 0) {
          return findPId(comments, item)
        } else {
          return item.id as number
        }
      } else {
        return 0
      }
    },
    [comments]
  )

  // 没有父级评论
  const notPidComments = useMemo(
    () => comments.filter((item) => item.pid === 0),
    [comments]
  )
  // 有父级评论
  const pidComments = useMemo(
    () => comments.filter((item) => item.pid !== 0),
    [comments]
  )
  const frontComments = useMemo(() => {
    return notPidComments.reduce((pre, cur) => {
      const item = pidComments.filter((item) => {
        return findPId(comments, item) === cur.id
      })

      let temp: { [x: string]: any[] } = JSON.parse(
        JSON.stringify({ ...cur, ...{ children: [] } })
      )
      if (item.length !== 0) {
        const i = item.map((i) => {
          const temp = JSON.parse(
            JSON.stringify({ ...i, ...{ replayName: '' } })
          )
          const p = comments.find((item) => temp.pid === item.id)
          if (p.pid !== 0) {
            temp['replayName'] = p.author.name
          }
          return temp
        })
        temp.children = i
      }
      pre.push(temp)
      return pre
    }, [])
  }, [comments, notPidComments, pidComments])
  useEffect(() => {
    (post_id || post_id === 0) && commentModel.loadCommentsByPostId({ post_id })
  }, [post_id])
  useEffect(() => {
    initComment()
  }, [])
  const commentInput = useRef<HTMLDivElement>(null)
  const articleContent = (item: string) => {
    if (typeof markdown(item, false, true) === 'string') {
      return ''
    } else {
      return (
        markdown(item, false, true) as {
          html: string
          toc: any[]
        }
      ).html
    }
  }

  // 初始化评论
  const initComment = () => {
    if (process.browser) {
      const comments = localStorage.getItem('LIKE_COMMENTS')
      if (comments) setLikeComments(JSON.parse(comments))
    }
  }
  // 获取某条评论是否被点赞
  const commentLiked = (comment_id: string) => {
    return likeComments.includes(comment_id)
  }
  // 点赞某条评论
  const likeComment = (comment: { _id?: string }) => {
    if (commentLiked(comment._id)) return false
    commentModel
      .likeComment({ type: 2, _id: comment._id })
      .then((data) => {
        const likes = [...likeComments]
        likes.push(comment._id)
        setLikeComments(likes)
        localStorage.setItem('LIKE_COMMENTS', JSON.stringify(likes))
      })
      .catch((err) => {
        console.warn('评论点赞失败', err)
      })
  }

  // 回复评论
  const handleReply = (id: number) => {
    setReplyId(id)
  }

  const resetId = () => {
    setReplyId(-1)
  }

  // 点击外部消失回复框
  useClickOutsize(commentInput, () => {
    if (replyId !== -1) {
      resetId()
    }
  })

  return (
    <>
      <ul className={style['comment-list']}>
        {frontComments.map((item) => {
          return (
            <Fragment key={item._id}>
              <li className={style['comment-list-item']}>
                <a href={item.author.site} className={style['user-img']}>
                  <img
                    src={`https://bing.ioliu.cn/v1/rand?key=${item.author.name}&w=40&h=40`}
                  />
                </a>
                <div className={style['comment-info']}>
                  <div className={style['user-info']}>{item.author.name}</div>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: articleContent(item.content)
                    }}
                    className={style['comment-content']}
                  ></p>
                  <div className={style['options-info']}>
                    <div className={style['time']}>
                      {dateStr(new Date(item.create_at).getTime())}
                    </div>
                    <div
                      onClick={() => {
                        likeComment(item)
                      }}
                      style={commentLiked(item._id) ? { color: '#F25F5C' } : {}}
                      className={style['like']}
                    >
                      <ThumbsUp className={style['icon']} size='18' />
                      {!!item.likes && item.likes}
                    </div>
                    <div
                      onClick={() => {
                        handleReply(item.id)
                      }}
                      className={style['replay']}
                    >
                      <CommentOne size='18' className={style['icon']} />{'  '}回复
                    </div>
                  </div>
                </div>
                {replyId === item.id && (
                  <div ref={commentInput} className={style['comment-input']}>
                    <CommentInput
                      post_id={post_id}
                      pid={item.id}
                      resetId={resetId}
                    />
                  </div>
                )}
              </li>
              {!!item.children.length &&
                item.children.map(
                  (child: {
                    _id: string
                    author?: any
                    replayName?: string
                    content?: string
                    create_at?: any
                    likes?: number
                    id?: number
                  }) => {
                    return (
                      <li
                        className={style['children-list-item']}
                        key={child._id}
                      >
                        <a
                          href={child.author.site}
                          className={style['children-user-img']}
                        >
                          <img
                            src={`https://bing.ioliu.cn/v1/rand?key=${child.author.name}&w=40&h=40`}
                          />
                        </a>
                        <div className={style['children-info']}>
                          <div className={style['children-user-info']}>
                            {child.author.name}
                          </div>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: articleContent(
                                child.replayName
                                  ? `回复<span style="color: #7f7f7f;margin-left:1rem">${child.replayName}：</span>${child.content}`
                                  : child.content
                              )
                            }}
                            className={style['children-content']}
                          ></p>
                          <div className={style['children-options-info']}>
                            <div className={style['children-time']}>
                              {dateStr(new Date(child.create_at).getTime())}
                            </div>
                            <div
                              onClick={() => {
                                likeComment(child)
                              }}
                              style={
                                commentLiked(child._id)
                                  ? { color: '#F25F5C' }
                                  : {}
                              }
                              className={style['children-like']}
                            >
                              <ThumbsUp className={style['icon']} size='18' />
                              {!!child.likes && child.likes}
                            </div>
                            <div
                              onClick={() => {
                                handleReply(child.id)
                              }}
                              className={style['children-replay']}
                            >
                              <CommentOne size='18' className={style['icon']} />{'  '}回复
                            </div>
                          </div>
                        </div>
                        {replyId === child.id && (
                          <div
                            ref={commentInput}
                            className={style['comment-input']}
                          >
                            <CommentInput
                              post_id={post_id}
                              pid={child.id}
                              resetId={resetId}
                              pid_name={item.author.name}
                            />
                          </div>
                        )}
                      </li>
                    )
                  }
                )}
            </Fragment>
          )
        })}
      </ul>
    </>
  )
}

export default Comment
