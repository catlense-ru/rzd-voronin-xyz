import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import { Provider, useDispatch } from 'react-redux'
import { createStore } from 'redux'
import axios from 'axios'
import config from '../config'

function MyApp({ Component, pageProps }: AppProps) {
  
  const defaultState = {
    user: {}
  }
  
  const reducer = (state = defaultState, action:any) => {
    switch(action.type) {
      case "JOIN_USER":
        return {...state, user: action.payload}
  
      default:
        return state
    }
  }
  
  const store = createStore(reducer)
  
  return (
    <>
      <NextNProgress
        color="#f8563b"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
      />
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
