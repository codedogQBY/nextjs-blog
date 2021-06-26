import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import ArticleListItem from '../../components/common/article/article-list-item'
import Loading from '../../components/common/loading/loading'
import { getArts } from '../../api'
const Life = () => {
  const [hasMore, setHasMore] = useState(true)
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getArts({
      type: 2,
      current_page: 1,
      page_size: 5
    }).then(res=>{
      setData(res.result.list)
    })
  }, [])
  const getMoreData = () => {
    setLoading(true)
    const newPage = page + 1
    getArts({
      type: 2,
      current_page: newPage,
      page_size: 5
    }).then(res=>{
      const {current_page,total_page} = res.result.pagination 
      setPage(current_page)
      setData(data.concat(res.result.list))
      setLoading(false)
      if(newPage >= total_page){
        setLoading(false)
        setHasMore(false)
      }
    })
  }
  return (
    <>
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

export default Life
