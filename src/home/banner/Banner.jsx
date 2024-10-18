import React from 'react'
import './Banner.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import productData from '../../products.json'
import icon from '../../assets/assets/banneranimation/parallax-layer-1.png'
import icon2 from '../../assets/assets/banneranimation/parallax-layer-2.png'
import icon3 from '../../assets/assets/banneranimation/parallax-layer-3.png'
import icon4 from '../../assets/assets/banneranimation/parallax-layer-4.png'

const Banner = () => {
    const title = <h2>Verify gift cards online <span>instantly</span></h2>
    const desc = 'search our database for over thousands of cards to verify';
    const [searchInput, setSearchInput] = useState("");
    const [filteredProducts, setFilteredProducts] = useState("");

    // search functionality
    const handleSearch = e => {
        const searchTerm = e.target.value;
        setSearchInput(searchTerm)

        //filtering products based on search
        const filtered =  productData.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));

        setFilteredProducts(filtered);
    }
  return (
    <div className="banner">
      <div className="banner-container">
        <div>
          {title}
        </div>
        <div className="layers">
          <Link to={'/verify'}><img src={icon} className='layer1' /></Link>
          <Link to={'/verify'} ><img src={icon2} className='layer1' /></Link>
          <Link to={'/verify'}><img src={icon3} className='layer2' /></Link>
          <Link to={'/verify'}><img src={icon4} className='layer2' /></Link>
        </div>
      </div>
      {/* form container */}
        <div className="form-container">
          <form>
            <input type="text" name='search' placeholder='search your product' id='search' value={searchInput} onChange={handleSearch}/>
          </form>
          <p>{desc}</p>
          <Link to={'/verify'} className='click-verify'>
              Verify now
          </Link>
          
          <ul className="lab-ul">
            {
              searchInput && filteredProducts.map((product, i) => 
              <li key={i}>
                <Link to={`/verify`}>
                  {product.name}
                </Link>
              </li>)
            }
          </ul>
        </div>
        <div className='media-button'>
          <Link to={'/verify'} className='click-verify'>
                Verify now
          </Link>
        </div>
        
    </div>
      
    
  )
}

export default Banner