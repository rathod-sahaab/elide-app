import React from 'react'
import { navigate } from 'gatsby'

import { isLoggedIn, logout } from '../services/auth'
import { Button, HStack, VStack } from '@chakra-ui/react'
const Nav = ({
   vertical = false,
   closeDrawer,
}: {
   vertical: boolean
   closeDrawer: () => void
}) => {
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
                     closeDrawer()
                  }}
               >
                  Dashboard
               </Button>
               <Button
                  colorScheme="green"
                  variant="link"
                  onClick={async () => {
                     navigate('/app/profile')
                     closeDrawer()
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
                        closeDrawer()
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
                  onClick={() => {
                     navigate('/app/register')
                     closeDrawer()
                  }}
               >
                  Register
               </Button>
               {'  '}
               <Button
                  colorScheme="green"
                  variant="solid"
                  width="full"
                  onClick={() => {
                     navigate('/app/login')
                     closeDrawer()
                  }}
               >
                  Login
               </Button>
            </Arrangement>
         )}
      </nav>
   )
}

export default Nav
