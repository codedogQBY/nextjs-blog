import style from './loading.module.scss'
const Loading = () => {
  return (
    <div className={style['stage']}>
      <div className={style['dot-floating']}></div>
    </div>
  )
}

export default Loading
