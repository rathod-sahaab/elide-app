import {
   Box,
   Flex,
   Heading,
   Text,
   IconButton,
   VStack,
   Tooltip,
   Spacer,
} from '@chakra-ui/react'
import { Dispatch, SetStateAction } from 'react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import * as React from 'react'
import { Route } from '../models/data/Route'
import ActivityIndicator from './ActivityIndicator'

export default function RouteListTile({
   route,
   onUpdateOpen,
   onDeleteOpen,
   setRouteToEdit,
   setRouteToDelete,
}: {
   route: Route
   onUpdateOpen: () => void
   onDeleteOpen: () => void
   setRouteToEdit: Dispatch<SetStateAction<Route>>
   setRouteToDelete: Dispatch<SetStateAction<Route>>
}) {
   return (
      <Box borderRadius={8} my={1} borderWidth={1} padding={4} width="full">
         <div>
            <Heading size="xs" textAlign="left">
               SLUG
            </Heading>
            <Spacer height={1} />
            <Tooltip label={route.slug}>
               <Text isTruncated={true} textAlign="left">
                  {route.slug}
               </Text>
            </Tooltip>
            <Spacer height={4} />
            <Heading size="xs" textAlign="left">
               TARGET
            </Heading>
            <Spacer height={1} />
            <Tooltip label={route.target}>
               <Text isTruncated={true} textAlign="left">
                  {route.target}
               </Text>
            </Tooltip>
            <Spacer height={2} />
            <Flex width="full" justify="space-between" alignItems="center">
               <ActivityIndicator minWidth="unset" isActive={route.active} />
               <span>
                  <IconButton
                     aria-label="edit link"
                     icon={<EditIcon />}
                     onClick={() => {
                        setRouteToEdit(route)
                        onUpdateOpen()
                     }}
                     variant="ghost"
                  />
                  <IconButton
                     aria-label="delete link"
                     icon={<DeleteIcon />}
                     onClick={() => {
                        setRouteToDelete(route)
                        onDeleteOpen()
                     }}
                     variant="ghost"
                  />
               </span>
            </Flex>
         </div>
      </Box>
   )
}
