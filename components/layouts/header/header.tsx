import style from './/header.module.scss'
import Nav from '../../common/nav/nav'
import Line from '../../common/line/line'
import Icon from '../../common/icon/icon'
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  ChangeEvent,
  KeyboardEvent
} from 'react'
import router from '_next@10.2.3@next/router'
const Header = () => {
  const [translateY, setTranslateY] = useState('translateY(0)')
  const [top, setTop] = useState(0)
  const [searchOpen, setSearchOpen] = useState(false)
  const [keyword, setKeyword] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
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
  const handleSearchOpen = useCallback(() => {
    if (!searchOpen) {
      inputRef.current.focus()
    }
    setSearchOpen(!searchOpen)
  }, [searchOpen])
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [translateY, top])
  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      router.push(`/search/${keyword}`)
    }
  }
  const handelChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setKeyword(value)
  }
  return (
    <header style={{ transform: translateY }}>
      <div className={style['header']}>
        <div className={style['header-left']}>
          <Nav />
        </div>
        <div className={style['header-right']}>
          <div className={style['search-box']}>
            <Icon icon='icon-RectangleCopy2' onClick={handleSearchOpen} />
            <input
              value={keyword}
              ref={inputRef}
              placeholder='Search'
              style={searchOpen ? { opacity: '1', width: '200px' } : {}}
              className='search-input'
              onBlur={handleSearchOpen}
              onKeyDown={(e) => {
                handleEnter(e)
              }}
              onChange={(e) => {
                handelChange(e)
              }}
            />
          </div>
        </div>
      </div>
      <Line width='100%' height={1} scale={0.5} color='#282c35' />
    </header>
  )
}

export default Header
