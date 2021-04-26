import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Box, Flex } from '@chakra-ui/react'
import RoutesLister from './RoutesLister'
import CreateRouteModal from './CreateRouteModal'
import { Route } from '../models/data/Route'
import { myRoutes } from '../services/RouteManager'

export default function Dashboard() {
   // TODO: replace with useReducer for routesData
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

   const updateRoute = (route: Route) => {
      setRoutesData((prev: Route[]) => {
         // Update value
         const index = prev.findIndex((elem) => {
            return elem.id === route.id
         })
         if (index !== -1) {
            prev.splice(index, 1, route)
         }
         return prev
      })
   }

   const removeRoute = (route: Route) => {
      setRoutesData((prev: Route[]) => {
         // Update value
         const index = prev.findIndex((elem) => {
            return elem.id === route.id
         })
         if (index !== -1) {
            prev.splice(index, 1)
         }
         return prev
      })
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
               <RoutesLister
                  routesData={routesData}
                  loading={loading}
                  updateRoute={updateRoute}
                  removeRoute={removeRoute}
               />
            </Box>
         </Flex>
      </>
   )
}
