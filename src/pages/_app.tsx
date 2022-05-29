import type { AppProps } from 'next/app'

import { inspect } from '@xstate/inspect'

import 'src/styles/globals.css'

if (typeof window !== 'undefined') {
  inspect({
    /* options */
  })
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
