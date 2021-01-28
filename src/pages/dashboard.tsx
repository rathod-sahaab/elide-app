import * as React from 'react'
import Layout from '../components/Layout'
import { Helmet } from 'react-helmet'

export default function Dashboard() {
   return (
      <Layout>
         <Helmet>
            <meta charSet="utf-8" />
            <title> Dashboard - Elide: Maker your URLs simpler</title>
         </Helmet>
      </Layout>
   )
}
