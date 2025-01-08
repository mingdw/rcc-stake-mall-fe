import React,{FC,useState} from 'react';
import { HomeOutlined,ShoppingOutlined,AppstoreOutlined,TransactionOutlined,TeamOutlined,UserOutlined } from '@ant-design/icons';
import type { MenuProps,Input } from 'antd';
import {  Col, Row, Layout, Menu, theme, Space,Select, Button,Image, Dropdown, Typography  } from 'antd';
import { Outlet,useNavigate   } from 'react-router-dom';
import classnames from 'classnames';

import mainCss from './MainLayout.module.scss'
import Search from 'antd/es/input/Search';
import { useTranslation  } from 'react-i18next';
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount, useDisconnect, useBalance, useChainId, useConfig } from 'wagmi'
import { type BaseError } from 'viem'
import { injected } from 'wagmi/connectors'
import { mainnet, sepolia } from 'wagmi/chains';


const { Header, Content, Footer, Sider } = Layout;


export const HOME_PATH_NAME = "home"

export const POOL_PATH_NAME = "pool"

export const PlEDGE_PATH_NAME = "pledge"

export const PRIZE_PATH_NAME = "prize"

export const ABOUT_PATH_NAME = "about"


const languges = [{
  value: 'zh',
  label: '简体中文',
},
{
  value: 'en',
  label: 'English',
},

]
type MenuItem = Required<MenuProps>['items'][number];

const MainLayout: FC = () => {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const chainId = useChainId()
  const config = useConfig()
  const { openConnectModal } = useConnectModal()
  const { data: balance } = useBalance({
    address: address,
    chainId: chainId
  })
  
  const currentChain = config.chains.find(chain => chain.id === chainId)
  // 支持的网络列表
  const supportedChains = [mainnet, sepolia]

  // 处理连接钱包
  const handleConnectWallet = () => {
    if (openConnectModal) {
      openConnectModal()
    }
  }

  // 钱包菜单项
  const walletItems: MenuItem[] = [
    {
      key: 'disconnect',
      label: '断开连接',
      onClick: () => disconnect()
    }
  ]

  // 网络切换菜单项
  const networkItems: MenuItem[] = supportedChains.map((item) => ({
    key: item.id.toString(),
    label: item.name,
    onClick: () => {
      if (window.ethereum) {
        window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${item.id.toString(16)}` }],
        }).catch((error: any) => {
          console.error('切换网络失败:', error)
        })
      }
    }
  }))
  const [current, setCurrent] = useState('home');
  const navigate = useNavigate()

  const {t, i18n } = useTranslation();
  const items: MenuItem[] = [
    {
      label: t('header.nav.home'),
      key: HOME_PATH_NAME,
      icon:<HomeOutlined />,
    },
    {
      label:  t('header.nav.pool'),
      key: POOL_PATH_NAME,
      icon: <ShoppingOutlined />,
    },
    {
      label:  t('header.nav.pledge'),
      key: PlEDGE_PATH_NAME,
      icon: <AppstoreOutlined />,
    },

   {
      label:  t('header.nav.prize'),
      key: PRIZE_PATH_NAME,
      icon: <TransactionOutlined />,
    },
    {
      label:  t('header.nav.about'),
      key: ABOUT_PATH_NAME,
      icon: <TeamOutlined />
    },

  ];


    const onClick: MenuProps['onClick'] = (e) => {
      console.log('click ', e);
      setCurrent(e.key);
      navigate('/'+e.key)
    };

    const handleChange = (value: string) => {
      console.info("选择语言： ",value)
      i18n.changeLanguage(value)
    };

    const onSearch = (value: string) => {
      navigate('/transactionList')
    };
   
  
    const WalletContent = () => (
      <Dropdown 
        menu={{ items: walletItems }} 
        trigger={['click']} 
        placement="bottomRight"
      >
        <Button>
          <Space>
            <Dropdown 
              menu={{ items: networkItems }} 
              trigger={['click']} 
              placement="bottomLeft"
            >
              <Typography.Text>
                {currentChain?.name || '选择网络'}
              </Typography.Text>
            </Dropdown>
            <span>
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
            {balance && (
              <span>
                {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
              </span>
            )}
          </Space>
        </Button>
      </Dropdown>
    
    )
  return (
    <Layout>
      <Header style={{ display: 'flex',backgroundColor:'white',height:'15%' }}>
        <Row justify="space-around" style={{width:'100%',alignItems:'center'}}>
          <Col style={{textAlign:'center'}}>
            <a href={HOME_PATH_NAME}> <span className={classnames(mainCss.logoStyle,mainCss.hcqFont,mainCss.hcqStyle1)}>{t('header.logo')}</span> </a>
          </Col>
          <Col span={10} style={{backgroundColor:'green',textAlign:'center'}}>
          <div style={{width:'100%'}}>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}/>
           
          </div>
        
          </Col>
          <Col style={{display:'flex',justifyContent:'center',alignItems:'center',fontSize:'8px'}}>
            <Search size={"middle"} placeholder={t('header.search.placeholder')} title={t('header.search.title')} allowClear onSearch={onSearch}  style={{ width: 200 }} />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Space direction='horizontal' align='center'>
              <Select   size={"middle"} defaultValue="简体中文"  onChange={handleChange} options={languges} />
              {isConnected ? (
                <WalletContent />
              ) : (
                <Button size={"middle"} icon={<UserOutlined />} onClick={handleConnectWallet}>
                  {t('walletconnect')}
                </Button>
              )}
            </Space>
          </Col>
         
        </Row>

      
      </Header>
      <Content style={{ padding: '0 48px' }}>
         <Outlet/>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default MainLayout;
