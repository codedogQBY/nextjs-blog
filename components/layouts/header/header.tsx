import style from './header.module.scss'
import Nav from '../../common/nav/nav'
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  ChangeEvent,
  KeyboardEvent
} from 'react'
import router from 'next/router'
import {Search} from '@icon-park/react'
import { useViewport } from '../../../hooks/viewportContext'

const Header = () => {
  const {width} = useViewport()
  const [translateY, setTranslateY] = useState('translateY(0)')
  const [top, setTop] = useState(0)
  const [searchOpen, setSearchOpen] = useState(false)
  const [keyword, setKeyword] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [translateY, top])

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
            <Search size="18" className={style['icon']}  onClick={handleSearchOpen} />
            <input
              value={keyword}
              ref={inputRef}
              placeholder='Search'
              style={ width > 700 && searchOpen ? { opacity: '1', width: '200px' } : {}}
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
    </header>
  )
}

export default Header
