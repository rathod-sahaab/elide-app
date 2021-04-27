import { IconButton } from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Td, Tr } from '@chakra-ui/react'
import * as React from 'react'
import { Route } from '../models/data/Route'
import ActivityIndicator from './ActivityIndicator'

export default function RouteTableTile({
   route,
   openEditDialog,
   openDeleteDialog,
   setRouteToEdit,
   setRouteToDelete,
}: {
   route: Route
   openEditDialog: any
   openDeleteDialog: any
   setRouteToEdit: any
   setRouteToDelete: any
}) {
   return (
      <Tr
         p={2}
         borderTopWidth="1px"
         borderColor="inherit"
         fontSize="sm"
         whiteSpace="normal"
      >
         <Td px={4} py={2} maxWidth="3xs">
            {route.slug}
         </Td>
         <Td px={4} py={2}>
            {route.target}
         </Td>
         <Td px={4} py={2} textAlign="right">
            <ActivityIndicator minWidth="unset" isActive={route.active} />
            <IconButton
               aria-label="edit link"
               icon={<EditIcon />}
               onClick={() => {
                  setRouteToEdit(route)
                  openEditDialog()
               }}
               ml={4}
               variant="ghost"
            />
            <IconButton
               aria-label="delete link"
               icon={<DeleteIcon />}
               onClick={() => {
                  setRouteToDelete(route)
                  openDeleteDialog()
               }}
               ml={4}
               variant="ghost"
            />
         </Td>
      </Tr>
   )
}
