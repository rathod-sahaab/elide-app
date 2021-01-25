import { Link as GatsbyLink } from 'gatsby'
import { Box, Button } from '@chakra-ui/core'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../components/Layout'
import RegisterForm from '../components/RegisterForm'

export default function IndexPage() {
   return (
      <Layout>
         <Helmet>
            <meta charSet="utf-8" />
            <title>Elide: Make your URLs simpler</title>
         </Helmet>
         <GatsbyLink to="/register">
            <Button variantColor="teal" variant="solid">
               Register
            </Button>
         </GatsbyLink>
         {'  '}
         <GatsbyLink to="/login">
            <Button variantColor="teal" variant="solid">
               Login
            </Button>
         </GatsbyLink>
      </Layout>
   )
}
