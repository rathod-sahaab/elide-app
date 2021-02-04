import { Box, Heading, Spinner, useDisclosure } from '@chakra-ui/react'
import { Table, Thead, Tbody, Tr, Th } from '@chakra-ui/react'
import * as React from 'react'
import { Route } from '../models/data/Route'
import DeleteRouteAlert from './DeleteRouteAlert'
import RouteTile from './RouteTile'
import UpdateRouteModal from './UpdateRouteModal'

export default function RouteList({
   routesData,
   loading,
   updateRoute,
   removeRoute,
}: {
   routesData: Route[]
   loading: boolean
   updateRoute: (route: Route) => void
   removeRoute: (route: Route) => void
}) {
   const { isOpen, onOpen, onClose } = useDisclosure() // For UpdateRouteModal
   const {
      isOpen: isDeleteOpen,
      onOpen: onDeleteOpen,
      onClose: onDeleteClose,
   } = useDisclosure() // For Delete Dialog
   // When
   const [routeToEdit, setRouteToEdit] = React.useState<Route>(null)
   const [routeToDelete, setRouteToDelete] = React.useState<Route>(null)

   return (
      <>
         {routesData.length == 0 ? (
            loading ? (
               <Box>
                  <Spinner size="lg" />
               </Box>
            ) : (
               <Heading>You donot have any links yet</Heading>
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
                     {routesData.map((route) => {
                        return (
                           <RouteTile
                              key={route.id}
                              route={route}
                              openEditDialog={onOpen}
                              openDeleteDialog={onDeleteOpen}
                              setRouteToEdit={setRouteToEdit}
                              setRouteToDelete={setRouteToDelete}
                           ></RouteTile>
                        )
                     })}
                  </Tbody>
               </Table>
               {/*
		This is required because we want to have one dialog for all edit route buttons.
		 */}
               <UpdateRouteModal
                  routeToEdit={routeToEdit}
                  isOpen={isOpen}
                  onClose={onClose}
                  updateRoute={updateRoute}
               />
               <DeleteRouteAlert
                  route={routeToDelete}
                  isOpen={isDeleteOpen}
                  onClose={onDeleteClose}
                  removeRoute={removeRoute}
               />
            </Box>
         )}
      </>
   )
}
