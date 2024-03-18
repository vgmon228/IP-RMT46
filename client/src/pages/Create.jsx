import { useEffect, useState } from "react"
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"

export default function Create() {
    let nav = useNavigate()
    let [name, setName] = useState("")
    let [type, setType] = useState("")
    let [muscleId, setMuscleId] = useState("")
    let [muscle, setMuscle] = useState([])
    let [equipment, setEquipment] = useState("")
    let [difficulty, setDifficulty] = useState("")
    let [instructions, setInstructions] = useState("")
    const fetchDataMuscle = async () => {
        try {
            let { data } = await axios({
                url: 'http://localhost:3000/muscle',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            })
            setMuscle(data)
        } catch (error) {
            console.log(error)
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await axios({
                url: 'http://localhost:3000/exercise',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                data: { name: name, type: type, MuscleId: muscle.muscleId, equipment: equipment, difficulty: difficulty, instructions: instructions }
            })
            nav('/')
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchDataMuscle()
    }, [])
    return (
        <div>
            <h1>Add Exercise</h1>
            <form onSubmit={handleSubmit}>
                <p>Name</p>
                <input type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)}/>
                <p>Type</p>
                <input type="text" name="type" value={type} onChange={(e)=>setType(e.target.value)}/>
                <p>Muscle</p>
                <select name="MuscleId" value={muscleId} onChange={(e) => setMuscleId(e.target.value)}>
                    {muscle.map((e) => {
                        return <option key={e.muscleId} value={e.muscleId}>{e.muscle}</option>
                    })}
                </select>
                <p>Equpiment</p>
                <input type="text" name="equipment" value={equipment} onChange={(e)=>setEquipment(e.target.value)}/>
                <p>Difficulty</p>
                <input type="text" name="difficulty" value={difficulty} onChange={(e)=>setDifficulty(e.target.value)}/>
                <p>Instructions</p>
                <input type="text" name="instructions" value={instructions} onChange={(e)=>setInstructions(e.target.value)}/>
                <p></p>
                <Link to={'/'}>Cancel</Link>
                <button type="submit">Edit</button>
            </form>
        </div>
    )
}