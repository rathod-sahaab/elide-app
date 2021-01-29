import * as React from 'react'

import './Layout.scss'
import {
   ThemeProvider,
   ColorModeProvider,
   CSSReset,
   theme,
} from '@chakra-ui/core'
import ThemeToggler from './ThemeToggler'

export default function Layout({ children }) {
   return (
      <ThemeProvider theme={theme}>
         <ColorModeProvider>
            <CSSReset />
            <ThemeToggler />
            <main>{children}</main>
         </ColorModeProvider>
      </ThemeProvider>
   )
}
