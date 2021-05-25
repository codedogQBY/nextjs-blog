import { FC, ReactNode, PropsWithChildren } from 'react'
import style from './index.module.scss'
interface ITag {
  color: string
  bgColor: string
}
type TagProp = ITag & PropsWithChildren<HTMLSpanElement>
const Tag: FC<TagProp> = (props) => {
  const { color, bgColor, children } = props
  return (
    <span style={{ color, backgroundColor: bgColor }} className={style['tag']}>
      {children}
    </span>
  )
}

export default Tag
