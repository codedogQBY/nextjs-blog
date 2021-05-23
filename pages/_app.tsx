import type { AppProps /*, AppContext */ } from 'next/app'
import '../styles/global.scss'
import '../public/iconfont/iconfont.css'
import Header from '../components/layouts/header/header'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
}
