import { Box, useColorModeValue, useMediaQuery } from '@chakra-ui/react'
import * as React from 'react'

export default function CycleTextsButton({ texts }: { texts: string[] }) {
   console.log(texts)
   if (texts.length < 2) {
      console.error('Text arrays should be longer than 1 elements')
   }
   let [index, setIndex] = React.useState<number>(0)
   const cardBg = useColorModeValue('gray.100', 'whiteAlpha.200')

   const [isMobile] = useMediaQuery('(max-width: 767px)')
   return (
      <Box
         p={4}
         borderRadius={8}
         fontFamily="monospace"
         fontSize="lg"
         fontWeight="bold"
         textAlign="center"
         maxWidth={isMobile ? 'xs' : 'lg'}
         cursor="pointer"
         whiteSpace="nowrap"
         overflow="hidden"
         textOverflow="ellipsis"
         bg={cardBg}
         onClick={() => {
            if (index === texts.length - 1) {
               setIndex(0)
            } else {
               setIndex((prevIndex) => prevIndex + 1)
            }
         }}
      >
         {texts[index]}
      </Box>
   )
}
