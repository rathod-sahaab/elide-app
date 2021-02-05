import { Box } from '@chakra-ui/react'
import * as React from 'react'
import { ImHeart } from 'react-icons/im'

export default function Footer() {
   return (
      <footer style={{ width: '100vw' }}>
         <Box px={6} py={4} textAlign="center">
            Made with{' '}
            <ImHeart style={{ display: 'inline-block' }} color="red" /> in
            Bharat
         </Box>
      </footer>
   )
}
