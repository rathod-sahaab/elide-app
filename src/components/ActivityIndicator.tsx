import { Button } from '@chakra-ui/react'
import * as React from 'react'

export default function ActivityIndicator({ isActive, ...props }) {
   return (
      <Button
         {...props}
         size="xs"
         textTransform="uppercase"
         colorScheme={isActive ? 'green' : 'yellow'}
      >
         {isActive ? 'active' : 'inactive'}
      </Button>
   )
}
