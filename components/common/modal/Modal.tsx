import React, { FC,  useState, useEffect } from 'react'
import style from './modal.module.scss'
import { createPortal } from 'react-dom'
import {Close} from '@icon-park/react'
interface IModal {
  title: string
  visible: boolean
  width?: string
  okText?: string
  noText?: string
  onOk?: () => void
  onCancel?: () => void
  zIndex?: number
  setNewVisible: (visible: boolean) => void
}

const Modal: FC<IModal> = (props) => {
  const {
    title,
    visible,
    width,
    zIndex,
    children,
    okText,
    noText,
    setNewVisible,
    onOk,
    onCancel
  } = props
  const [show, setShow] = useState(false)
  useEffect(() => {
    if (visible) {
      document.documentElement.style.overflow = 'hidden'
    }
    setShow(visible)
    return () => {
      document.documentElement.style.overflow = null
    }
  }, [visible])
  const handleClose = () => {
    setShow(false)
    setNewVisible(false)
  }
  return createPortal(
    <div
      style={{ zIndex: zIndex ?? 2000, display: show ? 'block' : 'none' }}
      className={style['modal-wrapper']}
    >
      <div className={style['modal-mask']} onClick={handleClose}></div>
      <div className={style['modal']}>
        <div className={style['modal-hearder']}>
          <h4 className={style['title']}>{title}</h4>
          <Close
            onClick={handleClose}
            className={style['close-btn']}
            size="18"
          />
        </div>
        <div className={style['modal-body']}>{children}</div>
        <div className={style['modal-footer']}>
          <button className={style['no-button']} onClick={onCancel}>{noText ?? '取 消'}</button>
          <button className={style['ok-button']} onClick={onOk}>{okText ?? '确 定'}</button>
        </div>
      </div>
    </div>,
    document.body
  )
}

Modal.defaultProps = {
  title: '',
  visible: false
}

export default Modal
