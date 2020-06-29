import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {register} from '../features/userSlice'
import {useHistory} from 'react-router-dom'

export const Register = () => {

    const [inputValues, setInputValues] = useState()
    const dispatch = useDispatch()
    const history = useHistory()
    const handleInputChange = (e) => {
        setInputValues({...inputValues, [e.target.name]: e.target.value})
    }

    const submitForm = async (e) => {
        e.preventDefault()
        const response = await dispatch(register({username:inputValues.username, password: inputValues.password, role: 'user'}))
        if(response.payload.message.msgError) {
            alert(response.payload.message.msgBody)
        } else {
            history.push({
                pathname: '/login',
                state: inputValues
            })
        }
    }
    return (
        <div className="container-fluid">
        <form onSubmit={(e)=>submitForm(e)}>
            <div className="row pt-3 justify-content-md-center" >
                <div className="col-md-6">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input onChange={(e) => handleInputChange(e)} 
                    id="username" type="text" 
                    name="username"
                    className="form-control"/>
                    <label htmlFor="password" className="form-label mt-3">Password</label>
                    <input onChange={(e) => handleInputChange(e)} 
                    id="password" type="password"
                    name="password" 
                    className="form-control"/>
                </div>
                <div className="d-flex justify-content-center pt-3">
                    <button className="btn btn-primary" type="submit">Register</button>
                </div>
            </div>
        </form>
        </div>
    )
}