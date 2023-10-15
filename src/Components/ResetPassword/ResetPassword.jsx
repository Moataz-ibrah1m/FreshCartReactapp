import React, { useState } from 'react';
import styles from './ResetPassword.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function ResetPassword() {

  let [error , setError]=useState("")

  let nav=useNavigate()


let validateScheme=Yup.object (
  {
  
    email:Yup.string().email('Email is invalid').required('Email is Required '),
    newPassword:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/,'Password Start with uppercase').required('Password is Required'),
  }
)


let newPass = useFormik({
  initialValues:{
    email:'' ,
    newPassword: '' ,
  },validationSchema: validateScheme,  
  onSubmit:reseNewPassword
})
 async function reseNewPassword(value)
{
  let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword` ,value).catch((err)=>
  {
    setError(err.response.data.message)
console.log(err.response.data.message);
  })
  console.log(data);
  if(data.token ){
    nav('/Login')
  }
}
  return <>

  <div className='container mt-5'>
    <div className='py-5'>

    
 <form onSubmit={newPass.handleSubmit} className='py-5'>
  <label htmlFor="email"> Email</label>
  <input type="email" onChange={newPass.handleChange} onBlur={newPass.handleBlur} name='email' id='email' className='form-control w-75' />
  {newPass.touched.email? <p className='text-danger'>{newPass.errors.email}</p>:''}

  <label htmlFor="newPassword">New Password</label>
  <input type="password" onChange={newPass.handleChange} onBlur={newPass.handleBlur} name='newPassword' id='newPassword' className='w-75 form-control' />
  {newPass.touched.email? <p className='text-danger' >{newPass.errors.newPassword}</p>:''}
  <button type='submit' className='btn btn-success mt-3'>Reset Passwrod</button>
 </form>
 </div>
  </div>
    
    
  
  </>
}
