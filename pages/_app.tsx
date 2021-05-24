import type { AppProps /*, AppContext */ } from 'next/app'
import '../styles/global.scss'
import '../public/iconfont/iconfont.css'
import Header from '../components/layouts/header/header'
import Footer from '../components/layouts/footer/footer'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <div className='container'>
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  )
}
