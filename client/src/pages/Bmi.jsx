import { useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";

export default function Bmi() {
    let [bmi, setBmi] = useState({})
    let [height, setHeight] = useState("")
    let [weight, setWeight] = useState("")
    const fetchBmi = async (event) => {
        event.preventDefault()
        let { data } = await axios({
            url: 'https://branded-things-api.vasugeramona.xyz/bmi',
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            data: { height: height, weight: weight }
        })
        setBmi(data)
        console.log(bmi)
    }
    return (
        <>
            <h1>BMI Calculator</h1>
            <form onSubmit={fetchBmi}>
                <p>Height</p>
                <input type="text" name="height" value={height} onChange={(e) => setHeight(e.target.value)} />
                <p>Weight</p>
                <input type="text" name="weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
                <p></p>
                <Link to={'/'}>Cancel</Link>
                <button type="submit">Calculate</button>
            </form>
            <p></p>
            <h3 style={bmi !== '{}' ? null : { display: 'none' }}>Your BMI is {bmi.bmi}, You are {bmi.status}</h3>
        </>
    )
}