import './styles.scss'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function Container({ children }) {
  return (
    <>
      <Header />
      <div className='container'>
        {children}
      </div>
      <Footer />
    </>
  )
}