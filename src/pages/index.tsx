import { Box, makeStyles, Paper, Typography } from '@material-ui/core'
import * as React from 'react'
import Layout from '../components/Layout'
import SignupSigninPanel from '../components/SignupSigninPanel'

// import './index.scss'

const useStyles = makeStyles({
   page: {
      position: `relative`,
      height: `100vh`,
      padding: `20vmin`,
   },
   formHolder: {
      maxWidth: '300px',
      borderRadius: `12px`,
      position: `absolute`,
      right: `12vw`,
      top: `50%`,
      transform: `translateY(-50%)`,
   },
})

export default function IndexPage() {
   const classes = useStyles()
   return (
      <Layout>
         <section className={classes.page}>
            <Typography variant="h1" component="h2">
               Make URLs Great Again!
            </Typography>
            <SignupSigninPanel styl={classes.formHolder} />
         </section>
      </Layout>
   )
}
