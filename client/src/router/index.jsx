import {createBrowserRouter, redirect} from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'
import Create from '../pages/Create'
import Bmi from '../pages/Bmi'
import Update from '../pages/Update'


const router = createBrowserRouter([
{
    path:'/register',
    element:<Register/>,
    loader: () =>{
        return localStorage.getItem('token') ? redirect('/') : null 
    }
},
{
    path:'/login',
    element:<Login/>,
    loader: () =>{
        return localStorage.getItem('token') ? redirect('/') : null 
    }
},
{
    path:'/',
    element:<Home/>,
    loader: () =>{
        return !localStorage.getItem('token') ? redirect('/login') : null 
    }
},
{
    path:'/add',
    element:<Create/>,
    loader: () =>{
        return !localStorage.getItem('token') ? redirect('/login') : null 
    }
},
{
    path:'/bmi',
    element:<Bmi/>,
    loader: () =>{
        return !localStorage.getItem('token') ? redirect('/login') : null 
    }
},
{
    path:'/update/:id',
    element:<Update/>,
    loader: () =>{
        return !localStorage.getItem('token') ? redirect('/login') : null 
    }
}
])
export default router