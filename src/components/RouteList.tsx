import {
   Box,
   Heading,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalHeader,
   ModalOverlay,
   Spinner,
   useDisclosure,
} from '@chakra-ui/core'
import { Table, Thead, Tbody, Tr, Th } from '@chakra-ui/react'
import * as React from 'react'
import { Route } from '../models/data/Route'
import RouteTile from './RouteTile'
import UpdateRouteForm from './UpdateRouteForm'

export default function RouteList({
   routesData,
   loading,
   updateRoute,
}: {
   routesData: Route[]
   loading: boolean
   updateRoute: (route: Route) => void
}) {
   const { isOpen, onOpen, onClose } = useDisclosure() // For Modal
   const [routeToEdit, setRouteToEdit] = React.useState<Route>(null)

   const onSuccess = (route: Route) => {
      updateRoute(route)
      onClose()
   }

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
                              setRouteToEdit={setRouteToEdit}
                           ></RouteTile>
                        )
                     })}
                  </Tbody>
               </Table>
               <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent pb={4} borderRadius={8}>
                     <ModalHeader>Edit existing link</ModalHeader>
                     <ModalCloseButton />
                     <ModalBody>
                        <UpdateRouteForm
                           route={routeToEdit}
                           callOnSuccess={onSuccess}
                        />
                     </ModalBody>
                  </ModalContent>
               </Modal>
            </Box>
         )}
      </>
   )
}
