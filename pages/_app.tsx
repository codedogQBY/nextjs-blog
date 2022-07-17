import React, { FC } from 'react'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import '../styles/global.scss'
import Head from '../components/layouts/header/header'
import Footer from '../components/layouts/footer/footer'
import Header from 'next/head'
import { ViewportProvider } from '../hooks/viewportContext'
import { Provider } from '@redux-model/react'
import { store } from '../store/store'
import { tagModel } from '../store/model'
import { linkModel } from '../store/model'
import { sietmapModel } from '../store/model'
import ToTop from '../components/common/ToTop'
import '../styles/article.scss'

// 封装随机数方法
function randomDistance(max: number, min: number) {
  var distance = Math.floor(Math.random() * (max - min + 1) + min)
  return distance
}

const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const starts = new Array(36).fill(0)
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
    来源：<a href="https://a.codedogs.top">codeDog的博客</a> <br>
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
    linkModel.getLink()
    sietmapModel.getOpt()
    window.addEventListener('copy', handleCopy)
    return () => {
      window.removeEventListener('copy', handleCopy)
    }
  }, [])
  return (
    <Provider store={store}>
      <ViewportProvider>
        <Header>
          <title>我的博客</title>
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
          ></meta>
          <meta httpEquiv='window-target' content='_top'></meta>
          <meta name="author" content="codeDog"></meta>
          <meta name="robots" content="all"></meta>
        </Header>
        <div id='stars'>
          {starts.map((item, index) => {
            return (
              <div
                key={index}
                className={'star'}
                style={{
                  top: randomDistance(500, -100) + 'px',
                  left: randomDistance(2400, 0) + 'px',
                  animationDelay: index % 6 == 0 ? '0s' : index * 0.8 + 's'
                }}
              ></div>
            )
          })}
        </div>
        <Head />
        <div className='container'>
          <Component {...pageProps} />
        </div>
        <Footer />
        <ToTop />
      </ViewportProvider>
    </Provider>
  )
}

export default App
