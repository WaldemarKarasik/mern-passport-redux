import React from 'react'
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom'
import { SingleWord } from '../components/SingleWord';
import { Register } from '../components/Register';
import { Login } from '../components/Login';
import { CategoriesPage } from '../pages/CategoriesPage';
import {useDispatch} from 'react-redux'
import {logout} from '../features/userSlice'

export const useRoutes = (isAuthenticated) => {
    const dispatch = useDispatch()
    if(!isAuthenticated) {
      return (
        <Switch>
        <Route path="/" exact component={CategoriesPage}/>
        <Route path="/word/:name" component={SingleWord}/>
        <Route path="/register" exact component={Register}/>
        <Route path="/login" exact component={Login}/>
      </Switch>
      )
    }
    return (
      <Switch>
        <Route path="/" exact component={CategoriesPage}/>
        <Route path="/word/:name" component={SingleWord}/>
        <Redirect to="/" />
      </Switch>
    )
}
