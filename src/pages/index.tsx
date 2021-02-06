import { Button, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../components/Layout'
import { FaGithub } from 'react-icons/fa'

export default function IndexPage() {
   return (
      <Layout>
         <Helmet>
            <meta charSet="utf-8" />
            <title>Elide: Make your URLs simpler</title>
         </Helmet>
         <Flex align="center" width="full" height="100%">
            <VStack spacing={10} align="center" width="full">
               <Heading fontFamily="poppins" size="3xl">
                  Make your URLs simpler!
               </Heading>
               <Text textAlign="center">
                  We transform your ugly, generic, lengthy and uncomprehensible
                  URLs in <b>works of art ;)</b> <br /> URLs become easy to
                  remember, beautiful, personalized, and clearly convey their
                  intent. <br /> Above all <b>elide</b> is opensource so you can
                  be sure your users are safe with us.
               </Text>
               <HStack spacing={3}>
                  <Button size="lg" colorScheme="green">
                     Get started
                  </Button>
                  // TODO: Add GitHub link
                  <Button size="lg" colorScheme="gray">
                     <FaGithub style={{ marginRight: `0.5em` }} />
                     GitHub
                  </Button>
               </HStack>
            </VStack>
         </Flex>
         <Flex align="center" direction="column" width="full">
            <pre>forms.gle</pre>
            <pre>elide.me/elide-survey</pre>
         </Flex>
      </Layout>
   )
}
