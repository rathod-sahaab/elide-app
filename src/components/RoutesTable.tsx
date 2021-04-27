import React from 'react'
import { Table, Thead, Tbody, Tr, Th, Box } from '@chakra-ui/react'
import { Dispatch, SetStateAction } from 'react'
import { Route } from '../models/data/Route'
import RouteTableTile from './RouteTableTile'
interface Props {
   routesData: Route[]
   onUpdateOpen: () => void
   onDeleteOpen: () => void
   setRouteToEdit: Dispatch<SetStateAction<Route>>
   setRouteToDelete: Dispatch<SetStateAction<Route>>
}
const RoutesTable: React.FC<Props> = ({
   routesData,
   onUpdateOpen,
   onDeleteOpen,
   setRouteToEdit,
   setRouteToDelete,
}) => {
   return (
      <Box borderWidth={1} borderRadius={8}>
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
               {routesData.map((route) => {
                  return (
                     <RouteTableTile
                        key={route.id}
                        route={route}
                        openEditDialog={onUpdateOpen}
                        openDeleteDialog={onDeleteOpen}
                        setRouteToEdit={setRouteToEdit}
                        setRouteToDelete={setRouteToDelete}
                     ></RouteTableTile>
                  )
               })}
            </Tbody>
         </Table>
      </Box>
   )
}
export default RoutesTable
