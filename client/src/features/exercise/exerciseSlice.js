import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
const initialState = {
    list: [],
    pagination: { total: 0, totalPage: 0, currentPage: 1 }
}

export const exerciseSlice = createSlice({
    name: "exercises",
    initialState,
    reducers: {
        setExercises: (state, action) => {
            state.list = action.payload;
        },
        setPagination: (state, action) => {
            state.pagination = action.payload;
        },
    },
})

export const { setExercises, setPagination } = exerciseSlice.actions;

export const fetchData = (page = 1) => {
    return async (dispatch) => {
        try {
            let { data } = await axios({
                url: 'https://branded-things-api.vasugeramona.xyz/exercise?page=' + page,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            let { total, totalPage, currentPage } = data
            console.log(data)
            dispatch(setPagination({ total, totalPage, currentPage }))
            dispatch(setExercises(data.data))
        } catch (error) {
            console.log(error)
        }
    }
}

export default exerciseSlice.reducer