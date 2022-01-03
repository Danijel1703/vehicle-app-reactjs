import '../Layout.css'
import { Turn as Hamburger } from 'hamburger-react'
import { useState } from 'react'

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  const [isOpen, setOpen] = useState(false)
  return (
        <>
        <header className='header'>
            <h1 className='header-title'>Vehicle app</h1>
        </header>
        <nav className='navbar'>
            <ul className={`navbar-content ${isOpen ? '' : 'hide'}`}>
                <li><a>Home</a></li>
                <li><a>Vehicles</a></li>
                <li><a>Contact</a></li>
                <li><a>Manufacturers</a></li>
            </ul>
            <Hamburger toggle={setOpen} toggled={isOpen} direction='left' color='white' size={45} />
        </nav>
        <main>{children}</main>
        <footer>
            Footer
        </footer>
        </>
  )
}

export default Layout
