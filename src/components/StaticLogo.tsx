import * as React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { useColorMode } from '@chakra-ui/react'
export default function StaticLogo() {
   const { colorMode } = useColorMode()
   const isLightMode = colorMode == 'light'
   return (
      <StaticQuery
         query={graphql`
            query elideLogoFormsQuery {
               light: file(relativePath: { eq: "elide-logo.png" }) {
                  childImageSharp {
                     fixed(height: 56) {
                        ...GatsbyImageSharpFixed
                     }
                  }
               }
               dark: file(relativePath: { eq: "elide-logo-dark.png" }) {
                  childImageSharp {
                     fixed(height: 56) {
                        ...GatsbyImageSharpFixed
                     }
                  }
               }
            }
         `}
         render={(data) => (
            <Img
               fixed={
                  isLightMode
                     ? data.light.childImageSharp.fixed
                     : data.dark.childImageSharp.fixed
               }
            />
         )}
      />
   )
}
