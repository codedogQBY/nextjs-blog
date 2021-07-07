import React, { useState, memo, useCallback } from 'react'
import style from './index.module.scss'
import { linkModel } from '../../store/model'
import Modal from '../../components/common/modal'
import message from '../../components/common/message/Message'
import {Link} from '../../type'
const Friend = memo(() => {
  const [visible, setVisible] = useState(false)
  const [formData, setFormData] = useState<Link>({
    gravatar: '',
    name: '',
    url: '',
    slogan: '',
    email: ''
  })
  const list = linkModel.useData((data) => data.data.list)
  const handleClick = () => {
    setVisible(true)
  }
  const setNewVisible = (visible: boolean) => {
    setVisible(visible)
  }
  const handleOk = useCallback(() => {
    const ckeckUrl  =  new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/)
    const checkEmail = new RegExp(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/)
    if(!formData.gravatar){
      message({
        type:'error',
        message:'头像地址不应为空'
      })
      return false
    }
    if(!ckeckUrl.test(formData.gravatar)){
      message({
        type:'error',
        message:'请输入正确的头像链接格式'
      })
      return false
    }
    if(!formData.name){
      message({
        type:'error',
        message:'网站名称不应为空'
      })
      return false
    }
    if(!formData.email){
      message({
        type:'error',
        message:'邮箱不应为空'
      })
      return false
    }
    if(!checkEmail.test(formData.email)){
      message({
        type:'error',
        message:'请输入正确的邮箱格式'
      })
      return false
    }
    if(!formData.url){
      message({
        type:'error',
        message:'网站地址不应为空'
      })
      return false
    }
    if(!ckeckUrl.test(formData.url)){
      message({
        type:'error',
        message:'请输入正确的网站链接格式'
      })
      return false
    }
    linkModel.postLink(formData).then(res=>{
      setVisible(false)
    })
  },[formData])
  const handleCancel = () => {
    setVisible(false)
  }
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) => {
    const newData = { ...formData, ...{ [key]: e.target.value } }
    setFormData(newData)
  }
  return (
    <div className={style['friends-box']}>
      <button className={style['add-link']} onClick={handleClick}>
        申请友链
      </button>
      <h1 className={style['title']}>My friends</h1>
      <div className={style['links']}>
        <ul>
          {list.map((item) => {
            return (
              <li key={item._id}>
                <a target='_blank' href={item.url}>
                  <img src={item.gravatar}></img>
                  <h4>{item.name}</h4>
                  <p>{item.slogan}</p>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
      <Modal
        width='50%'
        setNewVisible={setNewVisible}
        title='申请友链'
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form className='friend-form'>
          <div className='form-item'>
            <label className='require'>头像</label>
            <input
              value={formData.gravatar}
              placeholder='请输入头像地址'
              onChange={(e) => {
                handleChange(e, 'gravatar')
              }}
            ></input>
          </div>
          <div className='form-item'>
            <label className='require'>名称</label>
            <input
              value={formData.name}
              maxLength={20}
              onChange={(e) => {
                handleChange(e, 'name')
              }}
              placeholder='该怎么称呼您的网站,请控制在20字以内'
            ></input>
          </div>
          <div className='form-item'>
            <label className='require'>邮箱</label>
            <input
              value={formData.email}
              onChange={(e) => {
                handleChange(e, 'email')
              }}
              placeholder='请输入邮箱地址，只用于通知，不会公开'
            ></input>
          </div>
          <div className='form-item'>
            <label className='require'>链接</label>
            <textarea
              maxLength={200}
              placeholder='请输入网址链接,限制200个字符'
              rows={5}
              value={formData.url}
              onChange={(e) => {
                handleChange(e, 'url')
              }}
            ></textarea>
          </div>
          <div className='form-item'>
            <label>描述</label>{' '}
            <textarea
              maxLength={200}
              placeholder='描述一下您的网站吧，限制200个字'
              rows={5}
              value={formData.slogan}
              onChange={(e) => {
                handleChange(e, 'slogan')
              }}
            ></textarea>
          </div>
        </form>
      </Modal>
    </div>
  )
})

export default Friend
