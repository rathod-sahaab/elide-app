import {
   Box,
   Heading,
   Spinner,
   useDisclosure,
   useMediaQuery,
} from '@chakra-ui/react'
import * as React from 'react'
import { Route } from '../models/data/Route'
import DeleteRouteAlert from './DeleteRouteAlert'
import RoutesList from './RoutesList'
import RoutesTable from './RoutesTable'
import UpdateRouteModal from './UpdateRouteModal'

export default function RoutesLister({
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
   const {
      isOpen: isUpdateOpen,
      onOpen: onUpdateOpen,
      onClose: onUpdateClose,
   } = useDisclosure() // For UpdateRouteModal
   const {
      isOpen: isDeleteOpen,
      onOpen: onDeleteOpen,
      onClose: onDeleteClose,
   } = useDisclosure() // For Delete Dialog
   // When
   const [routeToEdit, setRouteToEdit] = React.useState<Route>(null)
   const [routeToDelete, setRouteToDelete] = React.useState<Route>(null)

   const [showCards] = useMediaQuery('(max-width: 950px)')

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
            <Box maxWidth="1000px" width="full" borderRadius={8}>
               {showCards ? (
                  <RoutesList
                     routesData={routesData}
                     onUpdateOpen={onUpdateOpen}
                     onDeleteOpen={onDeleteOpen}
                     setRouteToEdit={setRouteToEdit}
                     setRouteToDelete={setRouteToDelete}
                  />
               ) : (
                  <RoutesTable
                     routesData={routesData}
                     onUpdateOpen={onUpdateOpen}
                     onDeleteOpen={onDeleteOpen}
                     setRouteToEdit={setRouteToEdit}
                     setRouteToDelete={setRouteToDelete}
                  />
               )}
               {/*
		This is required because we want to have one dialog for all edit route buttons.
		 */}
               <UpdateRouteModal
                  routeToEdit={routeToEdit}
                  isOpen={isUpdateOpen}
                  onClose={onUpdateClose}
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
