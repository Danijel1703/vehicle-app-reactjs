import Navbar from '../Components/Navbar'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import '../Layout.css'

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
        <div className='layout'>
          <Header />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
  )
}

export default Layout
