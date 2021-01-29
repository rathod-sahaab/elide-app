import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Heading } from '@chakra-ui/core'

export default function Dashboard() {
   return (
      <>
         <Helmet>
            <meta charSet="utf-8" />
            <title> Dashboard - Elide: Make your URLs simpler</title>
         </Helmet>
         <Heading>Dashboard</Heading>
      </>
   )
}
