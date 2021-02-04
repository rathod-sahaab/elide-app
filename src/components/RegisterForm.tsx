import { Field, Form, Formik, FormikHelpers } from 'formik'
import * as React from 'react'
import {
   Box,
   FormControl,
   FormLabel,
   Input,
   Button,
   FormErrorMessage,
   InputGroup,
   InputRightElement,
   Icon,
   // Link,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Link as GatsbyLink } from 'gatsby'

import UserRegistrationData from '../models/data/UserRegistrationData'
import UserRegisterSchema from '../models/validations/UserRegisterSchema'

const onSubmit = async (
   values: UserRegistrationData,
   actions: FormikHelpers<UserRegistrationData>
) => {
   fetch('/api/users/register', {
      method: 'POST', // or 'PUT'
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
   })
      .then((response) => {
         console.log(response)
         return response.json()
      })
      .then((data) => {
         console.log('Success:', data)
         actions.setSubmitting(false)
      })
      .catch((error) => {
         console.error('Error:', error)
      })
}

export default function RegisterForm() {
   const [showPassword, setShowPassword] = useState(false)
   const handlePasswordVisibility = () => setShowPassword(!showPassword)
   return (
      <Formik
         initialValues={{
            name: '',
            email: '',
            username: '',
            password: '',
         }}
         validationSchema={UserRegisterSchema}
         onSubmit={(
            values: UserRegistrationData,
            actions: FormikHelpers<UserRegistrationData>
         ) => {
            setShowPassword(false)
            onSubmit(values, actions)
         }}
      >
         <Form>
            <Field name="name">
               {({ field, form }) => (
                  <FormControl
                     isInvalid={form.errors.name && form.touched.name}
                     isRequired
                     my={4}
                  >
                     <FormLabel htmlFor="name">Name</FormLabel>
                     <Input {...field} id="name" placeholder="name" />
                     <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
               )}
            </Field>
            <Field name="email">
               {({ field, form }) => (
                  <FormControl
                     isInvalid={form.errors.email && form.touched.email}
                     isRequired
                     my={4}
                  >
                     <FormLabel htmlFor="email">Email</FormLabel>
                     <Input {...field} id="email" placeholder="email" />
                     <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
               )}
            </Field>
            <Field name="username">
               {({ field, form }) => (
                  <FormControl
                     isInvalid={form.errors.username && form.touched.username}
                     isRequired
                     my={4}
                  >
                     <FormLabel htmlFor="username">Username</FormLabel>
                     <Input {...field} id="username" placeholder="username" />
                     <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                  </FormControl>
               )}
            </Field>
            <Field name="password">
               {({ field, form }) => (
                  <FormControl
                     isInvalid={form.errors.password && form.touched.password}
                     isRequired
                     my={4}
                  >
                     <FormLabel htmlFor="password">Password</FormLabel>
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
                     <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
               )}
            </Field>
            <Button
               type="submit"
               colorScheme="teal"
               variant="solid"
               width="full"
               my={4}
            >
               Register
            </Button>
            <Box>
               Already a user?{' '}
               <GatsbyLink to="/app/login">
                  <Button variant="link" colorScheme="teal">
                     Login
                  </Button>
               </GatsbyLink>
            </Box>
         </Form>
      </Formik>
   )
}
