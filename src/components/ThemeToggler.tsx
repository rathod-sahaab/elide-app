import React from 'react'
import { useColorMode, IconButton } from '@chakra-ui/core'
export default function ThemeToggler() {
   const { colorMode, toggleColorMode } = useColorMode()
   return (
      <IconButton
         icon={colorMode === 'light' ? 'moon' : 'sun'}
         onClick={toggleColorMode}
         variant="ghost"
         aria-label="theme toggle"
      />
   )
}
