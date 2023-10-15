import React, { useContext, useEffect, useState } from 'react';
import styles from './FeaturedProducts.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function FeaturedProducts() {
  let { addToCart } = useContext(CartContext);
  async function addProductToCart(id) {
    let response = await addToCart(id);
    if (response.data.status == 'success') {
      toast.success('Product successfully Added', {
        duration: 2500,
      })
    }
    else {
      toast.error(' Error Adding Product', {
        duration: 3000,
      })
    }
  }
  function getFeaturedProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }
  let { isLoading, isError, data, isFetching, refetch } = useQuery('featuredProducts', getFeaturedProducts, {
    // cacheTime:3000 ,
    // refetchOnMount:false ,
    //  staleTime:30000 ,
    // refetchInterval :  5000 ,
    enabled: true,
  });

  return <>
    {isLoading ? <div className='w-100 py-5 d-flex justify-content-center'>
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
      />
    </div> :

      <div className="container py-2">

        <h2>Featured Products</h2>
        <div className="row">
          {data?.data.data.map((product) => <div key={product.id} className="col-md-3">


            <div className="product cursor-pointer my-3 p-2  ">
              <Link to={`/ProductDetails/${product.id}`}>
                <img src={product.imageCover} alt={product.title} className='w-100' />
                <span className='text-main font-sm fw-bolder '>{product.category.name}</span>
                <h3 className='h5'>{product.title.split(" ").slice(0, 2).join(" ")}</h3>

                <div className='d-flex justify-content-between mt-3'>
                  <span>{product.price} EGP</span>
                  <span> <i className=' fas fa-star rating-color'></i>{product.ratingsAverage} </span>
                </div>

              </Link>
              <button onClick={() => addProductToCart(product.id)} className='btn bg-main text-white btn-sm w-100 mt-1' >Add To Cart </button>
            </div>


          </div>)}
        </div>
      </div>}




  </>
}
