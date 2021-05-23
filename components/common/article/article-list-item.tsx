import { FC } from 'react'
interface IArticleListItem {
  title: string
  Introduction?: string
  date: string
  comments: number
  like: number
}
const articleListItem: FC<IArticleListItem> = () => {
  return <></>
}

export default articleListItem
