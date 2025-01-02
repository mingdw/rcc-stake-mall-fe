import { sepolia } from "viem/chains";
import { PublicClient, createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'





export const viemClients = (chaiId: number): PublicClient => {
  const clients: {
    [key: number]: PublicClient
  } = {
    [sepolia.id]: createPublicClient({
      chain: sepolia,
      transport: http()
    })
  }
  return clients[chaiId]
}