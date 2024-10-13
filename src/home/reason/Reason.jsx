import React from 'react'
import icon from '../../assets/assets/icons/fast-delivery.svg'
import icon2 from '../../assets/assets/icons/safe.svg'
import icon3 from '../../assets/assets/icons/trusted.svg'
import './Reason.css'

const Reason = () => {

  return (
    <div className="reason-container">
        <div className="first">
            <div className="top">
                <img src={icon} alt="" className='fadeInOut'/>
            </div>
            <div className="bottom">
                <p>
                    <strong>Fast Delivery</strong>
                    <br />
                    <br />
                    We understand that timing is everything, especially when it comes to gifting. That’s why Verifymygiftcard is committed to delivering your gift cards quickly and efficiently. Whether it's for a last-minute occasion or just because you don’t want to keep someone waiting, our fast delivery ensures that your gift arrives right when you need it.
                    
                </p>
            </div>
        </div>
        <div className="second">
            <div className="top">
                <img src={icon2} alt="" className='fadeInOut' />
            </div>
            <div className="bottom">
                <p>
                    <strong>Verified & Secure</strong>
                    <br />
                    <br />
                    When you use Verifymygiftcard, you can rest easy knowing that our platform is built with top-notch security. Every gift card is thoroughly verified before it reaches you, guaranteeing authenticity and peace of mind. We’ve put stringent checks in place so that you can confidently make every transaction, knowing your gift cards are legitimate and ready to be used.
                  
                </p>
            </div>
        </div>
        <div className="third">
            <div className="top">
                <img src={icon3} alt="" className='fadeInOut' />
            </div>
            <div className="bottom">
                <p>
                    <strong className='fa-bounce'>Trusted by Thousands</strong>
                    <br />
                    <br />
                  At Verifymygiftcard, trust is at the heart of everything we do. With thousands of satisfied customers and a proven track record, we take pride in offering a seamless and reliable service. Our platform is designed to ensure that every transaction is secure, transparent, and straightforward. Join our growing community of happy customers who trust us for all their gift card needs.
                </p>
            </div>
        </div>
    </div>
  )
}

export default Reason