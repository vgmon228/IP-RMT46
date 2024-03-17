import { useEffect, useState } from "react"
import axios from 'axios'
import Card from "../components/Card";
import Nav from "../components/Navbar";
import { Link, useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";

export default function Home() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [exercises, setExercises] = useState([])
    const [pagination, setPagination] = useState({})
    const fetchData = async (page = 1) => {
        try {
            let { data } = await axios({
                url: 'http://localhost:3000/exercise?page=' + page,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            let { total, totalPage, currentPage } = data
            setPagination(data)
            setExercises(data.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData(searchParams.get("page"))
    }, [searchParams.get("page")])
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
            <Link className="btn d-flex justify-content-end" to={'/add'}>Add</Link>
            <div className="container d-flex gap-2 mt-2 justify-content-center flex-wrap">
                {exercises.map(exercise => {
                    return <Card key={exercise.id} exercise={exercise} onDelete={handleOnDelete} />
                })}
            </div>
            <Pagination pagination={pagination}/>
        </>
    )
}