import * as React from 'react'

import './Layout.scss'
import {
   ThemeProvider,
   ColorModeProvider,
   CSSReset,
   theme,
} from '@chakra-ui/core'
import Header from './Header'

export default function Layout({ children }) {
   return (
      <ThemeProvider theme={theme}>
         <ColorModeProvider>
            <CSSReset />
            <Header />
            <main>{children}</main>
         </ColorModeProvider>
      </ThemeProvider>
   )
}
