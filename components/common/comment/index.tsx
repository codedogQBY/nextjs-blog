import React, { FC, useEffect, useState, useRef, Fragment } from 'react'
import style from './index.module.scss'
import { commentModel } from '../../../store/model'
import Icon from '../icon/icon'
import markdown from '../../../untils/marked'
import CommentInput from './components/comment-input'
import useClickOutsize from '../../../hooks/useClickOutside'

const dateStr = (date: number) => {
  //获取js 时间戳
  let time = new Date().getTime()
  //去掉 js 时间戳后三位
  time = (time - date) / 1000
  //存储转换值
  let s: string | number
  if (time < 60 * 10) {
    //十分钟内
    return '刚刚'
  } else if (time < 60 * 60 && time >= 60 * 10) {
    //超过十分钟少于1小时
    s = Math.floor(time / 60)
    return s + '分钟前'
  } else if (time < 60 * 60 * 24 && time >= 60 * 60) {
    //超过1小时少于24小时
    s = Math.floor(time / 60 / 60)
    return s + '小时前'
  } else if (time < 60 * 60 * 24 * 30 && time >= 60 * 60 * 24) {
    //超过1天少于30天内
    s = Math.floor(time / 60 / 60 / 24)
    return s + '天前'
  } else {
    //超过30天ddd
    let d = new Date(date)
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
  }
}

const Comment: FC<{ post_id: number }> = ({ post_id }) => {
  const [likeComments, setLikeComments] = useState<string[]>([])
  const [replyId, setReplyId] = useState<number>(-1)
  const comments = commentModel.useData((data) => data.data.data)
  useEffect(() => {
    post_id && commentModel.loadCommentsByPostId({ post_id })
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
        commentModel.loadCommentsByPostId({ post_id })
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
        {comments.map((item) => {
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
                      <Icon icon='icon-RectangleCopy19' />
                      {'  '}
                      {!!item.likes && item.likes}
                    </div>
                    <div
                      onClick={() => {
                        handleReply(item.id)
                      }}
                      className={style['replay']}
                    >
                      回复 <Icon icon='icon-RectangleCopy37' />
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
              {item.children?.length &&
                item.children.map((child) => {
                  return (
                    <li className={style['children-list-item']} key={child._id}>
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
                            <Icon icon='icon-RectangleCopy19' />
                            {'  '}
                            {!!child.likes && child.likes}
                          </div>
                          <div
                            onClick={() => {
                              handleReply(child.id)
                            }}
                            className={style['children-replay']}
                          >
                            回复 <Icon icon='icon-RectangleCopy37' />
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
                })}
            </Fragment>
          )
        })}
      </ul>
    </>
  )
}

export default Comment
