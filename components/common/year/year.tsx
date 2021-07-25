import style from './year.module.scss'
import Link from 'next/link'
import { FC } from 'react'
import moment from 'moment'
import Tag from '../tag'
export interface articleItem {
  title: string
  _id: string
  create_at: string
  meta: {
    comments: number
    likes: number
    views: number
  }
  type: number
}
export interface mouthItem {
  month: number
  articleList: articleItem[]
}
export interface YearProps {
  year: string
  monthList: mouthItem[]
}
const Year: FC<YearProps> = (props) => {
  const { year, monthList } = props
  const tagMap = new Map([
    [1, { text: 'code', color: '#fffef9', bgColor: '#84bf96' }],
    [2, { text: 'life', color: '#fffef9', bgColor: '#f26522' }],
    [3, { text: 'plan', color: '#fffef9', bgColor: '#694d9f' }],
  ])
  const monthMap = new Map([
    [1, 'Jan'],
    [2, 'Feb'],
    [3, 'Mar'],
    [4, 'Apr'],
    [5, 'May'],
    [6, 'Jun'],
    [7, 'Jul'],
    [8, 'Aug'],
    [9, 'Sept'],
    [10, 'Oct'],
    [11, 'Nov'],
    [12, 'Dec'],
  ])
  return (
    <div className={style['year-list']}>
      <h2 className={style['year']}>{year}</h2>
      {monthList?.map((item) => {
        return (
          <div key={item.month} className={style['mouth-list']}>
            <h4 className={style['mouth']}>{monthMap.get(item.month)}</h4>
            {item.articleList.map((article) => {
              return (
                <div key={article._id} className={style['article-list']}>
                  <span className={style['date']}>
                    {moment(article.create_at).format('MM.DD')}
                  </span>
                  <Link href={`/${tagMap.get(article.type).text}`}>
                    <a>
                      <Tag
                        className={style['tag']}
                        color={tagMap.get(article.type).color}
                        bgColor={tagMap.get(article.type).bgColor}
                      >
                        {tagMap.get(article.type).text}
                      </Tag>
                    </a>
                  </Link>
                  <Link href={`/article/${article._id}`}>
                    <a>
                      <div className={style['title']}>{article.title}</div>
                    </a>
                  </Link>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default Year
