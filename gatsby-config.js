module.exports = {
   siteMetadata: {
      title: 'Elide',
   },
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
   ],
   proxy: {
      prefix: '/api',
      url: 'http://localhost:9600',
   },
}
