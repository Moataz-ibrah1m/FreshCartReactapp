import React, { useContext } from 'react';
import styles from './address.module.css';
import { useFormik } from 'formik';
import { CartContext } from '../../Context/CartContext';

export default function Address() {

  let {onlinePayment ,cartId} = useContext(CartContext)
  
  async function handelAddressSubmit(values)
  {
    let responce= await onlinePayment(cartId,'http://localhost:3000',values )
    
    window.location.href=responce?.data.session.url
  }

  let formik  = useFormik({
    initialValues:{
      details:'',
      phone:''  ,
      city:''
    },
    onSubmit:handelAddressSubmit

  })
  return <>

  <div className="container  ">

    <div className='w-75 mx-auto '>

    
    <form className='my-5' action="" onSubmit={formik.handleSubmit}>

    <label className='mt-5' htmlFor="details">Details :</label>
    <input value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className='form-control mb-2 ' name="details" id="details" />

    <label htmlFor="phone">Phone :</label>
    <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" className='form-control mb-2 ' name="phone" id="phone" />

    <label htmlFor="city">City :</label>
    <input value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className='form-control mb-2 ' name="city" id="city" />


    <button type='submit'  className='mt-1 btn bg-main text-white'> Pay Now</button>

    </form>
   
    </div>
  </div>
    
  </>
}
