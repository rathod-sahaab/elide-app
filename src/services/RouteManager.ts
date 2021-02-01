import { CreateRouteData, Route } from '../models/data/Route'

export const createRoute = async ({
   slug,
   target,
   active,
}: CreateRouteData) => {
   return fetch('/api/routes/create', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({ slug, target, active }),
   })
      .then(async (response) => {
         console.log(response)
         if (response.status == 200) {
            let route: Route = await response.json()
            return route
         } else {
            return null
         }
      })
      .catch((error) => {
         console.error('Error:', error)
         return null
      })
}

export const myRoutes = async () => {
   return fetch('/api/routes/my')
      .then(async (response) => {
         console.log(response)
         if (response.status == 200) {
            let routes: Route[] = await response.json()
            return routes
         } else {
            return null
         }
      })
      .catch((error) => {
         console.error('Error:', error)
         return null
      })
}
