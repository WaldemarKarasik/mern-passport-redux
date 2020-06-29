import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const fetchWords = createAsyncThunk(
    '/words/getWords', () => {
        return fetch('/word/list', {
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(res=>res.json())
            .then(data=>data)
        }
)

export const fetchSingleWord = createAsyncThunk(
    'words/fetchSingleWord', (id) => {
        return fetch(`/word/${id}`, {
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(res=>res.json())
            .then(data=>data)
        }
)


export const wordsSlice = createSlice({
    name: 'words',
    initialState: {
        words: [],
        word: null,
        loading: null
    },
    reducers: {
        setWordNull: (state) => {
            state.word = null
            state.loading = null
        }
    }, 
    extraReducers: {
        // [fetchWords.pending]: state => {
        //     return {
        //         ...state,
        //         loading:true
        //     }
        // },
        // [fetchWords.fulfilled]: (state,action) => {
        //     console.log(action.payload)
        //     return {
        //         ...state,
        //         loading: false,
        //         words: [...action.payload]
        //     }
        // }
        [fetchSingleWord.pending]: (state) => {
            return {
                ...state,
                loading:true
            }
        },
        [fetchSingleWord.fulfilled]: (state,action) => {
            console.log(action.payload)
            return {
                ...state,
                loading: false,
                word: action.payload
            }
        }
    }
})

export const {setWordNull} = wordsSlice.actions

export default wordsSlice.reducer