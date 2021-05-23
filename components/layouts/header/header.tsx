import style from './/header.module.scss'
import Nav from '../../common/nav/nav'
import Line from '../../common/line/line'
import Icon from '../../common/icon/icon'
const Header = () => {
  return (
    <>
      <header className={style['header']}>
        <div className={style['header-left']}>
          <Nav />
        </div>
        <div className={style['header-right']}>
          <Icon icon='icon-RectangleCopy2' />
        </div>
      </header>
      <Line width='100%' height={1} scale={0.5} color='#282c35' />
    </>
  )
}

export default Header
