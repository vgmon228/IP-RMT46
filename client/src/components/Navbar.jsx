import { Link, useNavigate } from "react-router-dom"

export default function Nav() {
    let nav = useNavigate()
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <Link className='btn' to={'/'}>Home</Link>
            <Link className="btn" to={'/bmi'}>BMI Calculator </Link>
            <button className="justify-content-end" onClick={()=>{
                localStorage.removeItem('token')
                nav('/login')
            }}>
                Logout
            </button>
        </nav>

    )
}