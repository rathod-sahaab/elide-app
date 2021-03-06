import {
   Button,
   Flex,
   Heading,
   HStack,
   Text,
   VStack,
   StatGroup,
   Alert,
   AlertIcon,
   AlertTitle,
   AlertDescription,
   Stack,
   useMediaQuery,
} from '@chakra-ui/react'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../components/Layout'
import { FaGithub } from 'react-icons/fa'
import CycleTextsButton from '../components/TextTransition'
import VisitStats from '../components/VisitStats'
import { ImLink } from 'react-icons/im'
import { navigate } from 'gatsby-link'

export default function IndexPage() {
   const [isMobile] = useMediaQuery('(max-width: 767px)')
   const [lessThan900] = useMediaQuery('(max-width: 900px)')
   return (
      <Layout>
         <Helmet>
            <meta charSet="utf-8" />
            <title>Elide: Make your URLs simpler</title>
         </Helmet>
         <Flex align="center" width="full" padding={3} height="100%">
            <VStack spacing={10} align="center" width="full">
               <Heading fontFamily="poppins" size="3xl" textAlign="center">
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
                  <Button
                     size="lg"
                     colorScheme="green"
                     onClick={() => navigate('/app/register')}
                  >
                     Get started
                  </Button>
                  <Button
                     size="lg"
                     colorScheme="gray"
                     onClick={() =>
                        window.location.assign(
                           'https://github.com/rathod-sahaab/elide-app'
                        )
                     }
                  >
                     <FaGithub style={{ marginRight: `0.5em` }} />
                     GitHub
                  </Button>
               </HStack>

               <Alert
                  status="warning"
                  width={isMobile ? 'full' : 'lg'}
                  flexDirection="column"
                  borderRadius={12}
               >
                  <AlertIcon boxSize="36px" />
                  <AlertTitle mt={4} mb={1} fontSize="lg">
                     Beta release
                  </AlertTitle>
                  <AlertDescription>
                     We are testing things out and data might get lost.
                  </AlertDescription>
               </Alert>
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
               <Heading fontFamily="Poppins" size="2xl" textAlign="center">
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
               <Stack
                  alignItems="center"
                  direction={lessThan900 ? 'column' : 'row'}
                  spacing={3}
               >
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
                  <ImLink />
                  <CycleTextsButton
                     texts={[
                        'https://forms.gle/RJbd5ZGeAB85xTF68',
                        'https://totallyfakeurl.en/RJbd5ZGeAB85xTF68',
                        'https://definitelyfakeurl.en/RJbd5ZGeAB85xTF68',
                     ]}
                  />
               </Stack>
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
               <Text textAlign="center">
                  We provide you necessary statistics to help you assess your
                  reach and demographics.
                  <br />
                  So that you can cater to your users the content they like.
               </Text>
               <StatGroup>
                  <Stack direction={lessThan900 ? 'column' : 'row'} spacing={6}>
                     <VisitStats
                        quant="21,000"
                        heading="Unique visits"
                        helperText="This week"
                     />
                     <VisitStats
                        quant="50,000"
                        heading="Total visits"
                        helperText="This week"
                     />
                     <VisitStats
                        quant="50%"
                        heading="Retention"
                        helperText="This week"
                     />
                  </Stack>
               </StatGroup>
            </VStack>
         </Flex>
      </Layout>
   )
}
