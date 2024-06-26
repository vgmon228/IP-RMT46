import { useEffect, useState } from "react"
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
                url: 'https://branded-things-api.vasugeramona.xyz/login',
                method: 'POST',
                data: { email: email, password: password }
            })
            localStorage.setItem('token', data.access_token)
            nav('/')
        } catch (error) {
            console.log(error)
        }
    }
    const handleCredentialResponse = async ({ credential }) => {
        const { data } = await axios.post("https://branded-things-api.vasugeramona.xyz/google-login", {
            googleToken: credential,
        });
        localStorage.setItem('token', data.access_token);
        nav('/');
    };

    useEffect(() => {
        window.onload = function () {
            google.accounts.id.initialize({
                client_id:
                    "815803836973-3qha9cn8140rl4da30p3iq9ggv6qgi05.apps.googleusercontent.com",
                callback: handleCredentialResponse,
            });
            google.accounts.id.renderButton(
                document.getElementById("buttonDiv"),
                { theme: "outline", size: "large" }
            );
        }
    }, []);
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
            <div id="buttonDiv"></div>
        </>
    )
}