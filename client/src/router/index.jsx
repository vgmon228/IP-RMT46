import {createBrowserRouter, redirect} from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'


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
}
])
export default router