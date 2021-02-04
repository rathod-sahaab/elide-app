import {
   useDisclosure,
   Button,
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalCloseButton,
   ModalBody,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import React from 'react'
import { Route } from '../models/data/Route'
import CreateRouteForm from './CreateRouteForm'

export default function CreateRouteModal({
   appendRoute,
}: {
   appendRoute: (route: Route) => void
}) {
   const { isOpen, onOpen, onClose } = useDisclosure()

   const onSuccess = (route: Route) => {
      appendRoute(route)
      onClose()
   }

   return (
      <>
         <Button
            leftIcon={<AddIcon />}
            variant="solid"
            size="lg"
            borderRadius={8}
            mb={6}
            onClick={onOpen}
         >
            Create new link
         </Button>
         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent pb={4} borderRadius={8}>
               <ModalHeader>Create new link</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  <CreateRouteForm callOnSuccess={onSuccess} />
               </ModalBody>
            </ModalContent>
         </Modal>
      </>
   )
}
