import { FC, memo } from 'react'
import style from './article-list.module.scss'
import { Article } from '../../../type'
import moment from 'moment'
import { ThumbsUp, Eyes, Comments } from '@icon-park/react'
import Link from 'next/link'

const ArticleListItem: FC<{ article: Article }> = (props) => {
  const { article } = props
  return (
    <div className={style['list-box']}>
      <div className={style['box-img']}>
        <img src={article.thumb || 'https://qiniu.codedogs.top/blog/image/index.png'} />
      </div>
      <div className={style['box-content']}>
        <div className={style['title']}>
          <h3>
            <Link href={`/article/${article._id}`}>
              <a>{article.title}</a>
            </Link>
          </h3>
        </div>
        <div className={style['tags']}>
          {article?.tag?.map((item) => {
            return (
              <span className={style['tag']} key={item._id}>
                <Link href={`/tag/${item._id}`}>
                  <a>{item.name}</a>
                </Link>
              </span>
            )
          })}
        </div>
        <p className={style['introduction']}>
          <Link href={`/article/${article._id}`}>
            <a>{article.descript}</a>
          </Link>
        </p>
        <div className={style['options']}>
          <div className={style['info']}>
            <span className={style['views']}>
              <Eyes className={style['icon']} size='16' />
              {article.meta.views}
            </span>
            <span className={style['likes']}>
              <ThumbsUp className={style['icon']} size='16' />
              {article.meta.likes}
            </span>
            <span className={style['comments']}>
              <Comments className={style['icon']} size='16' />
              {article.meta.comments}
            </span>
          </div>
          <div className={style['time']}>
            <Link href={`/file`}>
              <a>{moment(article.create_at).format('YYYY . MM . DD')}</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(ArticleListItem)
