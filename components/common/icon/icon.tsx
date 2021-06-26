import classNames from 'classnames'
import { FC } from 'react'
const Icon: FC<{ icon: string; onClick?: () => void ,classname?:string | string[]}> = ({ icon, onClick ,classname}) => {
  const classes = classNames('iconfont', icon,classname)
  return <i onClick={onClick} className={classes}></i>
}

export default Icon
