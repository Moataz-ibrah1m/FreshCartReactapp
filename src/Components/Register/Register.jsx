import React, { useState } from 'react';
import styles from './Register.module.css';


import { useFormik } from 'formik';

import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {

    let navigate=useNavigate()

    const[error,seterror]=  useState(null)

    async function submitResgiter(values){
      let {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
      .catch((err)=> seterror(err.response.data.message) )
      if (data.message ==='success')
      {
       navigate('/login')
      }
   
     }



  let phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  let validateScheme=Yup.object (
    {
      name:Yup.string().min(3,'Name Minlenght is 3 ').max(16,'Name Maxlenght is 10 ').required('Name is Required'),
      email:Yup.string().email('Email is invalid').required('Email is Required '),
      phone:Yup.string().matches(phoneRegExp,'Phone is Invalid').required('Phone is Rquired'),
      password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/,'Password Start with uppercase').required('Password is Required'),
      rePassword:Yup.string().oneOf([Yup.ref('password','password and repassword does not match')] ).required('Repassword is Required')
    }
  )
   
 

  const formik=useFormik({
    initialValues:{
      name:'',
      phone:'',
      email:'',
      password:'',
      rePassword:'',
    
    },  validationSchema:validateScheme  ,onSubmit:submitResgiter
  }
  )
  return <>
   
    <div className='continer mx-auto py-5 w-75'>
      {error !==null ? <div className='alert alert-danger'>{error}</div>:''}
   

 <h2 className='mb-2'>Register Now</h2>
    <form action="" onSubmit={formik.handleSubmit}>

    <label htmlFor="name">Name :</label>
    <input className='form-control mb-2 ' type="text" name="name" id="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
    {formik.errors.name && formik.touched.name? <div className='alert mt-2 py-2 alert-danger'>{formik.errors.name}</div>:'' }
    <label htmlFor="phone">phone :</label>
    <input className='form-control mb-2' type="tel" name="phone" id="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
    {formik.errors.phone && formik.touched.phone? <div className='alert mt-2 py-2 alert-danger'>{formik.errors.phone}</div>:'' }

    <label htmlFor="email">Email :</label>
    <input className='form-control mb-2' type="text" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
    {formik.errors.email && formik.touched.email? <div className='alert mt-2 py-2 alert-danger'>{formik.errors.email}</div>:'' }

    <label htmlFor="password">Password :</label>
    <input className='form-control mb-2' type="password" name="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
    {formik.errors.password && formik.touched.password? <div className='alert mt-2 py-2 alert-danger'>{formik.errors.password}</div>:'' }

    <label htmlFor="rePassword">rePassword :</label>
    <input className='form-control mb-2' type="password" name="rePassword" id="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
    {formik.errors.rePassword && formik.touched.rePassword? <div className='alert mt-2 py-2 alert-danger'>{formik.errors.rePassword}</div>:'' }


<button disabled={!(formik.isValid && formik.dirty)} type='submit' className=' btn bg-main text-white mt-3'>Register</button>
    </form>


    </div>

  </>
}
