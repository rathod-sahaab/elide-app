import * as React from 'react'
import { isLoggedIn, logout } from '../services/auth'
import { StaticQuery, graphql } from 'gatsby'
import {
   Heading,
   Box,
   Button,
   Flex,
   HStack,
   useColorMode,
} from '@chakra-ui/react'
import ThemeToggler from './ThemeToggler'
import Img from 'gatsby-image'
import { Spacer } from '@chakra-ui/react'
import { navigate, Link } from 'gatsby'

export default function Header() {
   const { colorMode } = useColorMode()
   const isLightMode = colorMode == 'light'
   const logo = (
      <StaticQuery
         query={graphql`
            query elideLogoHeaderQuery {
               light: file(relativePath: { eq: "elide-logo.png" }) {
                  childImageSharp {
                     fixed(height: 36) {
                        ...GatsbyImageSharpFixed
                     }
                  }
               }
               dark: file(relativePath: { eq: "elide-logo-dark.png" }) {
                  childImageSharp {
                     fixed(height: 36) {
                        ...GatsbyImageSharpFixed
                     }
                  }
               }
            }
         `}
         render={(data) => (
            <Img
               fixed={
                  isLightMode
                     ? data.light.childImageSharp.fixed
                     : data.dark.childImageSharp.fixed
               }
            />
         )}
      />
   )

   return (
      <header
         style={{
            width: '100vw',
         }}
      >
         <Box px={6} py={4}>
            <Flex width="full" align="center">
               <Link to="/">
                  <HStack spacing={2}>
                     {logo}
                     <Heading fontFamily="Poppins" fontSize={30}>
                        elide
                     </Heading>
                  </HStack>
               </Link>
               <Spacer />
               <ThemeToggler />
               {isLoggedIn() ? (
                  <nav>
                     <Button
                        colorScheme="green"
                        variant="link"
                        onClick={async () => {
                           navigate('/app/dashboard')
                        }}
                        ml={6}
                     >
                        Dashboard
                     </Button>
                     <Button
                        colorScheme="green"
                        variant="link"
                        onClick={async () => {
                           navigate('/app/profile')
                        }}
                        ml={4}
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
                        ml={6}
                     >
                        Logout
                     </Button>
                  </nav>
               ) : (
                  <nav>
                     <Button
                        colorScheme="green"
                        variant="solid"
                        onClick={() => navigate('/app/register')}
                        mx={4}
                     >
                        Register
                     </Button>
                     {'  '}
                     <Button
                        colorScheme="green"
                        variant="solid"
                        onClick={() => navigate('/app/login')}
                     >
                        Login
                     </Button>
                  </nav>
               )}
            </Flex>
         </Box>
      </header>
   )
}
