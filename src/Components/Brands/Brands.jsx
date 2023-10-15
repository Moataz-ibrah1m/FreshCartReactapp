import React from 'react';
import styles from './Brands.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Brands() {

   function getBrands()
    {
   return axios.get('https://ecommerce.routemisr.com/api/v1/brands');
    }
    let {isLoading , isError , data , isFetching , refetch} = useQuery ('Brands',getBrands,{
        enabled:true ,
    })
  return <>

<Helmet>
      <meta name="description" content='' charSet="utf-8" />
      <title>Brands</title>
     
    </Helmet>

 {isLoading?      <div className='w-100 py-5 d-flex justify-content-center'>
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
</div>:

 <div className="container py-2">


        <h1 className='text-center text-success fw-bolde my-5'>All Brands </h1>

      <div className="row">
      {data?.data.data.map((data)=><div key={data._id} className="col-md-3">
     
    
        <div className="product cursor-pointer my-3 p-2  ">
        <Link >  
        <img src={data.image} alt={data.slug} className='w-100' />
        <span className='text-main font-sm fw-bolder '>{data.name}</span>
          </Link>
         
        </div>
      
       
      </div>)}
      </div>
    </div>}
  </>
}
