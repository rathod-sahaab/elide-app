import * as React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../components/Layout'
import RegisterForm from '../components/RegisterForm'

export default function Register() {
   return (
      <Layout>
         <Helmet>
            <meta charSet="utf-8" />
            <title>Login - Elide: Simplify URLs</title>
         </Helmet>
         <RegisterForm />
      </Layout>
   )
}