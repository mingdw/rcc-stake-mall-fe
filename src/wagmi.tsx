import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { sepolia } from 'viem/chains'
import { http } from 'viem'

export const config = getDefaultConfig({
  appName: 'RCC Stake Pool',
  projectId: import.meta.env.VITE_PUBLIC_WALLET_CONNECT_PROJECT_ID || '',
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(
      `https://sepolia.infura.io/v3/${import.meta.env.VITE_PUBLIC_INFURA_API_KEY}`
    ),
  }
})

export const chains = [sepolia]