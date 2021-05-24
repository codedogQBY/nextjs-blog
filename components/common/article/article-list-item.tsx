import { FC } from 'react'
import Link from 'next/link'
import style from './article-list.module.scss'
import Line from '../line/line'
interface IArticleListItem {
  id: string
  title: string
  introduction?: string
  date: string
  comments: number
  like: number
}
const ArticleListItem: FC<IArticleListItem> = (props) => {
  const { id, title, introduction, date, comments, like } = props
  return (
    <div className={style['list-box']}>
      <h2 className={style['title']}>
        <Link href='/'>{title}</Link>
      </h2>
      <p className={style['introduction']}>{introduction}</p>
      <div className={style['meta']}>
        <span className={style['date']}>{date}</span>
        <span className={style['comments']}>{comments} 条评论</span>
        <span className={style['like']}>{like} 人喜欢</span>
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

export default ArticleListItem
