import React, { useContext, useEffect } from 'react';
import styles from './Cart.module.css';
import { CartContext } from '../../Context/CartContext';
import { BallTriangle } from 'react-loader-spinner';
import { useState } from "react";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Cart() {

  let { getloggedUserCart, removeCartItem ,updateProductQuantity , setCartNums  } = useContext(CartContext);

  const [cartDetails, setCartDetails] = useState(null);

async function updateCount(id , count)
{
    let {data}= await updateProductQuantity(id,count)
    setCartDetails(data);
    
}
  async function removeItem(id) {
    let { data } = await removeCartItem(id);
    setCartDetails(data);
  }
  async function getCart() {
    let { data } = await getloggedUserCart();
   
    setCartDetails(data);
    setCartNums(data?.numOfCartItems)

  }



  useEffect(() => {
    getCart();
  }, []);


  return <>

<Helmet>
      <meta name="description" content='' charSet="utf-8" />
      <title>Cart</title>
     
    </Helmet>
    {cartDetails ?
      <div className='w-75 my-3 p-3 mx-auto bg-main-light '>

        <h3>Shopping Cart</h3>

        <h4 className='h6 text-main fw-bolder'> Cart Items : {cartDetails.numOfCartItems}</h4>
        <h4 className='h6 text-main fw-bolder mb-5'> Total Cart Items : {cartDetails.data.totalCartPrice} EGP</h4>
        {cartDetails.data.products.map((product) =>
          <div key={product.product.id} className="row px-2 py-2  border-bottom">

            <div className='col-md-2'>
              <img src={product.product.imageCover} alt={product.product.title} className='w-100' />
            </div>
            <div className='col-md-10'>

              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3 className='h6'> {product.product.title.split(' ').slice(0, 3).join(' ')} </h3>
                  <h6 className='text-main'> Price :  {product.price} </h6>
                </div>

                <div>
                  <button onClick={()=> updateCount(product.product.id , product.count +1 )} className='btn brdr-main  p-2'>+</button>
                  <span className='mx-2'>{product.count}</span>
                  <button onClick={()=> updateCount(product.product.id , product.count -1 )} className='brdr-main btn  p-2' >-</button>
                </div>
              </div>

              <button onClick={() => removeItem(product.product.id)} className='btn p-0' > <i className='text-danger font-sm fas fa-trash-can'></i> Remove</button>

            </div>
          </div>)}

          <Link to={'/address'} className='btn bg-main w-25 text-white mt-2 me-2'>Pay Now</Link>
         
      </div> : <section id='loading' className='d-flex justify-content-center align-items-center mt-5'>

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

      </section>}



  </>
}
