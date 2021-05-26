import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import ArticleListItem from '../../components/common/article/article-list-item'
import codeArtcles from '../../api/codeArtcles.json'
import moment from 'moment'

const Code = () => {
  const artclesInfo = JSON.parse(JSON.stringify(codeArtcles))
  const artclesList = artclesInfo?.result?.list as []
  const total = artclesInfo?.result?.pagination?.total
  const [hasMore, setHasMore] = useState(true)
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setData(artclesList.slice(0, 3))
  }, [])
  const getMoreData = () => {
    setLoading(true)
    const newPage = page + 1
    const newArtcles = [
      ...data,
      ...artclesList.slice(newPage * 3, (newPage + 1) * 3),
    ]
    if (newArtcles.length >= total) setHasMore(false)
    setData(newArtcles)
    setPage(newPage)
    setLoading(false)
  }
  return (
    <>
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={getMoreData}
        hasMore={!loading && hasMore}
        loader={
          <div className='loader' key={0}>
            Loading ...
          </div>
        }
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
      </InfiniteScroll>
    </>
  )
}

export default Code
