
import axios from 'axios';
import  {createContext, useEffect, useState} from 'react'
import { act } from 'react-dom/test-utils';

 export  let CartContext=createContext(); 

 let uesrToken=localStorage.getItem('userToken')
 let headers= {
    token:uesrToken
 }



function addToCart(id)
{

   return  axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
        productId:id
    },
    {
        headers:headers
    }
    ).then((response)=>response)
    .catch((error)=>error)

}

function getloggedUserCart()
{
   return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
   { headers:headers}
    ).then((response)=>(response))
    .catch((error)=>(error))

}

    function removeCartItem(productId)
    {
       return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {headers}).then((response)=>response)
        .catch((error)=>error)
    }

    function updateProductQuantity(productId , count)
    {
      return  axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {count:count } , {headers:headers}).then((response)=>response)
        .catch((err)=>err)
    }
    function onlinePayment(cartId ,url, values)
    {
      return  axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        {
            shippingAddress:values
        } , {headers:headers})
        .then((response)=>response)
        .catch((err)=>err)
    }

export default function CartContextProvider(props)

{
   let [cartNums , setCartNums]=useState(0)
    const [cartId , setcartId] = useState(null)

   async function getCart()
    {
      let {data} =await getloggedUserCart()
      setcartId(data?.data._id);
      
    }

    useEffect (()=> {
        getCart();

    },[])

    return <CartContext.Provider value={{ cartId, addToCart,onlinePayment , getloggedUserCart , removeCartItem ,updateProductQuantity ,cartNums , setCartNums}}>

        {props.children}
    </CartContext.Provider>
}