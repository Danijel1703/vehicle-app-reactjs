import { Turn as Hamburger } from 'hamburger-react'
import { useState } from 'react'
import '../Navbar.css'

const Navbar = () => {
  const [isOpen, setOpen] = useState(false)

  return (
        <nav className='navbar'>
            <ul className={`navbar-content ${isOpen ? '' : 'hide'}`}>
                <li><a>Home</a></li>
                <li><a>Vehicles</a></li>
                <li><a>Contact</a></li>
                <li><a>Manufacturers</a></li>
            </ul>
            <Hamburger toggle={setOpen} toggled={isOpen} direction='left' color='white' size={45} />
        </nav>
  )
}

export default Navbar
