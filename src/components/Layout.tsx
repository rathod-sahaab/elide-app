import * as React from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core'
import { green } from '@material-ui/core/colors'

import './Layout.scss'
const theme = createMuiTheme({
   palette: {
      primary: {
         main: '#319795',
      },
      secondary: {
         main: green[500],
      },
   },
   props: {
      MuiTextField: {
         variant: 'outlined',
      },
      MuiButton: {
         style: {
            color: 'white',
            borderRadius: '9px',
            textTransform: 'none',
         },
         size: 'large',
      },
   },
   typography: {
      fontFamily: 'Inter, sans-serif',
      h1: {
         fontSize: '64px',
         fontWeight: 700,
         color: '#2d3748',
      },
   },
   shape: {
      borderRadius: 12,
   },
})

export default function Layout({ children }) {
   return (
      <ThemeProvider theme={theme}>
         <main>{children}</main>
      </ThemeProvider>
   )
}
