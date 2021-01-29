import { navigate } from 'gatsby'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import FormWrapper from '../components/FormWrapper'
import LoginForm from '../components/LoginForm'
import { isLoggedIn } from '../services/auth'

export default function Login() {
   if (isLoggedIn()) {
      // unnecessary
      navigate('/app/dashboard')
      return null
   }
   return (
      <>
         <Helmet>
            <meta charSet="utf-8" />
            <title>Login - Elide: Simplify URLs</title>
         </Helmet>
         <FormWrapper>
            <LoginForm />
         </FormWrapper>
      </>
   )
}
