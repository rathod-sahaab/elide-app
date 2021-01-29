import * as React from 'react'
import { isLoggedIn } from '../services/auth'
import { StaticQuery, graphql } from 'gatsby'
import { Link as GatsbyLink } from 'gatsby'
import { Heading, Box, Button, Flex } from '@chakra-ui/core'
import ThemeToggler from './ThemeToggler'
import Img from 'gatsby-image'
import { Spacer } from '@chakra-ui/react'
import { navigate } from '@reach/router'

export default function Header({ theme }) {
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
                     onClick={() => navigate('/app/logout')}
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
                        onClick={() => navigate('/app/Login')}
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
