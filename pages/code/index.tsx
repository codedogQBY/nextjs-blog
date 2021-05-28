import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import ArticleListItem from '../../components/common/article/article-list-item'
import codeArtcles from '../../api/codeArtcles.json'
import moment from 'moment'
import Loading from '../../components/common/loading/loading'

const Code = () => {
  const artclesInfo = JSON.parse(JSON.stringify(codeArtcles))
  const artclesList = artclesInfo?.result?.list as []
  const total = artclesInfo?.result?.pagination?.total
  const [hasMore, setHasMore] = useState(true)
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const getMoreData = () => {
    setLoading(true)
    const newArtcles = [...data, ...artclesList.slice(page * 3, (page + 1) * 3)]
    const newPage = page + 1
    if (newArtcles.length >= total) setHasMore(false)
    setData(newArtcles)
    setTimeout(() => {
      setPage(newPage)
      setLoading(false)
    }, 1000)
  }
  return (
    <>
      <InfiniteScroll
        initialLoad={true}
        pageStart={0}
        loadMore={getMoreData}
        hasMore={!loading && hasMore}
      >
        {data.map((item) => {
          return (
            <ArticleListItem
              key={item['_id']}
              id={item['_id']}
              title={item['title']}
              introduction={item['descript']}
              date={moment(item.update_at).format('YYYY-MM-DD')}
              comments={item['meta'].comments}
              like={item['meta'].likes}
            />
          )
        })}
        {loading && hasMore && <Loading />}
      </InfiniteScroll>
    </>
  )
}

export default Code
