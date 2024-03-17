import { Link } from "react-router-dom"

export default function Pagination({pagination}){
    const { currentPage, totalPage, total } = pagination
    const pageNumber = () =>{
        let numbers = []
        for (let i = 1; i <= totalPage; i++) {
            numbers.push(<Link to={"/?page="+i}>{i}</Link>)            
        }
        return numbers
    }
    return(
        <>
            <Link to={`/?page=${currentPage>1 ? currentPage-1 : 1}`}>Previous  </Link>
            {pageNumber()}
            <Link to={`/?page=${currentPage<totalPage ? currentPage+1 : totalPage}`}>Next  </Link>
        </>
    )
}