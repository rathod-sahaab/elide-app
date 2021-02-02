import * as React from 'react'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import {
   CreateRouteData,
   RouteSchema,
   Route,
   UpdateRouteData,
} from '../models/data/Route'
import {
   Button,
   FormControl,
   FormErrorMessage,
   FormLabel,
   Input,
   InputGroup,
   InputLeftAddon,
   Switch,
} from '@chakra-ui/core'
import { VStack } from '@chakra-ui/react'
import { updateRoute } from '../services/RouteManager'

const onSubmit = async ({
   newValues,
   actions,
   id,
}: {
   newValues: CreateRouteData
   actions: FormikHelpers<CreateRouteData>
   id: string
}) => {
   actions.setSubmitting(true)

   // prepare payload to send in request
   let payloadJson: UpdateRouteData = { id, ...newValues }
   /*
    * Server accepts full and not just the changes, it's easiser this way
    *
   // Send only the keys that have changed
   // FIXME: iterate over with keys
   if (newValues.slug !== oldValues.slug) {
      payloadJson.slug = newValues.slug
   }
   if (newValues.target !== oldValues.target) {
      payloadJson.target = newValues.target
   }
   if (newValues.active !== oldValues.active) {
      payloadJson.active = newValues.active
   }
   */

   let success = await updateRoute(payloadJson)
   actions.setSubmitting(false)
   return success
}

export default function UpdateRouteForm({
   callOnSuccess,
   route,
}: {
   callOnSuccess: (route: Route) => void
   route: Route
}) {
   return (
      <Formik
         initialValues={{
            slug: route.slug,
            target: route.target,
            active: route.active,
         }}
         validationSchema={RouteSchema}
         onSubmit={async (
            values: CreateRouteData,
            actions: FormikHelpers<CreateRouteData>
         ) => {
            let result = await onSubmit({
               newValues: values,
               actions,
               id: route.id,
            })
            if (result) {
               callOnSuccess(result)
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
                           defaultIsChecked
                        />
                        <FormErrorMessage>
                           {form.errors.active}
                        </FormErrorMessage>
                     </FormControl>
                  )}
               </Field>
               <Button
                  type="submit"
                  variantColor="teal"
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
