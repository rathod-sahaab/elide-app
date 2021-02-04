import * as React from 'react'

import './Layout.scss'
import {
   ChakraProvider,
   ColorModeScript,
   CSSReset,
   theme,
} from '@chakra-ui/react'
import Header from './Header'

export default function Layout({ children }) {
   return (
      <ChakraProvider theme={theme}>
         <ColorModeScript />
         <CSSReset />
         <Header />
         <main>{children}</main>
      </ChakraProvider>
   )
}
