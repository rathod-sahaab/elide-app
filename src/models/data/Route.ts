import * as Yup from 'yup'

export interface Route {
   id: string
   slug: string
   target: string
   active: boolean
}

export interface CreateRouteData {
   slug: string
   target: string
   active: boolean
}

export interface UpdateRouteData {
   id: string
   slug?: string
   target?: string
   active?: boolean
}

export const RouteSchema = Yup.object({
   slug: Yup.string()
      .matches(
         /^([a-zA-Z0-9-_]+)$/,
         'Only a-z, A-Z, 0-9, -, _ can be used in slug'
      )
      .max(60, "That's way too long")
      .required('Required'),
   target: Yup.string().url('Invalid URL').required('Required'),
   active: Yup.bool().required('Required'),
})
