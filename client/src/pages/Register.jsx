import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'
export default function Register() {
    let nav = useNavigate()
    let [username, setUsername] = useState("")
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await axios({
                url: 'http://localhost:3000/register',
                method: 'POST',
                data: { username: username, email: email, password: password }
            })
            nav('/login')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <p>Username</p>
                <input type="text" name="username" defaultValue={username} onChange={(e) => setUsername(e.target.value)} />
                <p>Email</p>
                <input type="text" name="email" defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
                <p>Password</p>
                <input type="text" name="password" defaultValue={password} onChange={(e) => setPassword(e.target.value)} />
                <p></p>
                <button type="submit">Register</button>
            </form>
            <p>Already have account? <Link to={'/login'}>Login</Link></p>
        </div>
    )
}