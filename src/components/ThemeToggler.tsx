import React from 'react'
import { useColorMode, IconButton, useColorModeValue } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
export default function ThemeToggler() {
   const { toggleColorMode } = useColorMode()
   const icon = useColorModeValue(<MoonIcon />, <SunIcon />)
   return (
      <IconButton
         icon={icon}
         onClick={toggleColorMode}
         variant="ghost"
         aria-label="theme toggle"
         mr={6}
      />
   )
}
