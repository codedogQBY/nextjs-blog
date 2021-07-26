import untilStyle from '../../../styles/untils.module.scss'
import style from './index.module.scss'
import classnames from 'classnames'
import Link from 'next/link'
import { tagModel } from '../../../store/model'
const Tags = () => {
  const tags = tagModel.useData((data) => data.data.list)
  const classes = classnames(style['tags'], untilStyle['clearfix'])
  return (
    <ul className={classes}>
      {tags.map((item) => (
        <Link key={item._id} href={`/tag/${item._id}`}>
          <a>
            <li className={style['tag-item']}>{`${item.name} (${item.count})`}</li>
          </a>
        </Link>
      ))}
    </ul>
  )
}

export default Tags
