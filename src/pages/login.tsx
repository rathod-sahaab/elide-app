import * as React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../components/Layout'
import LoginForm from '../components/LoginForm'

export default function Login() {
   return (
      <Layout>
         <Helmet>
            <meta charSet="utf-8" />
            <title>Register - Elide: Simplify URLs</title>
         </Helmet>
         <LoginForm />
      </Layout>
   )
}