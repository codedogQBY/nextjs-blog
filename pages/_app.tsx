import type { AppProps /*, AppContext */ } from 'next/app'
import { useEffect } from 'react'
import '../styles/global.scss'
import '../public/iconfont/iconfont.css'
import Head from '../components/layouts/header/header'
import Footer from '../components/layouts/footer/footer'
import Header from 'next/head'
import { Provider } from '@redux-model/react';
import { store } from '../store/store'
import { tagModel } from '../store/model' 


export default function App({ Component, pageProps }: AppProps) {
  const handleCopy = () => {
    // 获取选区部分
    const selection = window.getSelection()
    const range = selection.getRangeAt(0)
    const docFragment = range.cloneContents()
    const hiddenBox = document.createElement('div')
    hiddenBox.style.position = 'absolute'
    hiddenBox.style.left = '-99999px'
    hiddenBox.appendChild(docFragment)
    let copytext = hiddenBox.innerHTML
    // 添加版权信息后缀
    copytext += `
    <br><br>
    作者: codeDog <br>
    链接：${location.href} <br>
    来源：<a href="https://blog.codedogs.top">codeDog的博客</a> <br>
    著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。`
    // 添加隐藏的div 修改浏览器的选中内容 以供复制
    const newdiv = document.createElement('div')
    newdiv.style.position = 'absolute'
    newdiv.style.left = '-99999px'
    document.body.appendChild(newdiv)
    newdiv.innerHTML = copytext
    selection.selectAllChildren(newdiv)
    window.setTimeout(function () {
      document.body.removeChild(newdiv)
    }, 0)
  }
  // 复制添加版权
  useEffect(() => {    
    tagModel.getTag()
    window.addEventListener('copy', handleCopy)
    return () => {
      window.removeEventListener('copy', handleCopy)
    }
  }, [])
  return (
    <Provider store={store}>
      <Header>
        <title>我的博客</title>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        ></meta>
      </Header>
      <Head />
      <div className='container'>
        <Component {...pageProps} />
      </div>
      <Footer />
    </Provider>
  )
}
