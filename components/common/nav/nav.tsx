import classnames from 'classnames'
import untilStyle from '../../../styles/untils.module.scss'
import style from './nav.module.scss'
import Link from 'next/link'

interface INavItem {
  name: string
  url: string
  children?: TNavList
}
type TNavList = INavItem[]
const Nav = () => {
  const navList: TNavList = [
    {
      name: '文章',
      url: '/',
      children: [
        { name: '全部', url: '/' },
        { name: '技术', url: '/code' },
        { name: '生活', url: '/life' },
        { name: '规划', url: '/plan' },
      ],
    },
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
    <nav className={style['nav-box']}>
      {navList.map((item) => {
        return (
          <div key={item.name} className={navItemClass}>
            <Link href={item.url}>{item.name}</Link>
            {item.children && (
              <ul className={style['sub-nav']}>
                {item.children.map((child) => {
                  return (
                    <li key={child.name} className={style['sub-nav-item']}>
                      <Link href={child.url}>{child.name}</Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        )
      })}
    </nav>
  )
}

export default Nav
