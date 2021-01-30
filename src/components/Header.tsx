import * as React from 'react'
import { isLoggedIn, logout } from '../services/auth'
import { StaticQuery, graphql } from 'gatsby'
import { Heading, Box, Button, Flex } from '@chakra-ui/core'
import ThemeToggler from './ThemeToggler'
import Img from 'gatsby-image'
import { Spacer } from '@chakra-ui/react'
import { navigate } from 'gatsby'

export default function Header() {
   const logo = (
      <StaticQuery
         query={graphql`
            query elideLogoHeaderQuery {
               file(relativePath: { eq: "elide-logo.png" }) {
                  childImageSharp {
                     fixed(height: 30) {
                        ...GatsbyImageSharpFixed
                     }
                  }
               }
            }
         `}
         render={(data) => <Img fixed={data.file.childImageSharp.fixed} />}
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
               {logo}
               <Box px={2}>
                  <Heading fontSize={30}>elide</Heading>
               </Box>
               <Spacer />
               <ThemeToggler />
               {isLoggedIn() ? (
                  <Button
                     variantColor="green"
                     variant="solid"
                     onClick={async () => {
                        let success = await logout()
                        if (success) {
                           navigate('/')
                        }
                     }}
                     ml={4}
                  >
                     Logout
                  </Button>
               ) : (
                  <>
                     <Button
                        variantColor="green"
                        variant="solid"
                        onClick={() => navigate('/app/register')}
                        mx={4}
                     >
                        Register
                     </Button>
                     {'  '}
                     <Button
                        variantColor="green"
                        variant="solid"
                        onClick={() => navigate('/app/login')}
                     >
                        Login
                     </Button>
                  </>
               )}
            </Flex>
         </Box>
      </header>
   )
}
