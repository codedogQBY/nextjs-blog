import React, { useEffect, useState } from 'react'
import style from './index.module.scss'
import { UpC } from '@icon-park/react'
import { useViewport } from '../../../hooks/viewportContext'
const ToTop = () => {
  const [showScroll, setShowScroll] = useState(false)
  const {width} = useViewport()
  useEffect(() => {
    // 滚动条在Y轴上的滚动距离
    function getScrollTop() {
      let scrollTop = 0
      let bodyScrollTop = 0
      let documentScrollTop = 0
      if (document.body) {
        bodyScrollTop = document.body.scrollTop
      }
      if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop
      }
      scrollTop =
        bodyScrollTop - documentScrollTop > 0
          ? bodyScrollTop
          : documentScrollTop
      return scrollTop
    }
    // 浏览器视口的高度
    function getWindowHeight() {
      let windowHeight = window.innerWidth
      return windowHeight
    }
    if (process.browser) {
      window.addEventListener('scroll', () => {
        if (getScrollTop() * 2 > getWindowHeight()) {
          setShowScroll(true)
        } else setShowScroll(false)
      })
    }
  }, [])

  const scrollTop = () => {
    if (process.browser) {
      let timer = null
      cancelAnimationFrame(timer)
      timer = requestAnimationFrame(function fn() {
        let oTop = document.body.scrollTop || document.documentElement.scrollTop
        if (oTop > 0) {
          document.body.scrollTop = document.documentElement.scrollTop =
            oTop - 150
          timer = requestAnimationFrame(fn)
        } else {
          cancelAnimationFrame(timer)
        }
      })
    }
  }
  return (
    <>
      {showScroll && (
        <div onClick={scrollTop} className={style['scoll-aside']}>
          <div className={style['scoll-btn']}>
            <UpC className={style['icon']} size={width > 800 ? '32' : '24'} />
          </div>
        </div>
      )}
    </>
  )
}

export default ToTop
