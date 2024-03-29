import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import Loading from '../../components/common/loading/loading'
import dayjs from 'dayjs'
import { diaryModel } from '../../store/model'
import style from './index.module.scss'
import { Diary as DiaryType } from '../../type'
import { Like } from '@icon-park/react'
import Head from 'next/head'

const Diary = () => {
  const [likeDiaries, setLikeDiaries] = useState<string[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (process.browser) {
      const diaries = localStorage.getItem('LIKE_DIARY')
      if (diaries) setLikeDiaries(JSON.parse(diaries))
    }
    diaryModel
      .getDiaries({
        current_page: 1,
        page_size: 5
      })
      .then((res) => {
        const { pagination, list } = res
        setData(list)
        const { total_page } = pagination
        if (total_page === 1) {
          setLoading(false)
          setHasMore(false)
        }
      })
  }, [])

  const getMoreData = () => {
    setLoading(true)
    const newPage = page + 1
    diaryModel
      .getDiaries({
        current_page: newPage,
        page_size: 5
      })
      .then((res) => {
        const { pagination, list } = res
        const { current_page, total_page } = pagination
        setPage(current_page)
        setData(data.concat(list))
        setLoading(false)
        if (newPage >= total_page) {
          setLoading(false)
          setHasMore(false)
        }
      })
  }

  // 获取某个日记是否被点赞
  const diaryLiked = (_id: string) => {
    return likeDiaries.includes(_id)
  }

  // 点赞日记
  const likeDiary = (diary: DiaryType) => {
    if (diaryLiked(diary._id)) return false
    diaryModel
      .likeDiary(diary)
      .then((res) => {
        const likes = [...likeDiaries]
        likes.push(diary._id)
        const list = JSON.parse(JSON.stringify(data))
        list.find(item=>item._id === diary._id).likes++
        setData(list)
        setLikeDiaries(likes)
        localStorage.setItem('LIKE_DIARY', JSON.stringify(likes))
      })
      .catch((err) => {
        console.warn('日记点赞失败', err)
      })
  }
  return (
    <>
      <Head>
        <title>日记 | codedogs</title>
      </Head>
      <InfiniteScroll
        initialLoad={false}
        pageStart={2}
        loadMore={getMoreData}
        hasMore={!loading && hasMore}
      >
        {data.map((item) => {
          return (
            <div className={style['diary-item']} key={item._id}>
              <div className={style['info-bar']}>
                <div className={style['weather']}>{item.weather}</div>
                <div className={style['time']}>
                  {dayjs(item.create_at).format('YYYY-MM-DD HH : mm : ss')}
                </div>
              </div>
              <p
                className={style['diary-content']}
                dangerouslySetInnerHTML={{ __html: item.content }}
              ></p>
              <div
                className={style['like-btn']}
                style={diaryLiked(item._id) ? { color: '#F25F5C' } : {}}
              >
                <div className={style['like']}>
                  <Like
                    size='18'
                    className={style['icon']}
                    onClick={() => {
                      likeDiary(item)
                    }}
                  />
                  {item.likes}人点赞
                </div>
              </div>
            </div>
          )
        })}
        {loading && hasMore && <Loading />}
        {!!data.length && !loading && !hasMore && (
          <div className={style['hasnomore']}>滑到底啦~</div>
        )}
      </InfiniteScroll>
    </>
  )
}

export default Diary
