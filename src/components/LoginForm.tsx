import { Field, Form, Formik } from 'formik'
import * as React from 'react'
import * as Yup from 'yup'
import {
   Flex,
   Box,
   Heading,
   FormControl,
   FormLabel,
   Input,
   Button,
   FormErrorMessage,
} from '@chakra-ui/core'

const LoginSchema = Yup.object({
   username: Yup.string().max(20).required('Required'),
   password: Yup.string().required('Required'),
})
export default function LoginForm() {
   return (
      <Flex width="full" align="center" justifyContent="center">
         <Box
            p={8}
            maxWidth="500px"
            borderWidth={1}
            borderRadius={8}
            boxShadow="lg"
         >
            <Box textAlign="center">
               <Heading>Login</Heading>
            </Box>
            <Box my={4} textAlign="left">
               <Formik
                  initialValues={{
                     name: '',
                     email: '',
                     username: '',
                     password: '',
                  }}
                  validationSchema={LoginSchema}
                  onSubmit={(values, actions) => {
                     setTimeout(() => {
                        alert(JSON.stringify(values, null, 2))
                        actions.setSubmitting(false)
                     }, 1000)
                  }}
               >
                  {(props) => (
                     <Form>
                        <Field name="username">
                           {({ field, form }) => (
                              <FormControl
                                 isInvalid={
                                    form.errors.username &&
                                    form.touched.username
                                 }
                                 isRequired
                                 my={4}
                              >
                                 <FormLabel htmlFor="username">
                                    Username
                                 </FormLabel>
                                 <Input
                                    {...field}
                                    id="username"
                                    placeholder="username"
                                 />
                                 <FormErrorMessage>
                                    {form.errors.username}
                                 </FormErrorMessage>
                              </FormControl>
                           )}
                        </Field>
                        <Field name="password">
                           {({ field, form }) => (
                              <FormControl
                                 isInvalid={
                                    form.errors.password &&
                                    form.touched.password
                                 }
                                 isRequired
                                 my={4}
                              >
                                 <FormLabel htmlFor="password">
                                    Password
                                 </FormLabel>
                                 <Input
                                    {...field}
                                    id="password"
                                    placeholder="password"
                                 />
                                 <FormErrorMessage>
                                    {form.errors.password}
                                 </FormErrorMessage>
                              </FormControl>
                           )}
                        </Field>
                        <Button
                           type="submit"
                           variantColor="teal"
                           variant="solid"
                           width="full"
                           mt={4}
                        >
                           Sign In
                        </Button>
                     </Form>
                  )}
               </Formik>
            </Box>
         </Box>
      </Flex>
   )
}
