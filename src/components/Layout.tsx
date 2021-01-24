import * as React from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core'
import { blue, green } from '@material-ui/core/colors'

import './Layout.scss'
const theme = createMuiTheme({
   palette: {
      primary: {
         main: blue[500],
      },
      secondary: {
         main: green[500],
      },
   },
})

export default function Layout({ children }) {
   return (
      <ThemeProvider theme={theme}>
         <main>{children}</main>
      </ThemeProvider>
   )
}
