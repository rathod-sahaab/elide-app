import * as React from 'react'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { CreateRouteData, RouteSchema, Route } from '../models/data/Route'
import {
   Button,
   FormControl,
   FormErrorMessage,
   FormLabel,
   Input,
   InputGroup,
   InputLeftAddon,
   Switch,
} from '@chakra-ui/react'
import { VStack } from '@chakra-ui/react'
import { createRoute } from '../services/RouteManager'

const onSubmit = async (
   values: CreateRouteData,
   actions: FormikHelpers<CreateRouteData>
) => {
   actions.setSubmitting(true)
   let success = await createRoute(values)
   actions.setSubmitting(false)
   return success
}

export default function CreateRouteForm({
   callOnSuccess,
}: {
   callOnSuccess: (route: Route) => void
}) {
   return (
      <Formik
         initialValues={{
            slug: '',
            target: '',
            active: true,
         }}
         validationSchema={RouteSchema}
         onSubmit={async (
            values: CreateRouteData,
            actions: FormikHelpers<CreateRouteData>
         ) => {
            let route = await onSubmit(values, actions)
            if (route) {
               callOnSuccess(route)
            } else {
               alert('Error creating route!')
            }
         }}
      >
         <Form>
            <VStack spacing={4}>
               <Field name="slug">
                  {({ field, form }) => (
                     <FormControl
                        width="full"
                        isInvalid={form.errors.slug && form.touched.slug}
                        isRequired
                     >
                        <FormLabel htmlFor="slug">Slug</FormLabel>
                        <InputGroup borderRadius={8}>
                           <InputLeftAddon
                              borderRadius={0}
                              borderTopLeftRadius={8}
                              borderBottomLeftRadius={8}
                              children="elide.me/"
                           />
                           <Input
                              {...field}
                              borderRadius={0}
                              borderTopRightRadius={8}
                              borderBottomRightRadius={8}
                              id="slug"
                              placeholder="slug"
                           />
                        </InputGroup>

                        <FormErrorMessage>{form.errors.slug}</FormErrorMessage>
                     </FormControl>
                  )}
               </Field>
               <Field width="full" name="target">
                  {({ field, form }) => (
                     <FormControl
                        width="full"
                        borderRadius={8}
                        isInvalid={form.errors.target && form.touched.target}
                        isRequired
                     >
                        <FormLabel htmlFor="target">Target</FormLabel>
                        <Input
                           {...field}
                           borderRadius={8}
                           id="target"
                           placeholder="target"
                        />
                        <FormErrorMessage>
                           {form.errors.target}
                        </FormErrorMessage>
                     </FormControl>
                  )}
               </Field>
               <Field width="full" name="active">
                  {({ field, form }) => (
                     <FormControl
                        width="full"
                        isInvalid={form.errors.active && form.touched.active}
                     >
                        <FormLabel htmlFor="active">Activate</FormLabel>
                        <Switch
                           {...field}
                           id="active"
                           name="active"
                           defaultChecked={true}
                        />
                        <FormErrorMessage>
                           {form.errors.active}
                        </FormErrorMessage>
                     </FormControl>
                  )}
               </Field>
               <Button
                  type="submit"
                  colorScheme="teal"
                  variant="solid"
                  size="md"
                  borderRadius={8}
                  alignSelf="flex-end"
               >
                  Create
               </Button>
            </VStack>
         </Form>
      </Formik>
   )
}
