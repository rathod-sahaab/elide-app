import * as React from 'react'

import {
   ChakraProvider,
   ColorModeScript,
   CSSReset,
   theme,
} from '@chakra-ui/react'
import Header from './Header'

import './Layout.scss'

export default function Layout({ children }) {

   return (
      <ChakraProvider theme={theme}>
         <ColorModeScript />
         <CSSReset />
         <div id="app">
            <Header />
            <main style={{ overflow: 'auto' }}>{children}</main>
         </div>
      </ChakraProvider>
   )
}
