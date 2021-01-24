import * as React from 'react'
import SigninForm from './SigninForm'
import SwipeableViews from 'react-swipeable-views'
import SignupForm from './SignupForm'
import { Tabs, Tab, Box, Typography, useTheme } from '@material-ui/core'
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

export default function SignupSigninPanel() {
   // const classes = useStyles();
   const theme = useTheme()
   const [value, setValue] = React.useState(0)

   const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
      setValue(newValue)
   }

   const handleChangeIndex = (index: number) => {
      setValue(index)
   }
   return (
      <div>
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
            aria-label="disabled tabs example"
         >
            <Tab label="sign in" />
            <Tab label="sign up" />
         </Tabs>
      </div>
   )
}
