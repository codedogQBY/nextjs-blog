import { Model } from '@redux-model/react'
import { getTag } from '../../api'
import { Pagination, Tag } from '../../type'

//_id: string
// 标签名称
// name: string
// num_tutorial: number

interface Data {
  data: {
    pagination: Pagination
    list: Tag[]
  }
}

class TagModel extends Model<Data> {
  protected initialState(): Data {
    return {
      data: { pagination: {}, list: [] }
    }
  }
  SET_TAG = this.action((state, data) => {
    data.list = data.list.filter((item) => item.count !== 0)
    state.data = data
  })

  getTag = this.compose(async () => {
    const res = await getTag({ page_size: 100 })
    this.SET_TAG(res.result || { pagination: {}, list: [] })
  })
}

export default new TagModel()
