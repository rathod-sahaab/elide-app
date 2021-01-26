import * as React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
export default function StaticLogo() {
   return (
      <StaticQuery
         query={graphql`
            query elideLogoFormsQuery {
               file(relativePath: { eq: "elide-logo.png" }) {
                  childImageSharp {
                     fixed(height: 48) {
                        ...GatsbyImageSharpFixed
                     }
                  }
               }
            }
         `}
         render={(data) => <Img fixed={data.file.childImageSharp.fixed} />}
      />
   )
}
