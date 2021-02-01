import {
   useDisclosure,
   Button,
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalCloseButton,
   ModalBody,
   ModalFooter,
   Text,
} from '@chakra-ui/core'
import { AddIcon } from '@chakra-ui/icons'
import React from 'react'
import CreateRouteForm from './CreateRouteForm'

export default function CreateRouteModal() {
   const { isOpen, onOpen, onClose } = useDisclosure()

   return (
      <>
         <Button
            leftIcon={AddIcon}
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
                  <CreateRouteForm callOnSuccess={onClose} />
               </ModalBody>
            </ModalContent>
         </Modal>
      </>
   )
}
