import React from 'react';
import styles from './MainSlider.module.css';
import slider1 from '../../Assets/images/slider-image-1.jpeg'
import slider2 from '../../Assets/images/slider-image-2.jpeg'
import slider3 from '../../Assets/images/slider-image-3.jpeg'
import blog1 from '../../Assets/images/blog-img-1.jpeg'
import blog2 from '../../Assets/images/blog-img-2.jpeg'

import Slider from "react-slick";
export default function MainSlider() {


  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
  };
  return <>
   <div className='row gx-0'>
    <div className='col-md-9'>
    <Slider {...settings}>
     <img src={slider1} alt="" className='w-100' height={350} />
     <img src={slider2} alt="" className='w-100' height={350} />
     <img src={slider3} alt="" className='w-100' height={350} />
    </Slider>
    </div>
    <div className='col-md-3'>
  
    <img src={blog1} alt="" className='w-100' height={175}/>
    <img src={blog2} alt=""  className='w-100' height={175} />

    </div>
   </div>
  </>
}
