import {
   Stat,
   Box,
   StatLabel,
   StatNumber,
   StatHelpText,
   useColorModeValue,
} from '@chakra-ui/react'
import * as React from 'react'

export default function VisitStats({
   quant,
   heading,
   helperText,
}: {
   quant: string
   heading: string
   helperText: string
}) {
   const cardBg = useColorModeValue('gray.100', 'whiteAlpha.200')
   return (
      <Box bg={cardBg} borderRadius={12} p={10}>
         <Stat p={4}>
            <StatLabel>{heading}</StatLabel>
            <StatNumber>{quant}</StatNumber>
            <StatHelpText>{helperText}</StatHelpText>
         </Stat>
      </Box>
   )
}
