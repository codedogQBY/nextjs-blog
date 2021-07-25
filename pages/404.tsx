import style from './404.module.scss'
import Link from 'next/link'
export default function Custom404() {
  return (
    <div className={style['box']}>
      <div className={style['buttons']}>
        <div className={style['button']}>
          <Link href='/'>
            <a>回 到 首 页</a>
          </Link>
        </div>
      </div>
    </div>
  )
}
