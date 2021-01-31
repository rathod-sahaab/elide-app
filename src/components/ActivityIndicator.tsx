import { Button } from '@chakra-ui/core'
import * as React from 'react'

export default function ActivityIndicator({ isActive, ...props }) {
   return (
      <Button
         {...props}
         size="xs"
         textTransform="uppercase"
         variantColor={isActive ? 'green' : 'yellow'}
      >
         {isActive ? 'active' : 'inactive'}
      </Button>
   )
}
