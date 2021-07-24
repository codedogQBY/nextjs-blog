import React, { useState, useEffect, memo, useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import Loading from '../../components/common/loading/loading'
import { heroModel } from '../../store/model'
import Modal from '../../components/common/modal'
import message from '../../components/common/message/Message'
import style from './index.module.scss'
import { Hero } from '../../type'
import classNames from '_classnames@2.3.1@classnames'
import moment from '_moment@2.29.1@moment'
import marked from '../../untils/marked'
import Head from 'next/head'
import { useViewport } from '../../hooks/viewportContext'

const Wall = () => {
  const { width } = useViewport()
  const [hasMore, setHasMore] = useState(true)
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [formData, setFormData] = useState<Hero>({
    name: '',
    content: ''
  })

  useEffect(() => {
    heroModel
      .getHero({
        current_page: 1,
        page_size: 12
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
    heroModel
      .getHero({
        current_page: newPage,
        page_size: 12
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

  const handleOnWall = () => {
    setVisible(true)
  }
  const setNewVisible = (visible: boolean) => {
    setVisible(visible)
  }
  const handleOk = useCallback(() => {
    if (!formData.content) {
      message({
        type: 'error',
        message: '留言内容不应为空'
      })
      return false
    } else {
      heroModel.postHero(formData).then((res) => {
        setFormData({
          name: '',
          content: ''
        })
        setVisible(false)
      })
    }
    setVisible(false)
  }, [formData])
  const handleCancel = () => {
    setFormData({
      name: '',
      content: ''
    })
    setVisible(false)
  }
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) => {
    const newData = { ...formData, ...{ [key]: e.target.value } }
    setFormData(newData)
  }
  return (
    <>
      <Head>
        <title>留言 | codedogs</title>
      </Head>
      <div className={style['walls']}>
        <div className={style['head']}>
          <div className={style['box']}>
            <div
              onClick={() => {
                handleOnWall()
              }}
              className={style['join']}
            >
              我要上墙
            </div>
          </div>
        </div>
        <div className={style['list-box']}>
          <InfiniteScroll
            initialLoad={false}
            pageStart={2}
            loadMore={getMoreData}
            hasMore={!loading && hasMore}
          >
            {width > 700 ? (
              <>
                <div className={style['column']} key='1'>
                  {data.map((item, index) => {
                    if (index % 3 === 0) {
                      return (
                        <div key={item._id} className={style['list']}>
                          <h3 className={style['user']}>
                            <span className={style['user-name']}>
                              {moment(item.create_time).format(
                                'yyyy.MM.DD HH:mm'
                              )}
                            </span>
                          </h3>
                          <div
                            className={classNames(
                              style['content'],
                              style['markdown-content']
                            )}
                            dangerouslySetInnerHTML={{
                              __html: (
                                marked(item.content, null, false) as {
                                  html: string
                                  toc: any[]
                                }
                              ).html
                            }}
                          ></div>
                          <div className={style['info']}>
                            <span className={style['time']}>{item.name}</span>
                          </div>
                        </div>
                      )
                    }
                  })}
                </div>
                <div className={style['column']} key='2'>
                  {data.map((item, index) => {
                    if (index % 3 === 1) {
                      return (
                        <div key={item._id} className={style['list']}>
                          <h3 className={style['user']}>
                            <span className={style['user-name']}>
                              {moment(item.create_time).format(
                                'yyyy.MM.DD HH:mm'
                              )}
                            </span>
                          </h3>
                          <div
                            className={classNames(
                              style['content'],
                              style['markdown-content']
                            )}
                            dangerouslySetInnerHTML={{
                              __html: (
                                marked(item.content, null, false) as {
                                  html: string
                                  toc: any[]
                                }
                              ).html
                            }}
                          ></div>
                          <div className={style['info']}>
                            <span className={style['time']}>{item.name}</span>
                          </div>
                        </div>
                      )
                    }
                  })}
                </div>
                <div className={style['column']} key='3'>
                  {data.map((item, index) => {
                    if (index % 3 === 2) {
                      return (
                        <div key={item._id} className={style['list']}>
                          <h3 className={style['user']}>
                            <span className={style['user-name']}>
                              {moment(item.create_time).format(
                                'yyyy.MM.DD HH:mm'
                              )}
                            </span>
                          </h3>
                          <div
                            className={classNames(
                              style['content'],
                              style['markdown-content']
                            )}
                            dangerouslySetInnerHTML={{
                              __html: (
                                marked(item.content, null, false) as {
                                  html: string
                                  toc: any[]
                                }
                              ).html
                            }}
                          ></div>
                          <div className={style['info']}>
                            <span className={style['time']}>{item.name}</span>
                          </div>
                        </div>
                      )
                    }
                  })}
                </div>
              </>
            ) : (
              <>
                <div className={style['column']}>
                  {data.map((item, index) => {
                    return (
                      <div key={item._id} className={style['list']}>
                        <h3 className={style['user']}>
                          <span className={style['user-name']}>
                            {moment(item.create_time).format(
                              'yyyy.MM.DD HH:mm'
                            )}
                          </span>
                        </h3>
                        <div
                          className={classNames(
                            style['content'],
                            style['markdown-content']
                          )}
                          dangerouslySetInnerHTML={{
                            __html: (
                              marked(item.content, null, false) as {
                                html: string
                                toc: any[]
                              }
                            ).html
                          }}
                        ></div>
                        <div className={style['info']}>
                          <span className={style['time']}>{item.name}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </>
            )}
            {loading && hasMore && <Loading />}
          </InfiniteScroll>
        </div>
      </div>
      <Modal
        setNewVisible={setNewVisible}
        title='我要上墙'
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form className='hero-form'>
          <div className='form-item'>
            <label className=''>称呼</label>
            <input
              value={formData.name}
              placeholder='该怎么称呼您？'
              onChange={(e) => {
                handleChange(e, 'name')
              }}
              maxLength={20}
            ></input>
          </div>
          <div className='form-item'>
            <label>描述</label>
            <textarea
              maxLength={200}
              placeholder='请说点什么吧！（必填,支持部分markdowm的形式）'
              rows={5}
              value={formData.content}
              onChange={(e) => {
                handleChange(e, 'content')
              }}
            ></textarea>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default memo(Wall)
