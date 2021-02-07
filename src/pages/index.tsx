import { Button, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../components/Layout'
import { FaGithub } from 'react-icons/fa'
import CycleTextsButton from '../components/TextTransition'
import { ArrowForwardIcon, ArrowRightIcon } from '@chakra-ui/icons'

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
         <Flex
            py={6}
            align="center"
            direction="column"
            width="full"
            minHeight="50%"
         >
            <VStack spacing={10} align="center" width="full">
               <Heading fontFamily="poppins" size="2xl">
                  Gibberish to English
               </Heading>
               <Text textAlign="center">
                  Click the button below to simplify
               </Text>
               <CycleTextsButton
                  texts={[
                     'https://forms.gle/RJbd5ZGeAB85xTF68',
                     'elide.me/elide-survey',
                  ]}
               />
            </VStack>
         </Flex>
         <Flex
            py={6}
            align="center"
            direction="column"
            width="full"
            minHeight="50%"
         >
            <VStack spacing={10} align="center" width="full">
               <Heading fontFamily="poppins" size="2xl">
                  Dynamic URLs
               </Heading>
               <Text textAlign="center">
                  Need to change the link but posters are already printed?
                  <br />
                  Worry not we got you covered, just point the elide route to
                  another link.
               </Text>
               <HStack spacing={3}>
                  <Button
                     p={4}
                     borderRadius={8}
                     size="lg"
                     fontFamily="monospace"
                     colorScheme="green"
                     onClick={() => {}}
                  >
                     elide.me/elide-survey
                  </Button>
                  <ArrowRightIcon />
                  <CycleTextsButton
                     texts={[
                        'https://forms.gle/RJbd5ZGeAB85xTF68',
                        'https://totallyfakeurl.en/RJbd5ZGeAB85xTF68',
                        'https://definitelyfakeurl.en/RJbd5ZGeAB85xTF68',
                     ]}
                  />
               </HStack>
            </VStack>
         </Flex>
         <Flex
            py={6}
            align="center"
            direction="column"
            width="full"
            minHeight="50%"
         >
            <VStack spacing={10} align="center" width="full">
               <Heading fontFamily="poppins" size="2xl">
                  Smart URLs
               </Heading>
            </VStack>
         </Flex>
      </Layout>
   )
}
