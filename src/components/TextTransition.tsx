import { Button } from '@chakra-ui/react'
import * as React from 'react'

export default function CycleTextsButton({ texts }: { texts: string[] }) {
   console.log(texts)
   if (texts.length < 2) {
      console.error('Text arrays should be longer than 1 elements')
   }
   let [index, setIndex] = React.useState<number>(0)
   return (
      <Button
         p={4}
         borderRadius={8}
         size="lg"
         fontFamily="monospace"
         onClick={() => {
            if (index === texts.length - 1) {
               setIndex(0)
            } else {
               setIndex((prevIndex) => prevIndex + 1)
            }
         }}
      >
         {texts[index]}
      </Button>
   )
}
