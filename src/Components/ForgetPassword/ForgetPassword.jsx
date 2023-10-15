import React, { useState } from 'react';
import styles from './ForgetPassword.module.css';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




export default function ForgetPassword() {



let navTo=useNavigate()

let [error , setError]=useState("")

  let validationSchema = Yup.object({
    email:Yup.string().required("Email Is Required").email("Enter Vaild Email")
  })


let forgetpass = useFormik({
  initialValues:{
    email:''
  },validationSchema,
  onSubmit:handelPass
})

 async function handelPass(values)
{
    let {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,values).catch((err)=>
    {
console.log(err);
    })
    if(data.statusMsg=="success")
    {
      document.getElementById("resetForm").classList.remove('d-none')
      document.getElementById("forgetForm").classList.add('d-none')
    }
    console.log(data);
}


let validationSchema2 = Yup.object({
  resetCode:Yup.string().required("Code Is Required").matches( /^[0-9]+$/ , "Must be Numbers")
})

let resetForm =useFormik({
  initialValues:{
    resetCode:""
  },validationSchema: validationSchema2,
  onSubmit:resetCodeApi
})

async function resetCodeApi(value)
{
  let {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,value).catch((err)=>
  {
    setError(err.response.data.message)
console.log(err.response.data.message);
  })
  if(data.status=="Success")
  {
    navTo('/ResetPassword')
  }
  console.log(data);
  console.log(value);
}

  return <> 
   
<div  className='container '>

<div id='forgetForm' className='mt-4'>



<form onSubmit={forgetpass.handleSubmit} className='mt-5  '>

  <label className='mt-5 mx-auto' htmlFor="email">Enter Your  Email</label>
  <input type="email" onChange={forgetpass.handleChange} onBlur={forgetpass.handleBlur} name='email' id='email'  className='form-control w-75 '/>

    {forgetpass.touched.email?  <p className='text-danger'>{forgetpass.errors.email}</p> :''}

  <button disabled={!(forgetpass.isValid && forgetpass.dirty)} type='submit' className='btn btn-success mt-3'>Send</button>
</form>
</div>

<div  id='resetForm' className=' mt-5 d-none'>


  <form onSubmit={resetForm.handleSubmit} className=''>
  <label className='mt-5' htmlFor="resetCode">Enter Code </label>

  <input type="text" className='form-control ' onChange={resetForm.handleChange} onBlur={resetForm.handleBlur} name='resetCode' id='resetCode'/>
  {resetForm.touched.resetCode?  <p className='text-danger'>{resetForm.errors.resetCode}</p> :''}


  {error ?<div className='alert alert-danger mt-2'>{error}</div> :''}

<button type='submit' className='btn btn-success mt-3 '  disabled={!(resetForm.isValid && resetForm.dirty)}> Verify Code</button>
  </form>
</div>
</div>
  </>
}
