import React,{useState,useEffect} from 'react'
import CommentInput from '../../components/common/comment/components/comment-input'

const Diary = () => {
  const [visible,setVisible] = useState(false)
  const handleClick = ()=>{
    setVisible(true)
  }
  const setNewVisible = (visible)=>{
    setVisible(visible)
  }
  return <>
  <button onClick={handleClick}>日记</button>
  <CommentInput/>
  </>
}

export default Diary
