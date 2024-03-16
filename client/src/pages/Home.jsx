import { useEffect, useState } from "react"
import axios from 'axios'
import Card from "../components/Card";
import Nav from "../components/Navbar";
export default function Home() {
    const [exercises, setExercises] = useState([])
    const fetchData = async () => {
        try {
            let { data } = await axios({
                url: 'http://localhost:3000/exercise',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setExercises(data.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    const handleOnDelete = async (exerciseId) => {
        try {
            await axios({
                url: 'http://localhost:3000/exercise/' + exerciseId,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            fetchData()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Nav />
            <button>Add</button>
            <div className="container d-flex gap-2 mt-2 justify-content-center flex-wrap">
                {exercises.map(exercise => {
                    return <Card key={exercise.id} exercise={exercise} onDelete={handleOnDelete}/>
                })}
            </div>
        </>
    )
}