import React from 'react'
import style from './index.module.scss'
import Line from '../../components/common/line/line'
import Head from 'next/head'
import Comment from '../../components/common/comment'
import CommentInput from '../../components/common/comment/components/comment-input'
import {User,Like,Cup,Handbag,ThinkingProblem} from '@icon-park/react'
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
        <p>
          <User className={style['icon']} size='18'/>codeDog <br/>
          <Like className={style['icon']} size='18'/>code , game and tourism <br/>
          <Cup className={style['icon']} size='18'/>Hello Word!<br/>
          <Handbag className={style['icon']} size='18'/>Student / Front End Developer<br/>
          <ThinkingProblem className={style['icon']} size='18'/>HTML、CSS、JavaScript、React、Vue、NodeJs、TypeScript...<br/>
        </p>
      </div>
      <div className={style['comment']}>
        <span className={style['title-name']}>留言</span>
        <Line className={style['line']}></Line>
      </div>
      <CommentInput post_id={0} />
      <Comment post_id={0} />
    </div>
  )
}

export default About
