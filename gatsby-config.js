const activeEnv =
   process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development'

console.log(`Using environment config: '${activeEnv}'`)

require('dotenv').config({
   path: `.env.${activeEnv}`,
})

module.exports = {
   siteMetadata: {
      title: 'Elide: Make URLs simpler!',
      siteUrl: `https://www.gatsbyjs.com`,
      description: `Make your URLs do more, easily`,
   },
   pathPrefix: '/elide-app',
   plugins: [
      'gatsby-plugin-sass',
      'gatsby-plugin-sharp',
      'gatsby-plugin-react-helmet',
      'gatsby-plugin-sitemap',
      'gatsby-plugin-offline',
      'gatsby-transformer-sharp',
      {
         resolve: 'gatsby-source-filesystem',
         options: {
            name: 'images',
            path: './src/images/',
         },
         __key: 'images',
      },
      {
         resolve: `gatsby-plugin-create-client-paths`,
         options: { prefixes: [`/app/*`] }, // client only routes
      },
   ],
   proxy: {
      // for testing
      prefix: '/api',
      url: 'http://localhost:9600',
   },
}
