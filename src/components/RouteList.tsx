import { Box, Heading, Spinner } from '@chakra-ui/core'
import {
   Table,
   Thead,
   Tbody,
   Tfoot,
   Tr,
   Th,
   Td,
   TableCaption,
   useColorModeValue,
} from '@chakra-ui/react'
import * as React from 'react'
import { Route } from '../models/data/Route'
import { myRoutes } from '../services/RouteManager'
import RouteTile from './RouteTile'

export default function RouteList({
   routesData,
   loading,
}: {
   routesData: Route[]
   loading: boolean
}) {
   return (
      <>
         {routesData.length == 0 ? (
            loading ? (
               <Box>
                  <Spinner size="lg" />
               </Box>
            ) : (
               <Heading>You don't have any links</Heading>
            )
         ) : (
            <Box
               maxWidth="1000px"
               width="full"
               borderRadius={8}
               borderWidth={1}
            >
               <Table textAlign="left" width="full" variant="simple" size="lg">
                  <Thead
                     fontWeight="semibold"
                     fontSize="sm"
                     textTransform="uppercase"
                  >
                     <Tr>
                        <Th p={4}>slug</Th>
                        <Th p={4}>link</Th>
                        <Th p={4} textAlign="right">
                           activity
                        </Th>
                     </Tr>
                  </Thead>
                  <Tbody>
                     {routesData.map((route, index) => {
                        return (
                           <RouteTile key={route.id} route={route}></RouteTile>
                        )
                     })}
                  </Tbody>
               </Table>
            </Box>
         )}
      </>
   )
}
