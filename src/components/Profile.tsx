import { Box, Button, Flex, Heading } from '@chakra-ui/core'
import React from 'react'
import { getUser } from '../services/auth'
import User from '../models/data/User'
import ActivityIndicator from './ActivityIndicator'

const Profile = () => {
   let user: User = getUser()
   return (
      <Flex width="full" align="center" justifyContent="center">
         <Box
            borderWidth={1}
            p={8}
            maxWidth="500px"
            borderRadius={8}
            position="relative"
         >
            <Heading>Hi! {user.name.split(' ')[0]}</Heading>
            <ActivityIndicator
               position="absolute"
               top="4"
               right="4"
               isActive={user.active}
               pointerEvents="none"
            />
            <Box p={8} maxWidth="500px" borderRadius={8}>
               <Heading size="md">Name</Heading>
               <p>{user.name}</p>
               <Heading size="md">Email</Heading>
               <p>{user.email}</p>
               <Heading size="md">Username</Heading>
               <p>{user.username}</p>
               <Button
                  size="xs"
                  textTransform="uppercase"
                  variantColor={user.email_verified ? 'green' : 'red'}
               >
                  {user.email_verified ? 'email verified' : 'email unverified'}
               </Button>
            </Box>
         </Box>
      </Flex>
   )
}

export default Profile
