import React, { RefObject } from 'react'
import ReactDOM from 'react-dom'
import MessageComponent, { IOption } from './MessageComponent '

class Msg {
  private refs =
    React.createRef<RefObject<MessageComponent> & MessageComponent>()
  static getInstance: () => unknown
  constructor() {
    if (process.browser) {
      let warp: HTMLElement | null
      warp = document.querySelector('#warp')
      if (!warp) {
        warp = document.createElement('div')
        warp.setAttribute('id', '#warp')
        warp.style.cssText = `line-height:
		1.5;text-align:
		center;
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		list-style: none;
		position: fixed;
		z-index: 100000;
		width: 100%;
		top: 0;
		left: 0;
		pointer-events: none;`
      }
      document.body.append(warp)
      ReactDOM.render(<MessageComponent ref={this.refs} />, warp)
    }
  }
  message(options: IOption) {
    this.refs.current.add(options)
  }
}

Msg.getInstance = (function () {
  let instance: (options: IOption)=> void
  return function () {
    if (!instance) {
      const context = new Msg()
      instance = context.message.bind(context)
    }
    return instance
  }
})()

// @ts-ignore
export default  Msg.getInstance() as (options: IOption)=> void
