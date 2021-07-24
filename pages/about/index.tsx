import style from './index.module.scss'
import Line from '../../components/common/line/line'
import Head from 'next/head'
const About = () => {
  return (
    <div className={style['about']}>
      <Head>
        <title>关于我 | codedogs</title>
      </Head>
      <div className={style['title']}>
        <span className={style['title-name']}>关于我</span>
        <Line className={style['line']}></Line>
      </div>
      <div className={style['info-box']}>
        
      </div>
    </div>
  )
}

export default About
