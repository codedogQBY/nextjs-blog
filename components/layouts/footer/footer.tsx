import Line from '../../common/line/line'
import style from './footer.module.scss'
const Footer = () => {
  return (
    <footer>
      <Line height={1} color='#696969'></Line>
      <section className={style['footer-box']}>
        <p className={style['footer-content']}>
         <span className={style['copy']}> ©粤ICP备20050365号</span><span className={style['point']}></span>{' '}
          {new Date().getUTCFullYear()}
          <span className={style['point']}></span>
          <a target='_brank' href='https://github.com/codedogQBY'>
            GitHub
          </a>
          <span className={style['point']}></span>
          <a target='_brank' href='https://viki.codedogs.top'>
            viki-ui
          </a>
        </p>
      </section>
    </footer>
  )
}
export default Footer
