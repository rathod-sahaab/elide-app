import * as React from 'react'
import { Flex, Box } from '@chakra-ui/react'
import StaticLogo from './StaticLogo'

export default function FormWrapper({ children }) {
   return (
      <Flex width="full" align="center" justifyContent="center" height="100%">
         <Box
            p={8}
            maxWidth="500px"
            borderWidth={1}
            borderRadius={8}
            boxShadow="lg"
         >
            <Box textAlign="center">
               <StaticLogo />
            </Box>
            <Box my={4} textAlign="left">
               {children}
            </Box>
         </Box>
      </Flex>
   )
}
