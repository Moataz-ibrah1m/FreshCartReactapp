import React, { useContext } from 'react';
import styles from './ProductDetails.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import Slider from "react-slick";
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';

export default function ProductDetails() {


  let {addToCart} = useContext(CartContext);
  async function addProductToCart(id)
{
  let response= await addToCart(id);
  if(response.data.status=='success')
  {
    toast.success('Product successfully Added' ,{
      duration: 2500,
     
    })
  }

  else
  {
    toast.error(' Error Adding Product' ,{
      duration: 3000,
     
    })
  }
  
}

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToScroll: 1
  };


  
  let params = useParams();
  console.log(params.id);

  function getProductDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  let { data, isError, isLoading } = useQuery('productDetails', () => getProductDetails(params.id))
  console.log(data?.data.data);



  return <>
    {data?.data.data ? <div className='row py-2 align-items-center'>
    <Helmet>
      <meta name="description" content='' charSet="utf-8" />
      <title>{data?.data.data.title}</title>
     
    </Helmet>

      <div className="col-md-4">
        <div>
          {/* <img src={data?.data.data.imageCover} alt={data?.data.data.title} className='w-100' /> */}
          <Slider {...settings}>
            {data?.data.data.images.map((img) => <img alt={data?.data.data.title} src={img} className='w-100' />)}

          </Slider>
        </div>
      </div>

      <div className='col-md-8'>

        <h2 className='h5'> {data?.data.data.title}</h2>
        <p className=''>{data?.data.data.description}</p>

        <h6 className='text-main'>{data?.data.data.category.name} </h6>
        <h6 className='text-main'>Price : {data?.data.data.price} EGP </h6>
        <div className='d-flex justify-content-between'>
          <span> RatingsQuantity : {data?.data.data.ratingsQuantity} </span>
          <span> <i className='fas fa-star rating-color'></i> {data?.data.data.ratingsAverage}  </span>
        </div>
        <button  onClick={()=>addProductToCart(data?.data.data.id)}  className='btn bg-main text-white w-100 my-3 '>Add To Cart</button>
      </div>
    </div> : ''}
  </>
}
