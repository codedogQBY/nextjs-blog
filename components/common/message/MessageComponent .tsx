import React, { Component } from 'react'
import style from './message.module.scss'
import classNames from 'classnames'

export interface IProp<T> {
  ref: React.RefObject<T>
}

export interface IOption {
  message: string
  type: 'error' | 'success'
  duration?: number
}

interface ILayer {
  id: number
  offset:number
  timer?: unknown
  message: string
  type: 'error' | 'success'
  duration?: number
}

export interface IState {
  id?: number
  offset:number
  messages: ILayer[]
  max?: number
}
class MessageComponent extends Component<IProp<MessageComponent>, IState> {
  constructor(props) {
    super(props)
    this.state = {
      id: 0,
      offset:0,
      messages: [],
      max: 5
    }
  }
  add = (options: IOption) => {
    let { id, messages ,offset} = this.state
    let layer: ILayer = {
      id: id++,
      offset:offset++,
      ...options
    }
    layer.timer = setTimeout(() => {
      this.remove(layer)
    },  3000)
    messages.push(layer)
    messages =  messages.map((item,index)=>{
      item.offset = index
      return item
    })
    this.setState({ id,offset, messages })
  }
  remove = (layer) => {
    clearTimeout(layer.timer)
    let messages = this.state.messages.filter((item) => item.id !== layer.id)
    messages =  messages.map((item,index)=>{
      item.offset = index
      return item
    })
    this.setState({offset:messages.length-1, messages })
  }
  render() {
    return (
      <ul>
        {this.state.messages.map((item: ILayer) => (
          <li style={{top:`${(item.offset + 1) * 30 + item.offset * 16}px`}}  key={item.id} className={classNames(style[`message`],{
            [style[`message-${item.type}`]]:item.type
          })}>
            {item.message}
          </li>
        ))}
      </ul>
    )
  }
}

export default MessageComponent
