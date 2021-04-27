import React from 'react'
import { VStack } from '@chakra-ui/react'
import { Dispatch, SetStateAction } from 'react'
import { Route } from '../models/data/Route'
import RouteListTile from './RouteListTile'
interface Props {
   routesData: Route[]
   onUpdateOpen: () => void
   onDeleteOpen: () => void
   setRouteToEdit: Dispatch<SetStateAction<Route>>
   setRouteToDelete: Dispatch<SetStateAction<Route>>
}
const RoutesList: React.FC<Props> = ({
   routesData,
   onUpdateOpen,
   onDeleteOpen,
   setRouteToEdit,
   setRouteToDelete,
}) => {
   return (
      <VStack spacing={4}>
         {routesData.map((route) => {
            return (
               <RouteListTile
                  key={route.id}
                  route={route}
                  onUpdateOpen={onUpdateOpen}
                  onDeleteOpen={onDeleteOpen}
                  setRouteToEdit={setRouteToEdit}
                  setRouteToDelete={setRouteToDelete}
               ></RouteListTile>
            )
         })}
      </VStack>
   )
}
export default RoutesList
