import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import Loading from '../../components/common/loading/loading'
import { recommendModel } from '../../store/model'
import style from './index.module.scss'
import classNames from 'classnames'
import { Comments, ThumbsUp, PreviewOpen } from '@icon-park/react'
import Head from 'next/head'
import { useViewport } from '../../hooks/viewportContext'
import { dateStr } from '../../untils'

const Recommend = () => {
  const {width} = useViewport()
  const segmentfaultList = recommendModel.useData(
    (data) => data.segmentfaultInfo?.list
  )
  const offset = recommendModel.useData((data) => data.segmentfaultInfo?.offset)
  const segmentfaultHasMore = recommendModel.useData(
    (data) => data.segmentfaultInfo?.hasMore
  )
  const juejinList = recommendModel.useData((data) => data.juejinInfo?.list)
  const cursor = recommendModel.useData((data) => data.juejinInfo?.cursor)
  const juejinHasMore = recommendModel.useData(
    (data) => data.juejinInfo?.hasMore
  )
  const [active, setActive] = useState<string>('segmentfault')
  const [loading, setLoading] = useState(false)
  const [sfInit, setSfInit] = useState(false) // 思否数据是否初始化
  const [jjInit, setJjInit] = useState(false) // 掘金数据是否初始化
  useEffect(() => {
    // 初始化数据
    if (!sfInit) {
      getMoreData()
      setSfInit(true)
    } else if (!jjInit) {
      getJuejinMoreData()
      setJjInit(true)
    }
  }, [active])

  const getMoreData = async () => {
    setLoading(true)
    await recommendModel.getArt(offset)
    setLoading(false)
  }

  const getJuejinMoreData = async () => {
    setLoading(true)
    await recommendModel.getJuejinArt(cursor)
    setLoading(false)
  }

  const onTabChange = (active: string) => {
    if (process.browser) {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
      setActive(active)
    }
  }
  return (
    <div className={style['recommend-box']}>
      <Head>
        <title>推荐-{active === 'segmentfault' ? '思否' : '掘金'} | codedogs</title>
      </Head>
      <div className={style['tabs']}>
        <div
          onClick={() => {
            onTabChange('segmentfault')
          }}
          className={
            active === 'segmentfault'
              ? classNames(style['tab'], style['sf-tab'], style['active-tab'])
              : classNames(style['tab'], style['sf-tab'])
          }
        >
          <img src='https://qiniu.codedogs.top/article/1626685455000/SegmentFault%20%E6%80%9D%E5%90%A6.png' />
          {width > 800 ? '思否' : ''}
        </div>
        <div
          onClick={() => {
            onTabChange('juejin')
          }}
          className={
            active === 'juejin'
              ? classNames(style['tab'], style['jj-tab'], style['active-tab'])
              : classNames(style['tab'], style['jj-tab'])
          }
        >
          <img src='https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/6bdafd801c878b10edb5fed5d00969e9.svg' />
          {width > 800 ? '掘金' : ''}
        </div>
      </div>
      <div
        className={style['tabPane']}
        style={{ display: active === 'segmentfault' ? 'block' : 'none' }}
      >
        <InfiniteScroll
          initialLoad={false}
          loadMore={getMoreData}
          hasMore={!loading && segmentfaultHasMore}
        >
          <ul className={style['list']}>
            {segmentfaultList?.map((item) => {
              return (
                <li key={item.id} className={style['list-item']}>
                  <div className={style['content']}>
                    <h5>
                      <a
                        className={style['title']}
                        target='_blank'
                        href={`https://segmentfault.com${item.url}`}
                      >
                        {item.title}
                      </a>
                    </h5>
                    <div className={style['info-wrap']}>
                      <a
                        href={`https://segmentfault.com${item.user.url}`}
                        target='_blank'
                      >
                        <img
                          className={style['avatar']}
                          src={`${item.user.avatar_url}`}
                          alt={item.user.name}
                        />
                      </a>
                      <a
                        href={`https://segmentfault.com${item.user.url}`}
                        target='_blank'
                      >
                        <span className={style['name']}>{item.user.name}</span>
                      </a>
                      <span className={style['split-dot']}></span>
                      <span className={style['creat-time']}>
                        {dateStr(Number(item.created + '000'))}
                      </span>
                      <div className={style['like']}>
                        <ThumbsUp size='18' className={style['icon']} />
                        {!!item.votes ? item.votes : '赞'}
                      </div>
                      <div className={style['comments']}>
                        <Comments size='18' className={style['icon']} />
                        {!!item.comments ? item.comments : '评论'}
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
            {loading && segmentfaultHasMore && <Loading />}
            {(!!segmentfaultList.length && !loading && !segmentfaultHasMore) && <div className={style['hasnomore']}>滑到底啦~</div>}
          </ul>
        </InfiniteScroll>
      </div>
      <div
        className={style['tabPane']}
        style={{ display: active === 'juejin' ? 'block' : 'none' }}
      >
        <InfiniteScroll
          initialLoad={false}
          loadMore={getJuejinMoreData}
          hasMore={!loading && juejinHasMore}
        >
          <ul className={style['juejin-list']}>
            {juejinList?.map((item) => {
              return (
                <li key={item.article_id} className={style['list-item']}>
                  <div className={style['entry']}>
                    <div className={style['entry-link']}>
                      <div className={style['content-box']}>
                        <div className={style['meta-container']}>
                          <div className={style['user-message']}>
                            <a
                              target='_blank'
                              href={`https://juejin.cn/user/${item.author_user_info.user_id}`}
                            >
                              <span className={style['user-name']}>
                                {item.author_user_info.user_name}
                              </span>
                            </a>
                          </div>
                          <div className={style['date']}>
                            {dateStr(Number(item.article_info.rtime + '000'))}
                          </div>
                          <div className={style['tag-list']}>
                            {item?.tags?.map((item, index, array) => {
                              return (
                                <div key={item.tag_id} className={style['tag']}>
                                  <span>{item.tag_name}</span>
                                  {index !== array.length - 1 && (
                                    <span className={style['split-dot']}></span>
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                        <div className={style['content-wrapper']}>
                          <div className={style['content-main']}>
                            <div className={style['title-row']}>
                              <a
                                target='_blank'
                                href={`https://juejin.cn/post/${item.article_id}`}
                              >
                                {item.article_info.title}
                              </a>
                            </div>
                            <div className={style['abstract']}>
                              <a
                                target='_blank'
                                href={`https://juejin.cn/post/${item.article_id}`}
                              >
                                {item.article_info.brief_content}
                              </a>
                            </div>
                            <ul className={style['action-list']}>
                              <li
                                className={classNames(
                                  style['item'],
                                  style['view']
                                )}
                              >
                                <PreviewOpen
                                  size='18'
                                  className={style['icon']}
                                />
                                {item.article_info.view_count}
                              </li>
                              <li
                                className={classNames(
                                  style['item'],
                                  style['like']
                                )}
                              >
                                <ThumbsUp size='18' className={style['icon']} />
                                {item.article_info.digg_count}
                              </li>
                              <li
                                className={classNames(
                                  style['item'],
                                  style['comment']
                                )}
                              >
                                <Comments size='18' className={style['icon']} />
                                {item.article_info.comment_count}
                              </li>
                            </ul>
                          </div>
                          {(!!item.article_info.cover_image && width > 800) && (
                            <img
                              className={style['thumb']}
                              src={item?.article_info.cover_image}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
            {loading && juejinHasMore && <Loading />}
            {(!!juejinList.length && !loading && !juejinHasMore) && <div className={style['hasnomore']}>底啦~</div>}
          </ul>
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default Recommend
