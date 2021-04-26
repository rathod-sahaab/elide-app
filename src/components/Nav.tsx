import React from 'react'
import { navigate } from 'gatsby'

import { isLoggedIn, logout } from '../services/auth'
import { Button, HStack, VStack } from '@chakra-ui/react'
const Nav = ({ vertical = false }: { vertical: boolean }) => {
   const Arrangement = vertical ? VStack : HStack
   return (
      <nav>
         {isLoggedIn() ? (
            <Arrangement spacing={6}>
               <Button
                  colorScheme="green"
                  variant="link"
                  onClick={async () => {
                     navigate('/app/dashboard')
                  }}
               >
                  Dashboard
               </Button>
               <Button
                  colorScheme="green"
                  variant="link"
                  onClick={async () => {
                     navigate('/app/profile')
                  }}
               >
                  Profile
               </Button>
               <Button
                  colorScheme="green"
                  variant="solid"
                  onClick={async () => {
                     let success = await logout()
                     if (success) {
                        navigate('/')
                     }
                  }}
               >
                  Logout
               </Button>
            </Arrangement>
         ) : (
            <Arrangement spacing={2}>
               <Button
                  colorScheme="green"
                  width="full"
                  variant="solid"
                  onClick={() => navigate('/app/register')}
               >
                  Register
               </Button>
               {'  '}
               <Button
                  colorScheme="green"
                  variant="solid"
                  width="full"
                  onClick={() => navigate('/app/login')}
               >
                  Login
               </Button>
            </Arrangement>
         )}
      </nav>
   )
}

export default Nav
