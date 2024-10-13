import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import image1 from '../../assets/assets/sliderimage/zelle.webp'
import image2 from '../../assets/assets/sliderimage/apple.webp'
import image3 from '../../assets/assets/sliderimage/amazon.webp'
import image4 from '../../assets/assets/sliderimage/ebay.webp'
import image5 from '../../assets/assets/sliderimage/airbnb.webp'
import image6 from '../../assets/assets/sliderimage/netflix.webp'
import image7 from '../../assets/assets/sliderimage/h.webp'
import image8 from '../../assets/assets/sliderimage/n.webp'
import image9 from '../../assets/assets/sliderimage/nike.webp'
import image10 from '../../assets/assets/sliderimage/nintendo.webp'
import image11 from '../../assets/assets/sliderimage/playstation.webp'
import image12 from '../../assets/assets/sliderimage/playstore.webp'
import image13 from '../../assets/assets/sliderimage/referee.webp'
import image14 from '../../assets/assets/sliderimage/spotify.webp'

import image16 from '../../assets/assets/sliderimage/steam.webp'
import image17 from '../../assets/assets/sliderimage/xbox.webp'
import image18 from '../../assets/assets/sliderimage/roblox.webp'
import image19 from '../../assets/assets/sliderimage/s.webp'

import './Slider.css'
const Slider = () => {
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 3
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 2
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
     
  return (
    <Carousel responsive={responsive}>
        <div className="slide-container">
            
        </div>
        <div>
            <img src={image1} className='images' />
            
        </div>
        <div>
            <img src={image2} className='images' />
            
        </div>
        <div>
            <img src={image3} className='images' />
            
        </div>
        <div>
            <img src={image4} className='images' />
            
        </div>
        <div>
            <img src={image5} className='images' />
            
        </div>
        <div>
            <img src={image6} className='images' />
            
        </div>
        <div>
            <img src={image7} className='images' />
            
        </div>
        <div>
            <img src={image8} className='images' />
            
        </div>
        <div>
            <img src={image9} className='images' />
            
        </div>
        <div>
            <img src={image10} className='images' />
            
        </div>
        <div>
            <img src={image11} className='images' />
            
        </div>
        <div>
            <img src={image12} className='images' />
            
        </div>
        <div>
            <img src={image13} className='images' />
            
        </div>
        
  </Carousel>
    
  )
};

export default Slider