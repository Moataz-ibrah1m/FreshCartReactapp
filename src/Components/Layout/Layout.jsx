import React, { useEffect,useContext } from 'react';
import styles from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
import {UserContext } from '../../Context/UserContext';
import Footer from '../Footer/Footer';
import { Offline, Online } from "react-detect-offline";


export default function Layout() {

  let {setUserToken}= useContext(UserContext);

  useEffect(()=>{
    if(localStorage.getItem('userToken')!== null)
    {
      setUserToken(localStorage.getItem('userToken'))
    }
  }, []);

  return <>
  <Navbar/>

  <div className='container mt-5'>
  <Outlet></Outlet>

  </div>

  <div>
    <Offline>
      
      <div className='nerwork'>

        <i className='fas fa-wifi'>  You are offline</i>
      </div>
      
       </Offline>
  </div>



  </>
}
