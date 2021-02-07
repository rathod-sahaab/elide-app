import {
   Stat,
   Box,
   StatLabel,
   StatNumber,
   StatHelpText,
   useColorModeValue,
} from '@chakra-ui/react'
import * as React from 'react'

export default function VisitStats({ visitCount, visitHeading, helperText }) {
   const cardBg = useColorModeValue('gray.100', 'whiteAlpha.200')
   return (
      <Box bg={cardBg} borderRadius={12} p={10}>
         <Stat p={4}>
            <StatLabel>{visitHeading}</StatLabel>
            <StatNumber>{visitCount}</StatNumber>
            <StatHelpText>{helperText}</StatHelpText>
         </Stat>
      </Box>
   )
}
