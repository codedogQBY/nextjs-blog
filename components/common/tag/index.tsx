import { FC, ReactChildren, PropsWithChildren } from 'react'
import classNames from 'classnames'
import style from './index.module.scss'
interface ITag {
  color: string
  bgColor: string
  className?: string
  children?: ReactChildren | string
}
const Tag: FC<ITag> = (props) => {
  const { color, bgColor, children, className } = props
  return (
    <span
      style={{ color, backgroundColor: bgColor }}
      className={classNames(style['tag'], className)}
    >
      {children}
    </span>
  )
}

export default Tag
