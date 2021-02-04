import React from 'react'
import { useColorMode, IconButton } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
export default function ThemeToggler() {
   const { colorMode, toggleColorMode } = useColorMode()
   return (
      <IconButton
         icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
         onClick={toggleColorMode}
         variant="ghost"
         aria-label="theme toggle"
      />
   )
}
