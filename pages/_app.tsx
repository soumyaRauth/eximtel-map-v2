import '../styles/globals.css'
import type { AppProps } from 'next/app'

function EximtelMap({ Component, pageProps }: AppProps) {
  console.log("ALL THE PAGE PROPS");
  console.log(pageProps);
  
  return <Component {...pageProps} />
}

export default EximtelMap
