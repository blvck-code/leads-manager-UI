import React, {useEffect} from 'react';
import Dashboard from './components/leads/Dashboard'
import Alerts from './components/layouts/Alerts'
import Header from './components/layouts/Header'
import Register from './components/account/Register'
import Login from './components/account/Login'
import './App.css'
import './static/font-awesome-4.7.0/css/font-awesome.min.css'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import PrivateRouter from './components/common/PrivateRouter'
import { connect } from 'react-redux'
import {loadUser} from './actions/auth'


function App({loadUser}) {

  useEffect(() => {
    loadUser()
  }, [])
  
  return (
    <Router>
      <Header />
      <Alerts />
      <div className="container wrapper">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRouter exact path="/" component={Dashboard} />
        </Switch>
      </div>
    </Router>
  )
}

export default connect(null, {loadUser})(App)
