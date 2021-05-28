import { useState } from 'react'
import Tags from '../components/common/tags'
import Line from '../components/common/line/line'
import Year from '../components/common/year/year'
import allArtcles from '../api/allArtcles.json'
import { YearProps } from '../components/common/year/year'
export default function Home() {
  const artclesInfo = JSON.parse(JSON.stringify(allArtcles))
  const artcles = artclesInfo?.result as YearProps[]
  return (
    <>
      <Tags />
      <Line />
      {artcles.map((item) => {
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
