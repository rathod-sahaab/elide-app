module.exports = {
   siteMetadata: {
      title: 'Elide: Make URLs simpler!',
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
