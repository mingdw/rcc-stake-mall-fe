import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { sepolia } from 'viem/chains'
import { http } from 'viem'

// 打印环境变量用于调试
console.log('WalletConnect Project ID:', import.meta.env.VITE_PUBLIC_WALLET_CONNECT_PROJECT_ID)

export const config = getDefaultConfig({
  appName: 'RCC Stake Pool',
  projectId: import.meta.env.VITE_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'c1054524b1fc46c4f876bd10a1fc4d08',
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(
      `https://sepolia.infura.io/v3/${import.meta.env.VITE_PUBLIC_INFURA_API_KEY}`
    ),
  }
})

export const chains = [sepolia]