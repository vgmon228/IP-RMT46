import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    list: []
}

export const exerciseSlice = createSlice({
    name: "exercises",
    initialState,
    reducers: {
        setMovies: (state, action) => {
            state.list = action.payload;
        },
    },
})

export const { setExercises } = exerciseSlice.actions;

export const fetchData = (page = 1) => {
    return async (dispatch) => {
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
}
