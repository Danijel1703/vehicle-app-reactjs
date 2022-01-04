import '../Layout.css'
import Navbar from '../Components/Navbar'
import Header from '../Components/Header'

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
        <>
        <Header />
        <Navbar />
        <main>{children}</main>
        </>
  )
}

export default Layout
