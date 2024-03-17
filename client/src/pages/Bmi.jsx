import { useState } from "react";
import axios from 'axios'
export default function Bmi(){
    let [bmi,setBmi] = useState({})
    let [height, setHeight] = useState("")
    let [weight, setWeight] = useState("")
    const fetchBmi = async(event)=>{
        event.preventDefault()
        let {data} = await axios ({
            url:'http://localhost:3000/bmi',
            method:'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            data:{height:height,weight:weight}
        })
        setBmi(data)
        console.log(bmi)
    }
    return(
        <>
        <form onSubmit={fetchBmi}>
            <p>Height</p>
            <input type="text" name="height" value={height} onChange={(e)=>setHeight(e.target.value)}/>
            <p>Weight</p>
            <input type="text" name="weight" value={weight} onChange={(e)=>setWeight(e.target.value)}/>
            <p></p>
            <button type="submit">Calculate</button>
        </form>
        </>
    )
}