import React from 'react';
import styles from './Categories.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';



export default function Categories() {


  function getCategories()
  {
 return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
  }
  let {isLoading , isError , data , isFetching , refetch} = useQuery ('Categories',getCategories,{
      enabled:true ,
      
  }
  )

  console.log(data?.data.data._id);

return <>


<Helmet>
      <meta name="description" content='' charSet="utf-8" />
      <title>Categories</title>
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


    <div className="row">
    {data?.data.data.map((data)=><div key={data.id} className="col-md-3">
   
  
      <div className="product cursor-pointer my-3 p-2  ">
      <Link >  
      <img src={data.image} alt={data.name} key={data.id} className='w-100' height={300} />
      <span className='text-main font-sm fw-bolder '>{data.name}</span>
        </Link>
       
      </div>
    
     
    </div>)}
    </div>
  </div>}
</>
}
