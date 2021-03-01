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
   InputGroup,
   IconButton,
} from '@chakra-ui/react'
import { Link as GatsbyLink, navigate } from 'gatsby'
import UserLoginSchema from '../models/validations/UserLoginSchema'
import UserLoginData from '../models/data/UserLoginData'
import { handleLogin } from '../services/auth'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

const onSubmit = async (
   values: UserLoginData,
   actions: FormikHelpers<UserLoginData>
) => {
   actions.setSubmitting(true)
   let success = await handleLogin(values)
   if (success) {
      navigate('/app/dashboard')
   } else {
      alert('error logging in')
   }
   actions.setSubmitting(false)
}

export default function LoginForm() {
   const [showPassword, setShowPassword] = React.useState(false)
   const handlePasswordVisibility = () => setShowPassword(!showPassword)
   return (
      <Formik
         initialValues={{
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
         {(props) => (
            <Form>
               <Field name="username">
                  {({ field, form }) => (
                     <FormControl
                        isInvalid={
                           form.errors.username && form.touched.username
                        }
                        isRequired
                        my={4}
                     >
                        <FormLabel htmlFor="username">Username</FormLabel>
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
                           form.errors.password && form.touched.password
                        }
                        isRequired
                        my={4}
                     >
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <InputGroup>
                           <Input
                              {...field}
                              type={showPassword ? 'text' : 'password'}
                              placeholder="password"
                           />
                           <InputRightElement width="3rem">
                              <IconButton
                                 aria-label="toggle password visibility"
                                 icon={
                                    showPassword ? (
                                       <ViewOffIcon />
                                    ) : (
                                       <ViewIcon />
                                    )
                                 }
                                 h="1.5rem"
                                 size="sm"
                                 onClick={handlePasswordVisibility}
                              />
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
                  colorScheme="green"
                  variant="solid"
                  width="full"
                  isLoading={props.isSubmitting}
                  my={4}
               >
                  Login
               </Button>
               <Box>
                  Don't have an account?{' '}
                  <GatsbyLink to="/app/register">
                     <Button variant="link" colorScheme="green">
                        Register
                     </Button>
                  </GatsbyLink>
               </Box>
            </Form>
         )}
      </Formik>
   )
}
