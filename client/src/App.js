import React, { useEffect, useState, useCallback } from 'react';

import { useRoutes } from './app/routes';
import store from './app/store';
import { Provider } from 'react-redux';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import { SingleWord } from './components/SingleWord';
import { Register } from './components/Register';
import { Login } from './components/Login';
import { CategoriesPage } from './pages/CategoriesPage';
import { isAuth } from './features/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { Navigation } from './components/Navbar';
import { Container } from 'reactstrap';


 
export function App() {
  const isAuthenticated = useSelector(state=>state.user.isAuthenticated)
  const loading = useSelector(state=>state.user.loading)
  const routes = useRoutes(isAuthenticated)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(isAuth())
  },[])
  if (loading === false) {
  return (
    // <Provider store={store}>
    
    <BrowserRouter>
      <Navigation />
      <Container fluid className="vh-100">
        {routes}
      </Container>
      </BrowserRouter>
    // </Provider>

  )
  } else {
    return <Container fluid><div>Loading</div></Container>
  }
}

export default App;
