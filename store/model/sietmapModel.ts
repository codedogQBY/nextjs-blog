import { Model } from '@redux-model/react'
import { getallArts,getInfo,getOpt } from '../../api'
import { YearProps } from '../../components/common/year/year'
import { User, Option } from '../../type'

interface Data {
  art: YearProps[]
  fetch: boolean
  authInfo: User
  option: Option
}

class sietmapModel extends Model<Data> {
  protected initialState(): Data {
    return {
      art: [],
      fetch: false,
      authInfo: {
        name: '',
        slogan: '',
        gravatar: ''
      },
      option: {
        _id: '',
        title: '',
        sub_title:'',
        keyword: '',
        descript: '',
        url: '',
        email: '',
        icp: '',
      }
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

  SET_USER = this.action((state,data)=>{
    state.authInfo = data
  })

  SET_OPTIONS = this.action((state,data)=>{
    state.option = data
  })

  getSitemap = this.compose(async () => {
    this.FETCH_ART()
    const res = await getallArts()
    if (res && res.code === 1) this.SET_ART_SUCCESS(res.result)
    else this.SET_ART_FILE()
  })

  getInfo = this.compose(async ()=>{
    const res = await getInfo()
    if (res && res.code === 1) this.SET_USER(res.result)
  })

  getOpt = this.compose(async ()=>{
    const res = await getOpt()
    if (res && res.code === 1) this.SET_OPTIONS(res.result)
  })
}

export default new sietmapModel()
