import React from 'react'
import Navbar from '../components/Navbar/Navbar';
import Banner from './banner/Banner';
import Gifts from './gifts/Gifts';
import Reason from './reason/Reason';
import Slider from '../components/slider/Slider';
import Footer from './footer/Footer';
const Home = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <Gifts />
      <Reason />
      <Slider />
      <Footer />
    </>

  )
}

export default Home;