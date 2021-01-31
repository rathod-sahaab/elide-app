import { Box, Heading } from '@chakra-ui/core'
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
import RouteTile from './RouteTile'

export default function RouteList() {
   const [routesData, setRoutesData] = React.useState([
      {
         id: '1',
         slug: 'iste-room',
         target: 'istenith.com',
         active: false,
      },
      {
         id: '2',
         slug: 'iste-room',
         target: 'istenith.com',
         active: false,
      },
      {
         id: '1',
         slug: 'iste-room',
         target: 'istenith.com',
         active: true,
      },
      {
         id: '2',
         slug: 'iste-room',
         target: 'istenith.com',
         active: false,
      },
      {
         id: '1',
         slug: 'iste-room',
         target: 'istenith.com',
         active: true,
      },
      {
         id: '2',
         slug: 'iste-room',
         target: 'istenith.com',
         active: true,
      },
      {
         id: '1',
         slug: 'iste-room',
         target: 'istenith.com',
         active: false,
      },
      {
         id: '2',
         slug: 'iste-room',
         target: 'istenith.com',
         active: false,
      },
      {
         id: '1',
         slug: 'iste-room',
         target: 'istenith.com',
         active: true,
      },
      {
         id: '2',
         slug: 'iste-room',
         target: 'istenith.com',
         active: false,
      },
      {
         id: '1',
         slug: 'iste-room',
         target: 'istenith.com',
         active: true,
      },
      {
         id: '2',
         slug: 'iste-room',
         target: 'istenith.com',
         active: true,
      },
   ])
   return (
      <Box maxWidth="1000px" width="full" borderRadius={8} borderWidth={1}>
         {routesData.length == 0 ? (
            <Heading>You don't have any links</Heading>
         ) : (
            <Table
               textAlign="left"
               width="full"
               variant="simple"
               size="lg"
            >
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
                  {routesData.map((route) => {
                     return <RouteTile route={route}></RouteTile>
                  })}
               </Tbody>
            </Table>
         )}
      </Box>
   )
}
