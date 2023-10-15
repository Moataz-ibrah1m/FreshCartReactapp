import React, { useContext, useState } from 'react';
import styles from './Login.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';



export default function Login() {

    let {setUserToken , setUserData} =useContext(UserContext);


    let navigate=useNavigate()

    const[error,seterror]=  useState(null)

    async function submitLogin(values){
      let {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
      .catch((err)=> seterror(err.response.data.message) )
      if (data.message ==='success')
      {

        localStorage.setItem('userToken' , data.token)
        setUserToken(data.token)
        setUserData(data.user)
       navigate('/')
      }
   
     }
  let validateScheme=Yup.object (
    {
    
      email:Yup.string().email('Email is invalid').required('Email is Required '),
      password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/,'Password Start with uppercase').required('Password is Required'),
    }
  )
   
 

  const formik=useFormik({
    initialValues:{
     
      email:'',
      password:'',
     
    
    },  
    validationSchema:validateScheme  ,
    onSubmit:submitLogin
  }
  )
  return <>
   
    <div className='continer mx-auto py-5 w-75'>
      {error !==null ? <div className='alert alert-danger'>{error}</div>:''}
   

 <h2 className='mb-2'>Login Now</h2>
    <form action="" onSubmit={formik.handleSubmit}>


   

    <label htmlFor="email">Email :</label>
    <input className='form-control mb-2' type="text" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
    {formik.errors.email && formik.touched.email? <div className='alert mt-2 py-2 alert-danger'>{formik.errors.email}</div>:'' }

    <label htmlFor="password">Password :</label>
    <input className='form-control mb-2' type="password" name="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
    {formik.errors.password && formik.touched.password? <div className='alert mt-2 py-2 alert-danger'>{formik.errors.password}</div>:'' }

    <Link to='/ForgetPassword' > Forget Password  </Link>



<button disabled={!(formik.isValid && formik.dirty)} type='submit' className=' btn bg-main text-white mt-3 d-flex'>Login</button>
    </form>


    </div>

  </>
}
