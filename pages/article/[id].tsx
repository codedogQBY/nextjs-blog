import { useState, useEffect, memo, useMemo, FC } from 'react'
import { useRouter } from 'next/router'
import markdown from '../../untils/marked'
import { articleModel } from '../../store/model'
import moment from 'moment'
import Line from '../../components/common/line/line'
import Link from 'next/link'
import style from './index.module.scss'
import CommentInput from '../../components/common/comment/components/comment-input'
import Comment from '../../components/common/comment'
import { ThumbsUp, CommentOne, Tag, Like } from '@icon-park/react'
import Head from 'next/head'
const Article = () => {
  const router = useRouter()
  const { id } = router.query
  const [likeArticles, setLikeArticles] = useState([])
  const article = articleModel.useData((data) => data.details)
  const relativeList = articleModel.useData((data) => data.relativeList)
  const articleContent = useMemo(() => {
    if (typeof markdown(article.content, false, true) === 'string') {
      return ''
    } else {
      return (
        markdown(article.content, false, true) as {
          html: string
          toc: any[]
        }
      ).html
    }
  }, [article])
  useEffect(() => {
    init()
  }, [])
  useEffect(() => {
    id &&
      articleModel.getArt(id as string).then(async (res) => {
        await articleModel.getRelativeList()
      })
  }, [id, likeArticles])
  const init = () => {
    if (process.browser) {
      setLikeArticles(
        JSON.parse(window.localStorage.getItem('LIKE_ARTICLS') || '[]')
      )
    }
  }
  // 获取文章是否被点赞
  const artLiked = (_id: string) => {
    return likeArticles.includes(_id)
  }

  // 点赞文章
  const likeArt = (_id: string) => {
    if (artLiked(_id)) return false
    articleModel
      .likeArt(article)
      .then((res) => {
        const likes = [...likeArticles]
        likes.push(_id)
        setLikeArticles(likes)
        localStorage.setItem('LIKE_ARTICLS', JSON.stringify(likes))
      })
      .catch((err) => {
        console.warn('评论点赞失败', err)
      })
  }

  // 跳转到评论区

  const toComment = () => {
    if (process.browser) {
      document.querySelector('#comment').scrollIntoView(true)
    }
  }

  return (
    <>
      <Head>
        <title>文章-{article.title}| codedogs</title>
      </Head>
      <div className='article-list'>
        <div className='article-cont'>
          <div className='article-title'>
            <h4>{article.title}</h4>
          </div>
          <div className={style['article-data']}>
            <span className={style['time']}>
              {moment(article.create_at).format('yyyy . MM . DD  HH:mm:ss')}
            </span>
            <span className={style['likes']}>喜欢 {article?.meta?.likes}</span>
            <span className={style['sumComments']}>
              评论 {article?.meta?.comments}
            </span>
            <span></span>
          </div>
          <div
            id='content'
            className='content'
            dangerouslySetInnerHTML={{ __html: articleContent }}
          ></div>
          <div className={style['info']}>
            <div className={style['like']}>
              <Like
                className={style['icon']}
                style={
                  artLiked(id as string) ? { color: 'rgb(242, 95, 92)' } : {}
                }
                onClick={() => {
                  likeArt(id as string)
                }}
                size='18'
              />
              <span>{article?.meta?.likes}</span>
            </div>
            <div className={style['tag']}>
              <Tag size='18' className={style['icon']} />
              {article?.tag.map((item) => {
                return (
                  <span className={style['tag']} key={item._id}>
                    <Link href={`/tag/${item._id}`}><a>{item?.name}</a></Link>
                  </span>
                )
              })}
            </div>
            <div className={style['copyright']}>
              <span>转载声明: 署名-自由转载</span>
            </div>
          </div>
        </div>
        <div className={style['relative-article']}>
          <div className={style['line-box']}>
            <p className={style['line-title']}>相关推荐</p>
            <Line
              className={style['line-bottom']}
              color='#696969'
              height={1}
            ></Line>
          </div>
          <ul className={style['list']}>
            {relativeList.map((item) => (
              <li className={style['list-item']} key={item._id}>
                <Link href={`/article/${item._id}`}>
                  <a>
                    <span className={style['item-time']}>
                      {moment(item.update_at).format('yyyy-MM-DD HH:mm:ss')}
                    </span>
                    <span className={style['item-title']}>{item.title}</span>
                  </a>
                </Link>
                <p className={style['item-descript']}>{item.descript}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className={style['comment']} id='comment'>
          <div className={style['comment-top']}>
            <p className={style['comment-title']}>文章评论</p>
            <Line
              className={style['comment-bottom']}
              color='#696969'
              height={1}
            ></Line>
          </div>
          <CommentInput post_id={article.id} />
          <Comment post_id={article.id} />
        </div>
      </div>
      <div className={style['option']}>
        <div
          className={style['like']}
          onClick={() => {
            likeArt(id as string)
          }}
        >
          <ThumbsUp
            style={artLiked(id as string) ? { color: 'rgb(242, 95, 92)' } : {}}
            className={style['icon']}
            size='18'
          />
          <span className={style['number']}>{article?.meta?.likes}</span>
        </div>
        <div onClick={toComment} className={style['comments']}>
          <CommentOne className={style['icon']} size='18' />
          <span className={style['number']}>{article?.meta?.comments}</span>
        </div>
      </div>
    </>
  )
}

export default memo(Article)
