import React from 'react'
import banner from '../../assets/assets/images/banner-2.png'
import './Banner.css'
const Banner = () => {
    const desc = "Verify giftcard online is a leading gift card checking and validation service provider with a repuation for providing fast and accurate gift card validation service to all of its users. Just proceed to the validation page below, Upload the front and back of your giftcard and our system will automatically review its validation and activation";
  return (
    <div className="all-container">
      <div className="container-banner container">
        <div className="left">
            <img src={banner} alt="" />
        </div>
        <div className="right">
            <h2>Verify Your Gift Card Today</h2>
            <p>{desc}</p>

        </div>
    </div>
    </div>
    
  )
}

export default Banner