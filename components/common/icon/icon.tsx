import classNames from 'classnames'
import { FC } from 'react'
const Icon: FC<{ icon: string }> = ({ icon }) => {
  const classes = classNames('iconfont', icon)
  return <i className={classes}></i>
}

export default Icon
