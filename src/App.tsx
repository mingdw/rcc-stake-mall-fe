import React from "react";
import {RouterProvider} from "react-router-dom";
import router from "./router/router";
import  './assets/css/bootstrap.min.css'
import  './assets/css/materialdesignicons.min.css'
import  './assets/css/style.min.css'
import  './assets/fonts/iconfont.css'
import './assets/fonts/iconfont.js'
import { WagmiProvider } from 'wagmi'
import {
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from './config/wagmi'
import '@rainbow-me/rainbowkit/styles.css'

// 创建 QueryClient 实例
const queryClient = new QueryClient()

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider  theme={darkTheme()}>
          <RouterProvider router={router}></RouterProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
