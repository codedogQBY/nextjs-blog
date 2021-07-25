import React, { useState, memo, useCallback } from 'react'
import style from './index.module.scss'
import { linkModel } from '../../store/model'
import Modal from '../../components/common/modal'
import message from '../../components/common/message/Message'
import { Link } from '../../type'
import Head from 'next/head'
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
    const ckeckUrl = new RegExp(
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/
    )
    const checkEmail = new RegExp(
      /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    )
    if (!formData.gravatar) {
      message({
        type: 'error',
        message: '头像地址不应为空'
      })
      return false
    }
    if (!ckeckUrl.test(formData.gravatar)) {
      message({
        type: 'error',
        message: '请输入正确的头像链接格式'
      })
      return false
    }
    if (!formData.name) {
      message({
        type: 'error',
        message: '网站名称不应为空'
      })
      return false
    }
    if (!formData.email) {
      message({
        type: 'error',
        message: '邮箱不应为空'
      })
      return false
    }
    if (!checkEmail.test(formData.email)) {
      message({
        type: 'error',
        message: '请输入正确的邮箱格式'
      })
      return false
    }
    if (!formData.url) {
      message({
        type: 'error',
        message: '网站地址不应为空'
      })
      return false
    }
    if (!ckeckUrl.test(formData.url)) {
      message({
        type: 'error',
        message: '请输入正确的网站链接格式'
      })
      return false
    }
    linkModel.postLink(formData).then((res) => {
      setVisible(false)
    })
  }, [formData])
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
      <Head>
        <title>朋友 | codedogs</title>
      </Head>
      <div>
        <div className={style['instructions']}>
          <div className={style['link']}>
            <div className={style['link-box']}>
              <button className={style['add-link']} onClick={handleClick}>
                申请友链
              </button>
            </div>
          </div>
          <div className={style['text']}>
            <h3>友链申请须知：</h3>
            <p>
              1、优先通过https协议的网站
              <br />
              2、为了避免麻烦，本站会优先通过先添加本站的网站。
              <br />
              3、一经发现网站存在色情，反动，诱导等违规内容将立即下架
              <br />
              4、按照表单要求填写必填项，申请后管理员尽快审核，通过后会在第一时间给您发邮件提醒
              <br />
            </p>
            <h4>本站信息：</h4>
            <p>
              名称：codeDogs
              <br />
              描述：探索前端星空
              <br />
              网址：https://blog.codedogs.top
              <br />
              头像：https://img.codedogs.top/img.png
              <br />
            </p>
          </div>
        </div>
      </div>
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
