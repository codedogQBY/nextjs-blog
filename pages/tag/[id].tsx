import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import ArticleListItem from '../../components/common/article/article-list-item'
import Loading from '../../components/common/loading/loading'
import { getArts } from '../../api'
import { useRouter } from 'next/router'
import Line from '../../components/common/line/line'
import style from './tag.module.scss'
import { Tag } from '../../type'
import { tagModel } from '../../store/model'
import { TagOne } from '@icon-park/react'
import Head from 'next/head'

const Code = () => {
  const router = useRouter()
  const { id } = router.query
  const [hasMore, setHasMore] = useState(true)
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [tag, setTag] = useState<Tag>({ name: '', descript: '' })
  const tags = tagModel.useData((data) => data.data.list)
  useEffect(() => {
    const tag = tags.find((item) => item._id === id)
    setTag(tag)
  }, [tags, id])
  useEffect(() => {
    getArts({
      tag: id as string,
      current_page: 1,
      page_size: 5
    }).then((res) => {
      setData(res.result.list)
    })
  }, [])
  const getMoreData = () => {
    setLoading(true)
    const newPage = page + 1
    getArts({
      tag: id as string,
      current_page: newPage,
      page_size: 5
    }).then((res) => {
      const { current_page, total_page } = res.result.pagination
      setPage(current_page)
      setData(data.concat(res.result.list))
      setLoading(false)
      if (newPage >= total_page) {
        setLoading(false)
        setHasMore(false)
      }
    })
  }
  return (
    <>
      <Head>
        <title>标签[{" "+tag?.name+" "}]| codedogs</title>
      </Head>
      <p className={style['line-box']}>
        <span className={style['line-title']}>
          <TagOne size='18' className={style['icon']} />
          {tag?.name}
        </span>
        <Line
          className={style['line-bottom']}
          color='#696969'
          height={1}
        ></Line>
      </p>
      <InfiniteScroll
        initialLoad={false}
        pageStart={1}
        loadMore={getMoreData}
        hasMore={!loading && hasMore}
      >
        {data.map((item) => {
          return <ArticleListItem key={item.id} article={item} />
        })}
        {loading && hasMore && <Loading />}
      </InfiniteScroll>
    </>
  )
}

export default Code
