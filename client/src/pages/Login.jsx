import { useState } from "react"
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom"

export default function Login() {
    const nav = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            let { data } = await axios({
                url: 'http://localhost:3000/login',
                method: 'POST',
                data: { email: email, password: password }
            })
            localStorage.setItem('token', data.access_token)
            nav('/')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <p>Email</p>
                <input type="text" name="email" defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
                <p>Password</p>
                <input type="text" name="password" defaultValue={password} onChange={(e) => setPassword(e.target.value)} />
                <p></p>
                <button type="submit">Login</button>
            </form>
            <p>Dont have account? <Link to={'/register'}>Register</Link></p>
        </>
    )
}