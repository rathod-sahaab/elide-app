import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Box, Button, Flex, Heading } from '@chakra-ui/core'
import { AddIcon } from '@chakra-ui/icons'
import RouteList from './RouteList'
import CreateRouteModal from './CreateRouteModal'

export default function Dashboard() {
   return (
      <>
         <Helmet>
            <meta charSet="utf-8" />
            <title> Dashboard - Elide: Make your URLs simpler</title>
         </Helmet>
         <Flex width="full" align="center" justifyContent="center">
            <Box p={8} maxWidth="1000px" width="full" textAlign="center">
               <CreateRouteModal />
               <RouteList />
            </Box>
         </Flex>
      </>
   )
}
