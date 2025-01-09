import React, { useState } from 'react'
import { useAccount, useBalance, useDisconnect, useChainId, useConfig } from 'wagmi'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { CopyOutlined } from '@ant-design/icons'
import { Button, Typography, Dropdown, Space } from 'antd'

const WalletInfo = () => {
  const { address, isConnected } = useAccount()
  const { data: ethBalance } = useBalance({ address })
  const { disconnect } = useDisconnect()
  const chainId = useChainId()
  const config = useConfig()
  const currentChain = config.chains.find(chain => chain.id === chainId)

  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleDisconnect = () => {
    disconnect()
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', background: '#f9f9f9' }}>
      {isConnected ? (
        <div>
          <div onClick={toggleDropdown} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <Typography.Text strong>{address?.slice(0, 6)}...{address?.slice(-4)}</Typography.Text>
            <CopyToClipboard text={address || ''}>
              <Button icon={<CopyOutlined />} size="small" style={{ marginLeft: '8px' }}>复制地址</Button>
            </CopyToClipboard>
          </div>
          {isOpen && (
            <div style={{ marginTop: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
              <div>
                <strong>当前网络:</strong> {currentChain?.name || '未知网络'}
              </div>
              <div>
                <strong>ETH 余额:</strong> {ethBalance?.formatted} ETH
              </div>
              <div>
                <strong>R 币余额:</strong> 100 R {/* 这里可以替换为实际获取 R 币余额的逻辑 */}
              </div>
              <Button type="primary" onClick={handleDisconnect} style={{ marginTop: '10px' }}>
                退出登录
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div>请连接钱包</div>
      )}
    </div>
  )
}

export default WalletInfo 