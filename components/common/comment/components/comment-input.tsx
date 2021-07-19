import React, {
  FC,
  useState,
  useRef,
  useCallback,
  memo,
  useEffect
} from 'react'
import style from './index.module.scss'
import { enjoins } from '../enjoin'
import useClickOutsize from '../../../../hooks/useClickOutside'
import message from '../../message/Message'
import { commentModel } from '../../../../store/model'
import { Author } from '../../../../type'
import classnames from 'classnames'
import {GrinningFace,Pic,Link,Code} from '@icon-park/react'

const CommentInput: FC<{ post_id: number; pid?: number; resetId?:()=>void;pid_name?:string}> = ({
  resetId,
  post_id,
  pid = 0,
  pid_name
}) => {
  const [name, setUseName] = useState('')
  const [email, setUseEmail] = useState('')
  const [site, setUseSite] = useState('')
  const [userInfo, setUserInfo] = useState<Author>({ name: '' })
  const [isSetInfoFlag, setIsSetInfoFlag] = useState(true)
  const [showEnjoin, setShowEnjoin] = useState(false)
  const [showOption, setShowOption] = useState(true)
  const [commentValue, setComentValue] = useState<string>('')
  const markdown = useRef<HTMLDivElement>(null)
  const enjoinRef = useRef<HTMLUListElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(()=>{
    if(resetId){
      markdown.current.focus()
    }
  },[resetId])

  useEffect(() => {
    if (process.browser) {
      let useInfo = window.localStorage.getItem('userInfo')
      if (useInfo) {
        useInfo = JSON.parse(useInfo)
        setIsSetInfoFlag(true)
        // @ts-ignore
        setUseName(useInfo.name)
        // @ts-ignore
        setUseEmail(useInfo.email)
        // @ts-ignore
        setUseSite(useInfo.site)
        // @ts-ignore
        setUserInfo(useInfo)
      } else {
        setIsSetInfoFlag(false)
      }
    }
  }, [])

  // 信息输入框受控组件
  const handleChangeUserInfo = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      type: 'name' | 'email' | 'url'
    ) => {
      const value = e.target.value
      if (type === 'name') {
        setUseName(value)
      } else if (type === 'email') {
        setUseEmail(value)
      } else {
        setUseSite(value)
      }
    },
    []
  )

  // 设置内容
  const handleSetContent = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const value = markdown.current.innerHTML
      setComentValue(value)
    },
    [markdown]
  )

  // 追加内容
  const handleAddContent = (type: 'img' | 'link' | 'code') => {
    let value = commentValue
    if (type === 'img') {
      value += '![]()'
    } else if (type === 'link') {
      value += '[]()'
    } else if (type === 'code') {
      value += '```js\n\n```\n'
    }
    markdown.current.innerText = value
    setComentValue(value)
  }

  // 添加表情
  const addEnjoin = (index: number) => {
    let value = commentValue
    value += enjoins[index]
    markdown.current.innerHTML = value
    setComentValue(value)
  }

  // 隐藏表情框
  const handleChangeEnjoin = () => {
    setShowEnjoin(!showEnjoin)
  }
  // 设置用户信息
  const handleSetUserInfo = useCallback(() => {
    const ckeckUrl = new RegExp(
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/
    )
    const checkEmail = new RegExp(
      /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    )
    if (!name) {
      message({ type: 'error', message: '用户名不能为空' })
      return
    }
    if (!email) {
      message({ type: 'error', message: '邮箱不能为空，邮箱不公开！' })
      return
    }
    if (!checkEmail.test(email)) {
      message({ type: 'error', message: '邮箱格式不正确，请检查' })
      return
    }
    if (site && !ckeckUrl.test(site)) {
      message({ type: 'error', message: '网址格式不正确，请检查' })
      return
    }
    setUserInfo({ name, email, site })
    setIsSetInfoFlag(true)
    if (process.browser) {
      window.localStorage.setItem(
        'userInfo',
        JSON.stringify({ name, email, site })
      )
    }
  }, [name, email, site])

  // 修改用户信息
  const handleReSetUserInfo = () => {
    setIsSetInfoFlag(false)
    if (process.browser) {
      window.localStorage.removeItem('userInfo')
    }
  }
  //提交
  const handleSummit = () => {
    const lineOverflow = commentValue.split('\n').length > 36
    const lengthOverflow = commentValue.length > 1000
    if (!isSetInfoFlag) {
      message({
        type: 'error',
        message: '请设置用户信息'
      })
    } else if (!commentValue) {
      message({
        type: 'error',
        message: '请输入评论内容'
      })
    } else if (lineOverflow || lengthOverflow) {
      message({ type: 'error', message: '内容需要在1000字/36行以内' })
    } else {
      commentModel
        .postComment({
          post_id,
          pid,
          content: commentValue,
          author: userInfo
        })
        .then((res) => {
          setComentValue('')
          markdown.current && (markdown.current.innerHTML = '')
          commentModel.loadCommentsByPostId({ post_id })
          resetId && resetId()
          message({
            type: 'success',
            message:resetId ? '回复成功' :'留言成功'
          })
        })
    }
  }
  // 点击外部消失表情列表
  useClickOutsize(enjoinRef, () => {
    handleChangeEnjoin()
  })
  // // 点击外部消失朝左框
  // useClickOutsize(boxRef, () => {
  //   setShowOption(false)
  // })
  return (
    <>
      <div className={classnames(style['comment-input-box'])}>
        {!isSetInfoFlag && (
          <div className={style['user']}>
            <div className={style['user-input']}>
              <div className={style['name']}>
                <label className='require'>称呼</label>
                <input
                  type='text'
                  name='name'
                  placeholder='请输入您的称呼'
                  maxLength={10}
                  value={name}
                  autoComplete='off'
                  onChange={(e) => {
                    handleChangeUserInfo(e, 'name')
                  }}
                />
              </div>
              <div className={style['email']}>
                <label className='require'>邮箱</label>
                <input
                  type='email'
                  name='email'
                  placeholder='请输入您的邮箱'
                  maxLength={40}
                  autoComplete='off'
                  value={email}
                  onChange={(e) => {
                    handleChangeUserInfo(e, 'email')
                  }}
                />
              </div>
              <div className={style['site']}>
                <label>网站</label>
                <input
                  type='url'
                  name='url'
                  placeholder='网站（http, https:// 开头）'
                  maxLength={40}
                  autoComplete='off'
                  value={site}
                  onChange={(e) => {
                    handleChangeUserInfo(e, 'url')
                  }}
                />
              </div>
            </div>
          </div>
        )}
        <div className={style['content-box']} ref={boxRef}>
          <div className={style['user-form']}>
            {pid === 0  && <div className={style['user-info']}>
              <img
                src={`https://bing.ioliu.cn/v1/rand?key=${name}&w=40&h=40`}
                className={style['avatar']}
              />
              {!isSetInfoFlag ? (
                <button
                  onClick={() => {
                    handleSetUserInfo()
                  }}
                >
                  设 置
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleReSetUserInfo()
                  }}
                >
                  修 改
                </button>
              )}
            </div>}
            <div className={style['input-area']}>
              <div
                ref={markdown}
                className={style['markdown-editor']}
                contentEditable={true}
                placeholder={pid_name ? `回复${pid_name}` :'请说点什么吧'}
                onFocus={() => {
                  setShowOption(true)
                }}
                onKeyUp={(e) => {
                  handleSetContent(e)
                }}
              />
              {showOption && (
                <div className={style['options-box']}>
                  <div className={style['options-tool']}>
                    <div className={style['enjoin']}>
                      <span onClick={handleChangeEnjoin}>
                        <GrinningFace className={style['icon']} theme="outline" size="18" />表情
                      </span>
                      <div className={style['enjoin-box']}>
                        {showEnjoin && (
                          <ul ref={enjoinRef}>
                            {enjoins.map((item, index) => {
                              return (
                                <li
                                  onClick={() => {
                                    addEnjoin(index)
                                  }}
                                  key={item}
                                >
                                  {item}
                                </li>
                              )
                            })}
                          </ul>
                        )}
                      </div>
                    </div>
                    <span
                      className={style['img']}
                      onClick={() => {
                        handleAddContent('img')
                      }}
                    >
                      <Pic className={style['icon']} size="18"/> 图片
                    </span>
                    <span
                      className={style['link']}
                      onClick={() => {
                        handleAddContent('link')
                      }}
                    >
                      <Link className={style['icon']} size="18"/>链接
                    </span>
                    {/* <span
                      className={style['code']}
                      onClick={() => {
                        handleAddContent('code')
                      }}
                    >
                      <Code size='18' className{style['icon']}/>代码块
                    </span> */}
                  </div>
                  <div className={style['options-enter']}>
                    <button onClick={handleSummit}>评 论</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(CommentInput)
