import { useState, useEffect, memo, useMemo, FC } from 'react'
import { useRouter } from 'next/router'
import markdown from '../../untils/marked'
import { articleModel } from '../../store/model'
import moment from 'moment'
import style from './index.module.scss'
import CommentInput from '../../components/common/comment/components/comment-input'
const Article = () => {
  const router = useRouter()
  const { id } = router.query
  const [likeArticles, setLikeArticles] = useState([])
  const article = articleModel.useData((data) => data.details)
  const relativeList = articleModel.useData((data)=>data.relativeList)
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
  useEffect( () => {
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
          <div className={"article-data"}>
            <span>{moment(article.update_at).format("yyyy-MM-DD HH:mm:ss")}</span>
            <span>喜欢 {article?.meta?.likes}</span>
            <span>评论 {article?.meta?.comments}</span>
            <span></span>
          </div>
          <div
            id="content"
            className='content'
            dangerouslySetInnerHTML={{ __html: articleContent }}
          ></div>
        </div>
        <div className='relative-list'>{
        relativeList.map(item=>{
          <ul>
            <li>
              <span>{item.title}</span>
              <p>{item.descript}</p>
            </li>
          </ul>
        })
      }</div>
      </div>
    </>
  )
}

export default memo(Article)
