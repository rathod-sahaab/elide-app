import * as React from 'react'
import { Helmet } from 'react-helmet'
import FormWrapper from '../components/FormWrapper'
import Layout from '../components/Layout'
import RegisterForm from '../components/RegisterForm'

export default function Register() {
   return (
      <Layout>
         <Helmet>
            <meta charSet="utf-8" />
            <title>Register - Elide: Simplify URLs</title>
         </Helmet>
         <FormWrapper>
            <RegisterForm />
         </FormWrapper>
      </Layout>
   )
}

