import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCategories = createAsyncThunk(
  '/categories/getCategories', () => {
    return fetch('category/list', {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res=>res.json())
      .then(data=>data)
  }
)

export const CategoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    loading: false

  },
  reducers: {
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: {
    [fetchCategories.pending]: state => {
      return {
        ...state,
        loading: true
      }
    },
    [fetchCategories.fulfilled]: (state,action) => {
      return {
        ...state,
        loading: false,
        categories: [action.payload]
      }
      
      
    }
  }
});

export const {increment} = CategoriesSlice.actions


export default CategoriesSlice.reducer;
