import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import { getUser } from '../services/auth'
import User from '../models/data/User'
import ActivityIndicator from './ActivityIndicator'

const Profile = () => {
   let user: User = getUser()
   return (
      <Flex width="full" align="center" justifyContent="center" height="100%">
         <Box
            borderWidth={1}
            p={8}
            maxWidth="500px"
            borderRadius={8}
            position="relative"
         >
            <Heading>{user.name}</Heading>
            <ActivityIndicator
               position="absolute"
               bottom="4"
               right="4"
               isActive={user.active}
               pointerEvents="none"
            />
            <Box p={2} maxWidth="500px" borderRadius={8}>
               <pre>{user.username}</pre>
               <pre>{user.email}</pre>
               <Button
                  mt={2}
                  size="xs"
                  textTransform="uppercase"
                  colorScheme={user.email_verified ? 'green' : 'red'}
               >
                  {user.email_verified ? 'email verified' : 'email unverified'}
               </Button>
            </Box>
         </Box>
      </Flex>
   )
}

export default Profile
