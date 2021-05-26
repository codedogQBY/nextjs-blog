import untilStyle from '../../../styles/untils.module.scss'
import style from './index.module.scss'
import classnames from 'classnames'
import Link from 'next/link'
const Tags = () => {
  const classes = classnames(style['tags'], untilStyle['clearfix'])
  return (
    <ul className={classes}>
      <Link href='/'>
        <a>
          <li className={style['tag-item']}>生活 (12) </li>
        </a>
      </Link>
      <Link href='/'>
        <li className={style['tag-item']}>javascript (22) </li>
      </Link>
      <Link href='/'>
        <li className={style['tag-item']}>leecode (5) </li>
      </Link>
      <Link href='/'>
        <li className={style['tag-item']}>javascript (22) </li>
      </Link>
      <Link href='/'>
        <li className={style['tag-item']}>leecode (5) </li>
      </Link>
      <Link href='/'>
        <li className={style['tag-item']}>javascript (22) </li>
      </Link>
      <Link href='/'>
        <li className={style['tag-item']}>leecode (5) </li>
      </Link>
    </ul>
  )
}

export default Tags
