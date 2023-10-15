import './App.css';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'; 
import Home from './Components/Home/Home'
import Products from './Components/Products/Products'
import Cart from './Components/Cart/Cart'
import Brands from './Components/Brands/Brands'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Profile from './Components/Profile/Profile'
import Categories from './Components/Categories/Categories'
import Layout from './Components/Layout/Layout'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import NotFound from './Components/NotFound/NotFound'
import   UserContext from './Context/UserContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import CartContextProvider, { CartContext } from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import Address from './Components/address/address';
import Orders from './Components/Orders/Orders';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';



let routers = createHashRouter([
  { path: '/', element:   <Layout />, children: [
    {index:true , element: <ProtectedRoute> <Home/> </ProtectedRoute> },
    {path:'Products' , element:<ProtectedRoute> <Products/> </ProtectedRoute>},
    {path:'Cart' , element: <ProtectedRoute> <Cart/> </ProtectedRoute>},
    {path:'Categories' , element: <ProtectedRoute> <Categories/> </ProtectedRoute>},
    {path:'Brands' , element: <ProtectedRoute> <Brands/> </ProtectedRoute>},
    {path:'Profile' , element: <ProtectedRoute> <Profile/> </ProtectedRoute>},
   
    {path:'address' , element: <ProtectedRoute> <Address/> </ProtectedRoute>},
    {path:'allorders' , element: <ProtectedRoute> <Orders/> </ProtectedRoute>},
    {path:'ProductDetails/:id' , element: <ProtectedRoute> <ProductDetails/> </ProtectedRoute>},
    
    {path:'Login' , element: <Login/>},
    {path:'ForgetPassword' , element: <ForgetPassword/>},
    {path:'ResetPassword' , element: <ResetPassword/>},
    {path:'Register' , element:  <Register/> },
    {path:'*' , element:  <NotFound/> },
  ] }
])
function App() {

  return <CartContextProvider>
  <UserContext>
 <RouterProvider router={routers}></RouterProvider>
  </UserContext> 
<Toaster/>
  </CartContextProvider>

}
export default App;
