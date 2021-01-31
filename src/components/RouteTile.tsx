import { Badge, Box, Flex, Heading, IconButton } from '@chakra-ui/core'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Spacer, Td, Tr } from '@chakra-ui/react'
import * as React from 'react'
import ActivityIndicator from './ActivityIndicator'

export default function RouteList({ route }) {
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
               onClick={() => {}}
               ml={4}
               variant="ghost"
            />
         </Td>
      </Tr>
   )

   {
      // < Box borderWidth = { 1} borderRadius = { 8} px = { 6} py = { 4} mb = { 4} boxShadow = "sm" >
      //  <Flex width="full" align="center">
      //     <span>
      //        <ActivityIndicator minWidth="unset" isActive={route.active} />
      //        <Heading display="inline" size="md" pl={4}>
      //           {route.slug}
      //        </Heading>
      //     </span>
      //     <Spacer />
      //     <Heading display="inline" size="md">
      //        {route.target}
      //     </Heading>
      //     <IconButton
      //        aria-label="edit link"
      //        icon={EditIcon}
      //        onClick={() => {}}
      //        ml={4}
      //        variant="ghost"
      //     />
      //  </Flex>
      // </Box >
   }
}
