import { Link } from "react-router-dom"


export default function Card({ exercise, onDelete }) {
    const trimText = (text) => {
        if (text.length > 100) {
            return text.slice(0, 100) + '...'
        }
        return text
    }
    return (
        <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
                <h5 className="card-title">{exercise.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{exercise.difficulty}</h6>
                <p className="card-text">
                    {trimText(exercise.instructions)}
                </p>
                <Link to={`/update/${exercise.id}`}>Update</Link>
                <button onClick={()=>onDelete}>Delete</button>
            </div>
        </div>

    )
}