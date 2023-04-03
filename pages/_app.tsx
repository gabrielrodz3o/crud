import * as React from 'react'
// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app';


const App:React.FC <AppProps>=({Component,pageProps}) =>{
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider>
   <Component {...pageProps} />
    </ChakraProvider>
  )
}
export default App