import { IconButton } from '@chakra-ui/core'
import { EditIcon } from '@chakra-ui/icons'
import { Td, Tr } from '@chakra-ui/react'
import * as React from 'react'
import { Route } from '../models/data/Route'
import ActivityIndicator from './ActivityIndicator'

export default function RouteList({
   route,
   openEditDialog,
   setRouteToEdit,
}: {
   route: Route
   openEditDialog: any
   setRouteToEdit: any
}) {
   return (
      <Tr
         p={2}
         borderTopWidth="1px"
         borderColor="inherit"
         fontSize="sm"
         whiteSpace="normal"
      >
         <Td px={4} py={2}>
            {route.slug}
         </Td>
         <Td px={4} py={2}>
            {route.target}
         </Td>
         <Td px={4} py={2} textAlign="right">
            <ActivityIndicator minWidth="unset" isActive={route.active} />
            <IconButton
               aria-label="edit link"
               icon={EditIcon}
               onClick={() => {
                  openEditDialog()
                  setRouteToEdit(route)
               }}
               ml={4}
               variant="ghost"
            />
         </Td>
      </Tr>
   )
}
