import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import ArticleListItem from '../components/common/article/article-list-item'
import Loading from '../components/common/loading/loading'
import style from './index.module.scss'
import Head from 'next/head'
import { articleModel } from '../store/model'
import { sietmapModel } from '../store/model'

const Index = () => {
  const option = sietmapModel.useData((data) => data.option)
  const list = articleModel.useData((data) => data.allArts)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    articleModel.INIT_ALL_ARTS()
    articleModel
      .getArtList({
        current_page: 1,
        page_size: 5
      })
  }, [])
  const getMoreData = () => {
    setLoading(true)
    const newPage = page + 1
    articleModel
      .getArtList({
        current_page: newPage,
        page_size: 5
      })
      .then((res) => {
        const { current_page, total_page } = res.result.pagination
        setPage(newPage)
        setLoading(false)
        if (current_page >= total_page) {
          setLoading(false)
          setHasMore(false)
        }
      })
  }
  return (
    <>
      <Head>
        <title>前端星空 | codedogs</title>
        <meta name='description' content={option.descript}></meta>
        <meta name='keywords' content={option.keyword}></meta>
      </Head>
      <InfiniteScroll
        initialLoad={false}
        pageStart={2}
        loadMore={getMoreData}
        hasMore={!loading && hasMore}
      >
        {list?.map((item) => {
          return <ArticleListItem key={item.id} article={item} />
        })}
        {loading && hasMore && <Loading />}
        {!!list.length && !loading && !hasMore && (
          <div className={style['hasnomore']}>滑到底啦~</div>
        )}
      </InfiniteScroll>
    </>
  )
}

export default Index
