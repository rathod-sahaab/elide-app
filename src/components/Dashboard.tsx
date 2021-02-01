import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Box, Button, Flex, Heading } from '@chakra-ui/core'
import { AddIcon } from '@chakra-ui/icons'
import RouteList from './RouteList'
import CreateRouteModal from './CreateRouteModal'
import { Route } from '../models/data/Route'
import { myRoutes } from '../services/RouteManager'

export default function Dashboard() {
   const [routesData, setRoutesData] = React.useState<Route[]>([])
   const [loading, setLoading] = React.useState<boolean>(true)
   const loadData = async () => {
      const result = await myRoutes()
      if (result) {
         setRoutesData(result)
      }
      setLoading(false)
   }

   const appendRoute = (route: Route) => {
      setRoutesData((prev: Route[]) => [route, ...prev])
   }

   React.useEffect(() => {
      loadData()
      console.log('Use effect called')
   }, [])
   return (
      <>
         <Helmet>
            <meta charSet="utf-8" />
            <title> Dashboard - Elide: Make your URLs simpler</title>
         </Helmet>
         <Flex width="full" align="center" justifyContent="center">
            <Box p={8} maxWidth="1000px" width="full" textAlign="center">
               <CreateRouteModal appendRoute={appendRoute} />
               <RouteList routesData={routesData} loading={loading} />
            </Box>
         </Flex>
      </>
   )
}
