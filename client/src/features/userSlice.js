import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const register = createAsyncThunk(
    'user/register', (payload) => {
        const {username, password, role} = payload
        return fetch('/user/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          }).then(res=>res.json())
            .then(data=>data)
        }
)

export const login = createAsyncThunk(
  'user/login', (payload) => {
    return fetch('/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(res=>res.json())
      .then(data=>data)
  }
)

export const isAuth = createAsyncThunk(
  'user/isAuth', () => {
    return fetch('/user/isAuth', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res=>res.json())
      .then(data=>data)
  }
)

export const logout = createAsyncThunk(
  'user/logout', () => {
    return fetch('/user/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res=>res.json())
      .then(data=>data)
  }
)


export const userSlice = createSlice({
    name: 'user',
    initialState: {
      user: null,
      isAuthenticated: false,
      loading: null
    },
    reducers: {

    },
    extraReducers: {
        [register.fulfilled]: (state,action) => {
            
        },
        [login.fulfilled]: (state,action) => {
          console.log(action.payload)
          return {
            ...state,
            user: action.payload.user,
            isAuthenticated: action.payload.isAuthenticated
          }
        },
        [logout.fulfilled]: (state,action) => {
            return {
              ...state,
              user: null,
              isAuthenticated: false
            }
        },
        [isAuth.fulfilled]: (state,action) => {
          return {
            ...state,
            user: action.payload,
            isAuthenticated: true,
            loading: false
          }
        },
        [isAuth.rejected]: (state) => {
            return {
              ...state,
              loading: false
            }
        }
    }
})

export default userSlice.reducer