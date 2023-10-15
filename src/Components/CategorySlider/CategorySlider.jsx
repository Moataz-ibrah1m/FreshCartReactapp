import React from 'react';
import styles from './CategorySlider.module.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import Categories from '../Categories/Categories';
import Slider from "react-slick";


export default function CategorySlider() {


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    autoplay:true,
    autoplaySpeed:1000,
    slidesToScroll: 1
  };

  function getCategorySlider()
  {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
   let {isLoading , isError , data} =useQuery('CategorySlider' ,getCategorySlider )
 

 
 return <>
  
    <h1 className='h3 mt-3'>Shop Popular Categories</h1>

      {data?.data.data?
      <div className='py-4'>    
      <Slider {...settings}>
        {data?.data.data.map((category)=> <img height={200} key={category._id} src={category.image} className='w-100'/>)}
      </Slider>
      </div>:''}

  </>
}
