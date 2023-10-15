import React from 'react';
import styles from './NotFound.module.css';
import notFound from '../../Assets/images/error.svg'


export default function NotFound() {


  return <>

  <div className="continer">
    <div className="row my-5">
      <div >

        <h1 className='text-success text-center my-4 fw-bolder'>Page NotFound</h1>
        <img src={notFound} alt=""  className='w-75 text-center'/>
      </div>
    </div>
  </div>


  </>
}
