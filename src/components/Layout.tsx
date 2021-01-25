import * as React from 'react'

import './Layout.scss'
import {
   ThemeProvider,
   ColorModeProvider,
   CSSReset,
   theme,
} from '@chakra-ui/core'
import ThemeToggler from './ThemeToggler'

// import { extendTheme } from '@chakra-ui/react'
// const theme = extendTheme({
//    textStyles: {
//       h1: {
//          fontSize: ['48px', '72px'],
//          fontWeight: 'bold',
//          lineHeight: '110%',
//          letterSpacing: '-2%',
//       },
//       h2: {
//          fontSize: ['36px', '48px'],
//          fontWeight: 'semibold',
//          lineHeight: '110%',
//          letterSpacing: '-1%',
//       },
//    },
// })

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
