import React, { useState } from 'react'
import './Navbar.css'
import logo from '../../assets/assets/images/logo.png'
import { Link } from 'react-router-dom'
const Navbar = () => {
  const [dropDown, setDropDown] = useState(false);
  return (
    <nav>
      <div className="shadow">
        <div className="nav-container container">
          <div className="logo">
            <img src={logo}/>
          </div>

          <ul>
            <li className='home-link'><Link to='/'>Home</Link></li>
            <li className='hover-links'><Link to='/verify'>Gift Cards</Link></li>
            <li className='hover-links'><Link to='/verify'>Products</Link></li>
            <Link to='/verify'><li className='get-started'>Verify now</li></Link>
          </ul>
          <div className="hamburger" onClick={()=>{setDropDown(!dropDown)
          }}>
          <i class="fa-solid fa-bars fa-2x"></i>
          </div>
        </div>
        
      </div>

      {/* DropDown  */}
      {dropDown && (
          <div className="dropdown">
            <div className='dropdown-menu'>
            <Link to='/'><li>Home</li> </Link>
            <Link to='/verify'><li>Gift Cards</li> </Link>
            <Link to='/verify'> <li>Products</li></Link>
            <Link to='/verify'><li>Explore</li> </Link>
            </div>
            
          </div>
        )}
    </nav>
  )
}

export default Navbar