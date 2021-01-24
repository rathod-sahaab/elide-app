import { Box, makeStyles, Paper, Typography } from '@material-ui/core'
import * as React from 'react'
import Layout from '../components/Layout'
import SignupSigninPanel from '../components/SignupSigninPanel'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

// import './index.scss'

const useStyles = makeStyles({
   page: {
      position: `relative`,
      height: `100vh`,
   },
   formHolder: {
      maxWidth: '300px',
      borderRadius: `12px`,
      position: `absolute`,
      right: `12vw`,
      top: `50%`,
      transform: `translateY(-50%)`,
   },
   logoHolder: {
      textAlign: 'center',
      paddingTop: `2em`,
   },
})

export default function IndexPage({ data }) {
   const classes = useStyles()
   return (
      <Layout>
         <section className={classes.page}>
            <Typography>
               <h1>Elide</h1>
               <p>
                  An opensource url and QR code service so you can be sure your
                  users' convienince is not traded for their privacy.
               </p>
            </Typography>
            <Paper elevation={3} className={classes.formHolder}>
               <div className={classes.logoHolder}>
                  <Img fixed={data.file.childImageSharp.fixed} alt="" />
               </div>
               <SignupSigninPanel />
            </Paper>
         </section>
      </Layout>
   )
}

export const query = graphql`
   query {
      file(relativePath: { eq: "elide-logo.png" }) {
         childImageSharp {
            fixed(height: 64) {
               ...GatsbyImageSharpFixed
            }
         }
      }
   }
`
