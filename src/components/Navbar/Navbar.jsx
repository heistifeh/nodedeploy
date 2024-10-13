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
            <li className='get-started'><Link to='/verify'>Verify now</Link></li>
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
              <li><Link to='/verify'>Gift Cards</Link></li>
              <li><Link to='/verify'>Products</Link></li>
              <li><Link to='/verify'>Explore</Link></li>
            </div>
            
          </div>
        )}
    </nav>
  )
}

export default Navbar