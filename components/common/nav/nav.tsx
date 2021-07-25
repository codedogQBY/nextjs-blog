import React , {useRef} from 'react'
import classnames from 'classnames'
import untilStyle from '../../../styles/untils.module.scss'
import style from './nav.module.scss'
import Link from 'next/link'
import { useViewport } from '../../../hooks/viewportContext'

interface INavItem {
  name: string
  url: string
  children?: TNavList
}
type TNavList = INavItem[]
const Nav = () => {
  const {width} = useViewport()
  const navList: TNavList = width > 700 ? [
    {
      name: '文章',
      url: '/',
      children: [
        { name: '归档', url: '/file' },
        { name: '技术', url: '/code' },
        { name: '生活', url: '/life' },
        { name: '规划', url: '/plan' },
      ],
    },
    { name: '日记', url: '/diary' },
    { name: '推荐', url: '/recommend' },
    { name: '友链', url: '/friend' },
    { name: '留言', url: '/wall' },
    { name: '关于我', url: '/about' },
  ] : [
    {
      name: '首页',
      url: '/',
    },
    { name: '技术', url: '/code' },
    { name: '生活', url: '/life' },
    { name: '规划', url: '/plan' },
    { name: '归档', url: '/file' },
    { name: '日记', url: '/diary' },
    { name: '推荐', url: '/recommend' },
    { name: '友链', url: '/friend' },
    { name: '留言', url: '/wall' },
    { name: '关于我', url: '/about' },
  ]
  const navItemClass = classnames(
    style['nav-item'],
    untilStyle['position-relative']
  )
  return (
    <nav className={ style['nav-box']}>
      <div>
        {navList.map((item) => {
          return (
            <div  key={item.name} className={navItemClass}>
              <Link  href={item.url}>{item.name}</Link>
              {item.children && (
                <ul className={style['sub-nav']}>
                  {item.children.map((child) => {
                    return (
                      <Link key={child.name} href={child.url}>
                        <li className={style['sub-nav-item']}>{child.name}</li>
                      </Link>
                    )
                  })}
                </ul>
              )}
            </div>
          )
        })}
        </div>
    </nav>
  )
}

export default Nav
