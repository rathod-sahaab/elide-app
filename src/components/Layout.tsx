import * as React from 'react'

import {
   ChakraProvider,
   ColorModeScript,
   CSSReset,
   theme,
} from '@chakra-ui/react'
import Header from './Header'
import Footer from './Footer'

import './Layout.scss'

export default function Layout({ children }) {
   return (
      <ChakraProvider theme={theme}>
         <ColorModeScript />
         <CSSReset />
         <div id="app">
            <Header />
            <main>{children}</main>
            <Footer />
         </div>
      </ChakraProvider>
   )
}
