import * as React from 'react'
import SigninForm from './SigninForm'
import SwipeableViews from 'react-swipeable-views'
import SignupForm from './SignupForm'
import {
   Paper,
   Tabs,
   Tab,
   Box,
   Typography,
   useTheme,
   makeStyles,
} from '@material-ui/core'
import { graphql, StaticQuery } from 'gatsby'

import Img from 'gatsby-image'

interface TabPanelProps {
   children?: React.ReactNode
   dir?: string
   index: any
   value: any
}

function TabPanel(props: TabPanelProps) {
   const { children, value, index, ...other } = props

   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`full-width-tabpanel-${index}`}
         aria-labelledby={`full-width-tab-${index}`}
         {...other}
      >
         {value === index && (
            <Box p={3}>
               <Typography>{children}</Typography>
            </Box>
         )}
      </div>
   )
}

function a11yProps(index: any) {
   return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
   }
}

const useStyles = makeStyles({
   tabs: {
      '&>div>span': {
         top: 0,
      },
   },
   logoHolder: {
      textAlign: 'center',
      paddingTop: `2em`,
   },
})

export default function SignupSigninPanel({ styl }) {
   const classes = useStyles()
   const theme = useTheme()
   const [value, setValue] = React.useState(0)

   const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
      setValue(newValue)
   }

   const handleChangeIndex = (index: number) => {
      setValue(index)
   }
   const component = (data) => (
      <Paper elevation={2} className={styl}>
         <div className={classes.logoHolder}>
            <Img fixed={data.file.childImageSharp.fixed} alt="" />
         </div>
         <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
         >
            <TabPanel value={value} index={0} dir={theme.direction}>
               <SigninForm />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
               <SignupForm />
            </TabPanel>
         </SwipeableViews>
         <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            className={classes.tabs}
         >
            <Tab label="sign in" />
            <Tab label="sign up" />
         </Tabs>
      </Paper>
   )

   return (
      <StaticQuery
         query={graphql`
            query {
               file(relativePath: { eq: "elide-logo.png" }) {
                  childImageSharp {
                     fixed(height: 64) {
                        ...GatsbyImageSharpFixed
                     }
                  }
               }
            }
         `}
         render={component}
      />
   )
}
