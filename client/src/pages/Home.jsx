import { useEffect, useState } from "react"
import axios from 'axios'
import Card from "../components/Card";
import Nav from "../components/Navbar";
import { Link, useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../features/exercise/exerciseSlice";
export default function Home() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [exercises, setExercises] = useState([])
    const [pagination, setPagination] = useState({})
    const dispatch = useDispatch()
    const dataExercise = useSelector((state) => state.exercise.list)
    useEffect(() => {
        dispatch(fetchData(searchParams.get("page")))
    }, [searchParams.get("page")])
    const handleOnDelete = async (exerciseId) => {
        try {
            await axios({
                url: 'https://branded-things-api.vasugeramona.xyz/' + exerciseId,
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
            <Link className="btn d-flex justify-content-end" to={'/add'}>Add</Link>
            <div className="container d-flex gap-2 mt-2 justify-content-center flex-wrap">
                {dataExercise.map(exercise => {
                    return <Card key={exercise.id} exercise={exercise} onDelete={handleOnDelete} />
                })}
            </div>
            <Pagination pagination={pagination} />
        </>
    )
}