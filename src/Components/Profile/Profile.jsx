import React, { useContext, useEffect } from 'react';
import styles from './Profile.module.css';
import jwtDecode from 'jwt-decode';
import { UserContext } from '../../Context/UserContext';
import { Helmet } from 'react-helmet';

export default function Profile() {


    let{userData}= useContext(UserContext)
    

    useEffect (()=> {

      let encodedToken=  localStorage.getItem('userToken');
      let decodedToken = jwtDecode(encodedToken)
    },[])

  return <>
  <Helmet>
      <meta name="description" content='' charSet="utf-8" />
      <title>Your Profile</title>
     
    </Helmet>

      <div className='container'>
        <div className="row my-5">
          <div className='my-5 bg-light text-success'>
          <h1>Hello :{userData?.name}</h1>
          <h1>Email :{userData?.email}</h1>
          </div>
        </div>
      </div>

   
  </>
}
