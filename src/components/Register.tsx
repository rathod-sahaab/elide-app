import * as React from 'react'
import { Helmet } from 'react-helmet'
import FormWrapper from '../components/FormWrapper'
import RegisterForm from '../components/RegisterForm'

export default function Register() {
   return (
      <>
         <Helmet>
            <meta charSet="utf-8" />
            <title>Register - Elide: Simplify URLs</title>
         </Helmet>
         <FormWrapper>
            <RegisterForm />
         </FormWrapper>
      </>
   )
}
