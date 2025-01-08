import { http } from 'viem'
import { createConfig } from 'wagmi'
import { mainnet, sepolia } from 'viem/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

// WalletConnect projectId 和 Infura projectId
const walletConnectProjectId = import.meta.env.VITE_PUBLIC_WALLET_CONNECT_PROJECT_ID
const infuraApiKey = import.meta.env.VITE_PUBLIC_INFURA_API_KEY

console.info(walletConnectProjectId+": "+infuraApiKey)
// 自定义 RPC URLs
const customChains = [
  {
    ...mainnet,
    rpcUrls: {
      ...mainnet.rpcUrls,
      default: { 
        http: [`https://mainnet.infura.io/v3/${infuraApiKey}`] 
      },
      public: { 
        http: [`https://mainnet.infura.io/v3/${infuraApiKey}`] 
      }
    }
  },
  {
    ...sepolia,
    rpcUrls: {
      ...sepolia.rpcUrls,
      default: { 
        http: [`https://sepolia.infura.io/v3/${infuraApiKey}`] 
      },
      public: { 
        http: [`https://sepolia.infura.io/v3/${infuraApiKey}`] 
      }
    }
  }
]

// 配置 RainbowKit 和 wagmi
const config = getDefaultConfig({
  appName: 'RCC token pledge',
  projectId: walletConnectProjectId,
  chains: [mainnet,sepolia],
  transports: {
    [mainnet.id]: http(customChains[0].rpcUrls.default.http[0]),
    [sepolia.id]: http(customChains[1].rpcUrls.default.http[0]),
  },
})

export { config }