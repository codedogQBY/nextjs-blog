import style from './/header.module.scss'
import Nav from '../../common/nav/nav'
import Line from '../../common/line/line'
import Icon from '../../common/icon/icon'
import { useState, useEffect, useCallback } from 'react'
const Header = () => {
  const [translateY, setTranslateY] = useState('translateY(0)')
  const [top, setTop] = useState(0)
  const handleScroll = (event) => {
    // 滚动的高度
    const p =
      (event.srcElement ? event.srcElement.documentElement.scrollTop : false) ||
      window.pageYOffset ||
      (event.srcElement ? event.srcElement.body.scrollTop : 0)

    if (top <= p) {
      setTranslateY('translateY(-100%)')
    } else {
      setTranslateY('translateY(0)')
    }
    setTop(p)
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [translateY, top])
  return (
    <header style={{ transform: translateY }}>
      <div className={style['header']}>
        <div className={style['header-left']}>
          <Nav />
        </div>
        <div className={style['header-right']}>
          <div className={style['search-box']}>
            <Icon icon='icon-RectangleCopy2' />
          </div>
        </div>
      </div>
      <Line width='100%' height={1} scale={0.5} color='#282c35' />
    </header>
  )
}

export default Header
