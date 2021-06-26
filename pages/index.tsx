import { useState,useEffect } from 'react'
import Tags from '../components/common/tags'
import Line from '../components/common/line/line'
import Year from '../components/common/year/year'
import {sietmapModel} from '../store/model'
export default function Home() {
  const articles = sietmapModel.useData(data=>data.art)
  useEffect(()=>{
    sietmapModel.getSitemap()
  },[])
  return (
    <>
      <Tags />
      <Line />
      {articles.map((item) => {
        return (
          <Year
            key={item.year}
            year={item.year}
            monthList={item.monthList}
          ></Year>
        )
      })}
    </>
  )
}
