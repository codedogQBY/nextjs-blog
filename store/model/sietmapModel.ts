import { Model } from '@redux-model/react'
import { getallArts } from '../../api'
import { YearProps } from '../../components/common/year/year'

interface Data {
  art: YearProps[]
  fetch: boolean
}

class sietmapModel extends Model<Data> {
  protected initialState(): Data {
    return {
      art: [],
      fetch: false
    }
  }
  FETCH_ART = this.action((state) => {
    state.fetch = true
  })

  SET_ART_SUCCESS = this.action((state, data: []) => {
    state.art = data
    state.fetch = false
  })

  SET_ART_FILE = this.action((state) => {
    state.art = []
    state.fetch = false
  })

  getSitemap = this.compose(async()=>{
      this.FETCH_ART()
      const res = await getallArts()
      if (res && res.code === 1) this.SET_ART_SUCCESS(res.result)
      else this.SET_ART_FILE()
  })
}

export default new sietmapModel()
