import React from 'react'
import './Footer.css'
import logo from '../../assets/assets/images/logo.png'
import { Link } from 'react-router-dom'
const Footer = () => {
  const link = "/verify"
  return (
    <div className="footer">
      <div class="footer-container container ">
            <div class="footer-image">
                <img src={logo} alt="modal-logo"/>
            </div>
            <div class="footer-products">
                <span><Link to={link}>Products</Link></span>
                <span><Link to={link}>Web3Modal</Link></span>
                <span><Link to={link}>Web3Inbox</Link></span>
                <span><Link to={link}>Web#Walet</Link></span>
            </div>
            <div class="footer-resources">
                <span><Link to={link}>Resources</Link></span>
                <span><Link to={link}>Docs</Link></span>
                <span><Link to={link}>ModalConnect Cloud</Link></span>
                <span><Link to={link}>Github</Link></span>
                <span><Link to={link}>Status</Link></span>
                <span><Link to={link}>Explore</Link></span>
                <span><Link to={link}>Explore Guideline</Link></span>
                <span><Link to={link}>FAQ</Link></span>
            </div>
            <div class="footer-company">
                <span><Link to={link}>Company</Link></span>
                <span><Link to={link}>About Us</Link></span>
                <span><Link to={link}>Blog</Link></span>
                <span><Link to={link}>Newsroom</Link></span>
                <span><Link to={link}>Jobs</Link></span>
            </div>
            <div class="footer-connect">
                <span><Link to={link}>Conect</Link></span>
                <span><Link to={link}>Twitter</Link></span>
                <span><Link to={link}>Linkedln</Link></span>
                <span><Link to={link}>Youtube</Link></span>
                <span><Link to={link}>Discord</Link></span>
                <span><Link to={link}>Telegram</Link></span>
                <span><Link to={link}>Get in touch</Link></span>
            </div>
        </div>
        <div class="footer-copyright container">
            <span  className='copyright'>© 2024 Verifymygiftcard, Inc.</span>
        </div>
    </div>
  )
}

export default Footer

