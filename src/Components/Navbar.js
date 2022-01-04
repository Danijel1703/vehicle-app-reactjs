import { Turn as Hamburger } from 'hamburger-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import '../Navbar.css'

const Navbar = () => {
  const [isOpen, setOpen] = useState(false)

  return (
        <nav className='navbar'>
            <ul className={`navbar-content ${isOpen ? '' : 'hide'}`}>
                <NavLink to='/' activeClassName='active'><li>Home</li></NavLink>
                <NavLink to='/vehicles' activeClassName='active'><li>Vehicles</li></NavLink>
                <NavLink to='/contact' activeClassName='active'><li>Contact</li></NavLink>
                <NavLink to='/manufacturers' activeClassName='active'><li>Manufacturers</li></NavLink>
            </ul>
            <Hamburger toggle={setOpen} toggled={isOpen} direction='left' color='white' size={45} />
        </nav>
  )
}

export default Navbar
