import React from 'react'
import giftImage from '../../assets/assets/images/gifts.png'
import './Gifts.css'
const Gifts = () => {
    const title = <h2>Why choose to Gift?</h2>
    const desc = "Gifting is more than just a tradition—it’s a heartfelt way to express love, appreciation, and connection. Whether it's for a special occasion or simply a random act of kindness, the right gift speaks volumes. It’s a chance to share joy, create lasting memories, and strengthen relationships. By choosing to gift, you're not just handing over an item, you're giving someone a moment of happiness, a reminder that they matter, and a token of thoughtfulness that leaves a lasting impression. So, why gift? Because every gesture, no matter how small, has the power to make someone’s day extraordinary."
  return (
    <div className="gift-all-container">
        <div className="gifts-container container">
        <div className="gift-left">
            <img src={giftImage} />
        </div>
        <div className="gift-right">
            {title}
            <p>{desc}</p>
        </div>
    </div>
    </div>
    
  )
}

export default Gifts