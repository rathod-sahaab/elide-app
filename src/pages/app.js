import React from 'react'
import { Router } from '@reach/router'
import Layout from '../components/Layout'
import Profile from '../components/Profile'
import Login from '../components/Login'
import Register from '../components/Register'
import Dashboard from '../components/Dashboard'
import PrivateRoute from '../components/PrivateRoute'

const App = () => (
   <Layout>
      <Router basepath="/app">
         <PrivateRoute path="/profile" component={Profile} />
         <PrivateRoute path="/dashboard" component={Dashboard} />
         <Login path="/login" />
         <Register path="/register" />
      </Router>
   </Layout>
)

export default App
