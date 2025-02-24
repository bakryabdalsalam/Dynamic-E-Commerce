import React from 'react'
import type { AppType } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../store/store'
import '../styles/globals.css'

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp