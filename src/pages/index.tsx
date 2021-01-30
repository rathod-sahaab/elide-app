import { Heading } from '@chakra-ui/core'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../components/Layout'

export default function IndexPage() {
   return (
      <Layout>
         <Helmet>
            <meta charSet="utf-8" />
            <title>Elide: Make your URLs simpler</title>
         </Helmet>
         <Heading>Home</Heading>
      </Layout>
   )
}
