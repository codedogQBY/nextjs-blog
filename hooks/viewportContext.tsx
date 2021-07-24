import React, { createContext, useState, useEffect, useContext } from 'react'

//  响应式原理

const viewportContext = createContext<{ width?: number; height?: number }>({})

const ViewportProvider = ({ children }) => {
  // 顺带监听下高度，备用
  const [width, setWidth] = useState<number>(process.browser && window.innerWidth)
  const [height, setHeight] = useState<number>(process.browser &&  window.innerWidth)

  const handleWindowResize = () => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }

  useEffect(() => {
    if (process.browser) {
      window.addEventListener('resize', handleWindowResize)
    }
    return () => {
      if (process.browser) {
        window.removeEventListener('resize', handleWindowResize)
      }
    }
  }, [])

  return (
    <viewportContext.Provider value={{ width, height }}>
      {children}
    </viewportContext.Provider>
  )
}

const useViewport = () => {
  const { width, height } = useContext(viewportContext)
  return { width, height }
}

export { useViewport, ViewportProvider }
