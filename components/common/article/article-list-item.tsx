import { FC,memo } from 'react'
import Link from 'next/link'
import style from './article-list.module.scss'
import Line from '../line/line'
import moment from 'moment'
import { Article } from '../../../type'

const ArticleListItem: FC<{article:Article}> = (props) => {
  const { article } = props
  return (
    <div className={style['list-box']}>
      <h2 className={style['title']}>
        <Link href={`/article/${article._id}`}>{article.title}</Link>
      </h2>
      <p className={style['introduction']}>{article.descript}</p>
      <div className={style['meta']}>
        <span className={style['date']}>{article.date}</span>
        <span className={style['comments']}>{article.meta.comments} 条评论</span>
        <span className={style['like']}>{article.meta.likes} 人喜欢</span>
      </div>
      <Line
        className={style['line-bottom']}
        color='#696969'
        height={1.5}
        width='8rem'
      ></Line>
    </div>
  )
}

export default memo(ArticleListItem)
