import { Field, Form, Formik, FormikHelpers } from 'formik'
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
   InputGroup,
   InputRightElement,
   Icon,
   Link,
} from '@chakra-ui/core'
import { useState } from 'react'
import { Link as GatsbyLink } from 'gatsby'

const RegisterSchema = Yup.object({
   name: Yup.string().max(20).required('Required'),
   email: Yup.string().email('Invalid email').required('Required'),
   username: Yup.string().max(20).required('Required'),
   password: Yup.string().required('Required'),
})

interface RegistrationData {
   name: string
   email: string
   username: string
   password: string
}

const onSubmit = async (
   values: RegistrationData,
   actions: FormikHelpers<RegistrationData>
) => {
   setTimeout(() => {
      alert(JSON.stringify(values, null, 2))
      actions.setSubmitting(false)
   }, 1000)
   // fetch('http://localhost:9600/api/users/register', {
   //    method: 'POST', // or 'PUT'
   //    headers: {
   //       'Content-Type': 'application/json',
   //    },
   //    body: JSON.stringify(values),
   // })
   //    .then((response) => response.json())
   //    .then((data) => {
   //       console.log('Success:', data)
   //       actions.setSubmitting(false)
   //    })
   //    .catch((error) => {
   //       console.error('Error:', error)
   //    })
}

export default function RegisterForm() {
   const [showPassword, setShowPassword] = useState(false)
   const handlePasswordVisibility = () => setShowPassword(!showPassword)
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
               <Heading>Register</Heading>
            </Box>
            <Box my={4} textAlign="left">
               <Formik
                  initialValues={{
                     name: '',
                     email: '',
                     username: '',
                     password: '',
                  }}
                  validationSchema={RegisterSchema}
                  onSubmit={(
                     values: RegistrationData,
                     actions: FormikHelpers<RegistrationData>
                  ) => {
                     setShowPassword(false)
                     onSubmit(values, actions)
                  }}
               >
                  {(props) => (
                     <Form>
                        <Field name="name">
                           {({ field, form }) => (
                              <FormControl
                                 isInvalid={
                                    form.errors.name && form.touched.name
                                 }
                                 isRequired
                                 my={4}
                              >
                                 <FormLabel htmlFor="name">Name</FormLabel>
                                 <Input
                                    {...field}
                                    id="name"
                                    placeholder="name"
                                 />
                                 <FormErrorMessage>
                                    {form.errors.name}
                                 </FormErrorMessage>
                              </FormControl>
                           )}
                        </Field>
                        <Field name="email">
                           {({ field, form }) => (
                              <FormControl
                                 isInvalid={
                                    form.errors.email && form.touched.email
                                 }
                                 isRequired
                                 my={4}
                              >
                                 <FormLabel htmlFor="email">Email</FormLabel>
                                 <Input
                                    {...field}
                                    id="email"
                                    placeholder="email"
                                 />
                                 <FormErrorMessage>
                                    {form.errors.email}
                                 </FormErrorMessage>
                              </FormControl>
                           )}
                        </Field>
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
                                 <InputGroup>
                                    <Input
                                       {...field}
                                       type={showPassword ? 'text' : 'password'}
                                       placeholder="*******"
                                       size="lg"
                                    />
                                    <InputRightElement width="3rem">
                                       <Button
                                          h="1.5rem"
                                          size="sm"
                                          onClick={handlePasswordVisibility}
                                       >
                                          {showPassword ? (
                                             <Icon name="view-off" />
                                          ) : (
                                             <Icon name="view" />
                                          )}
                                       </Button>
                                    </InputRightElement>
                                 </InputGroup>
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
                           my={4}
                        >
                           Register
                        </Button>
                     </Form>
                  )}
               </Formik>
            </Box>
            Already a user?{' '}
            <GatsbyLink to="/login">
               <Link color="teal.500">Login</Link>
            </GatsbyLink>
         </Box>
      </Flex>
   )
}
