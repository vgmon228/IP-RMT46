import {createBrowserRouter, redirect} from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'

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
    element:<div>Hello World</div>,
    loader: () =>{
        return !localStorage.getItem('token') ? redirect('/login') : null 
    }
}
])
export default router