import * as React from 'react'
import { Helmet } from 'react-helmet'
import FormWrapper from '../components/FormWrapper'
import Layout from '../components/Layout'
import LoginForm from '../components/LoginForm'

export default function Login() {
   return (
      <Layout>
         <Helmet>
            <meta charSet="utf-8" />
            <title>Login - Elide: Simplify URLs</title>
         </Helmet>
         <FormWrapper>
            <LoginForm />
         </FormWrapper>
      </Layout>
   )
}

