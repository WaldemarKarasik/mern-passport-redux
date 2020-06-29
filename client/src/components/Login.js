import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {login} from '../features/userSlice'
import {Button} from 'reactstrap'

export const Login = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [username, setUsername] = useState(history.location.state ? history.location.state.username : '')
    const [password, setPassword] = useState(history.location.state ? history.location.state.password : '')
    const onChangeUsernameHandler = (e) => {
        setUsername(e.target.value)
    }
    const onChangePasswordHandler = (e) => {
        setPassword(e.target.value)
    }
    const submitFormHandler = async (e) => {
        e.preventDefault()
        const response = await dispatch(login({username, password}))
        history.push('/')
    }
    return (
        <div className="container-fluid">
        <form onSubmit={(e)=>submitFormHandler(e)}>
            <div className="row pt-3 justify-content-md-center" >
                <div className="col-md-6">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                    value={username}
                    onChange={(e) => onChangeUsernameHandler(e)}
                    id="username" type="text" 
                    name="username"
                    className="form-control"/>
                    <label htmlFor="password" className="form-label mt-3">Password</label>
                    <input
                    value={password}
                    onChange={(e)=>onChangePasswordHandler(e)}
                    id="password" type="password"
                    name="password" 
                    className="form-control"/>
                </div>
                <div className="d-flex justify-content-center pt-3">
                    <Button color="success" type="submit">Login</Button>
                </div>
            </div>
        </form>
        </div>
    )
}