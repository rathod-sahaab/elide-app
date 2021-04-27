import * as React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import {
   Heading,
   Box,
   Flex,
   HStack,
   useColorMode,
   IconButton,
   useMediaQuery,
   useDisclosure,
} from '@chakra-ui/react'
import {
   Drawer,
   DrawerBody,
   DrawerFooter,
   DrawerHeader,
   DrawerOverlay,
   DrawerContent,
   DrawerCloseButton,
} from '@chakra-ui/react'
import ThemeToggler from './ThemeToggler'
import Img from 'gatsby-image'
import { Spacer } from '@chakra-ui/react'
import { Link } from 'gatsby'
import Nav from './Nav'
import { HamburgerIcon } from '@chakra-ui/icons'

export default function Header() {
   const { isOpen, onOpen, onClose } = useDisclosure()

   const { colorMode } = useColorMode()
   let [isMobile] = useMediaQuery('(max-width: 767px)')
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

               {isMobile ? (
                  <>
                     <IconButton
                        aria-label="open menu"
                        icon={<HamburgerIcon />}
                        onClick={onOpen}
                     />
                     <Drawer
                        isOpen={isOpen}
                        placement="right"
                        onClose={onClose}
                     >
                        <DrawerOverlay>
                           <DrawerContent>
                              <DrawerCloseButton />
                              <DrawerHeader borderBottomWidth="1px">
                                 Navigation
                              </DrawerHeader>

                              <DrawerBody>
                                 <Nav closeDrawer={onClose} vertical={true} />
                              </DrawerBody>
                           </DrawerContent>
                        </DrawerOverlay>
                     </Drawer>
                  </>
               ) : (
                  <Nav closeDrawer={() => {}} vertical={false} />
               )}
            </Flex>
         </Box>
      </header>
   )
}
