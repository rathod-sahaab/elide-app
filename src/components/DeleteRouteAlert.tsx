import React from 'react'
import {
   AlertDialog,
   AlertDialogOverlay,
   AlertDialogContent,
   AlertDialogHeader,
   AlertDialogBody,
   AlertDialogFooter,
   Button,
} from '@chakra-ui/react'
import { Route } from '../models/data/Route'
import { deleteRoute } from '../services/RouteManager'

export default function DeleteRouteAlert({
   route,
   isOpen,
   onClose,
   removeRoute,
}: {
   route: Route
   isOpen: boolean
   onClose: () => void
   removeRoute: (route: Route) => void
}) {
   const cancelRef = React.useRef()

   const onDelete = async () => {
      let success = await deleteRoute(route.id)
      if (success) {
         removeRoute(route)
      } else {
         alert('Error: Deleting routes')
      }
      onClose()
   }
   return (
      <AlertDialog
         isOpen={isOpen}
         leastDestructiveRef={cancelRef}
         onClose={onClose}
      >
         <AlertDialogOverlay>
            <AlertDialogContent>
               <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Delete Route Permanently
               </AlertDialogHeader>

               <AlertDialogBody>
                  Are you sure? You can't undo this action afterwards.
               </AlertDialogBody>

               <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                     Cancel
                  </Button>
                  <Button colorScheme="red" onClick={onDelete} ml={3}>
                     Delete
                  </Button>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialogOverlay>
      </AlertDialog>
   )
}
