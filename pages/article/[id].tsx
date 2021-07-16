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
  }, [id])
  const init = () => {
    setLikeArticles(
      JSON.parse(window.localStorage.getItem('LIKE_ARTICLS') || '[]')
    )
  }
  return (
    <>
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
            <span className={style['sumComments']}>评论 {article?.meta?.comments}</span>
            <span></span>
          </div>
          <div
            id='content'
            className='content'
            dangerouslySetInnerHTML={{ __html: articleContent }}
          ></div>
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
        <div className={style['comment']}>
          <div className={style['comment-top']}>
            <p className={style['comment-title']}>文章评论</p>
            <Line
              className={style['comment-bottom']}
              color='#696969'
              height={1}
            ></Line>
            </div>
          <CommentInput post_id={article.id} />
          <Comment post_id={article.id}/>
        </div>
      </div>
    </>
  )
}

export default memo(Article)
