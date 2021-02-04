import * as React from 'react'
import {
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalHeader,
   ModalOverlay,
} from '@chakra-ui/react'
import UpdateRouteForm from './UpdateRouteForm'
import { Route } from '../models/data/Route'

export default function UpdateRouteModal({
   routeToEdit,
   isOpen,
   onClose,
   updateRoute,
}: {
   routeToEdit: Route
   isOpen: boolean
   onClose: () => void
   updateRoute: (route: Route) => void
}) {
   const onSuccess = (route: Route) => {
      updateRoute(route)
      onClose()
   }

   return (
      <Modal isOpen={isOpen} onClose={onClose}>
         <ModalOverlay />
         <ModalContent pb={4} borderRadius={8}>
            <ModalHeader>Edit existing link</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
               <UpdateRouteForm route={routeToEdit} callOnSuccess={onSuccess} />
            </ModalBody>
         </ModalContent>
      </Modal>
   )
}
