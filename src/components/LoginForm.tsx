import * as React from 'react'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import {
   Box,
   FormControl,
   FormLabel,
   Input,
   Button,
   FormErrorMessage,
   InputRightElement,
   Icon,
   InputGroup,
} from '@chakra-ui/core'
import { Link as GatsbyLink } from 'gatsby'
import UserLoginSchema from '../models/validations/UserLoginSchema'
import UserLoginData from '../models/data/UserLoginData'
import { getUser, handleLogin } from '../services/auth'

const onSubmit = async (
   values: UserLoginData,
   actions: FormikHelpers<UserLoginData>
) => {
   actions.setSubmitting(true)
   let success = await handleLogin(values)
   console.log(getUser())
   console.log(success)
}

export default function LoginForm() {
   const [showPassword, setShowPassword] = React.useState(false)
   const handlePasswordVisibility = () => setShowPassword(!showPassword)
   return (
      <Formik
         initialValues={{
            name: '',
            email: '',
            username: '',
            password: '',
         }}
         validationSchema={UserLoginSchema}
         onSubmit={(
            values: UserLoginData,
            actions: FormikHelpers<UserLoginData>
         ) => {
            setShowPassword(false)
            onSubmit(values, actions)
         }}
      >
         <Form>
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
               variantColor="teal"
               variant="solid"
               width="full"
               my={4}
            >
               Login
            </Button>
            <Box>
               Don't have an account?{' '}
               <GatsbyLink to="/app/register">
                  <Button variant="link" variantColor="teal">
                     Register
                  </Button>
               </GatsbyLink>
            </Box>
         </Form>
      </Formik>
   )
}
