import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from 'wagmi/chains';
// from https://cloud.walletconnect.com/
const ProjectId = 'e3242412afd6123ce1dda1de23a8c016'

export const config = getDefaultConfig({
  appName: 'Rcc Stake',
  projectId: ProjectId,
  chains: [
    sepolia
  ],
  ssr: true,
});

export const defaultChainId: number = sepolia.id