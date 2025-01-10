import React, { FC, useState } from 'react';
import { LogoutOutlined, CheckOutlined, HomeOutlined, ShoppingOutlined, AppstoreOutlined, TransactionOutlined, TeamOutlined, UserOutlined, CopyFilled, CopyOutlined, RightOutlined } from '@ant-design/icons';
import { MenuProps, Input, Avatar, List, Divider, Tooltip, Tabs, Card } from 'antd';
import { Col, Row, Layout, Menu, theme, Space, Select, Button, Image, Dropdown, Typography } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import classnames from 'classnames';

import mainCss from './MainLayout.module.scss'
import Search from 'antd/es/input/Search';
import { useTranslation } from 'react-i18next';
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount, useDisconnect, useBalance, useChainId, useConfig } from 'wagmi'
import { type BaseError } from 'viem'
import { injected } from 'wagmi/connectors'
import { mainnet, sepolia } from 'wagmi/chains';
import Link from 'antd/es/typography/Link';

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


const MainLayout: FC = () => {

  type MenuItem = Required<MenuProps>['items'][number];
  const defaultAddeess = "0x127kkb...Kj52"
  const [tconnect, setTconnect] = useState(false); //
  const { useToken } = theme;
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
  const supportedChains = [{ label: mainnet.name, value: mainnet.id },
  { label: sepolia.name, value: sepolia.id }]

  // 处理连接钱包
  const handleConnectWallet = () => {
    setTconnect(true); // 默认设置为已连接
    // if (openConnectModal) {
    //   //openConnectModal()
    // }
  }

  const [current, setCurrent] = useState('home');
  const navigate = useNavigate()

  const { t, i18n } = useTranslation();
  const items: MenuItem[] = [
    {
      label: t('header.nav.home'),
      key: HOME_PATH_NAME,
      icon: <HomeOutlined />,
    },
    {
      label: t('header.nav.pool'),
      key: POOL_PATH_NAME,
      icon: <ShoppingOutlined />,
    },
    {
      label: t('header.nav.pledge'),
      key: PlEDGE_PATH_NAME,
      icon: <AppstoreOutlined />,
    },

    {
      label: t('header.nav.prize'),
      key: PRIZE_PATH_NAME,
      icon: <TransactionOutlined />,
    },
    {
      label: t('header.nav.about'),
      key: ABOUT_PATH_NAME,
      icon: <TeamOutlined />
    },

  ];


  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
    navigate('/' + e.key)
  };

  const handleChange = (value: string) => {
    console.info("选择语言： ", value)
    i18n.changeLanguage(value)
  };

  const onSearch = (value: string) => {
    navigate('/transactionList')
  };

  const walletStyle: React.CSSProperties = {
    width: '250px',
    height: 'auto',
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: '10px',
    marginBottom: '20px'
  }



  const handleMenuClick = (key: string) => {
    console.info("select key: " + key);
    if (key == 'disconnect' && tconnect) {
      setTconnect(false)
    }
  }

  //登录成功后，显示钱包相关信息
  const WalletInfo = () => {
  const { Option } = Select;
  const [isCopy, setIsCopy] = useState(false);
  const handleCopy = () => {
    setIsCopy(true)
  }
  const accountMenu = [
    {
      key: 'account',
      title: <Typography onClick={() => handleMenuClick('account')}>个人中心</Typography>,
      icon: <UserOutlined className='text-info'/>,
      children: [],
    },

    {
      key: 'pledge',
      title: <Typography onClick={() => handleMenuClick('pledge')}>质押管理</Typography>,
      icon: <AppstoreOutlined className='text-info'/>,
      children: [],
    },
    {
      key: 'contract',
      title: <Typography onClick={() => handleMenuClick('contract')}>合约管理</Typography>,
      icon: <TransactionOutlined className='text-info'/>,
      children: [],
    },
    {
      key: 'disconnect2',
      title: '',

    },
    {
      key: 'disconnect',
      title: <Typography onClick={() => handleMenuClick('disconnect')}>退出登录</Typography>,
      icon: <LogoutOutlined className='text-danger'/>,
      children: [],
    },
    
  ]

    return (
      <Space direction="vertical" style={walletStyle} size={10}>
        <div style={{marginTop:'20px'}}>
            <Typography.Text>{defaultAddeess}</Typography.Text>&nbsp;&nbsp;&nbsp;
            {isCopy ? <CheckOutlined  className='text-success'/> : <a href='#' onClick={handleCopy}><CopyOutlined className='text-defult'/></a>}
        </div>
        <div>
          <Row>
            <Col span={8}>
              <span className='text-danger' style={{ fontSize: '12px'}}>
                1.34 ETH
              </span><br />
              <span style={{ fontSize: '10px', color: 'gray' }}>
                余额
              </span>
            </Col>
            <Col span={8}>
              <span className='text-danger' style={{ fontSize: '12px' }}>
                0.002 ETH
              </span><br />
              <span style={{ fontSize: '10px', color: 'gray' }}>
                质押
              </span>
            </Col>
            <Col span={8}>
              <span className='text-danger' style={{ fontSize: '12px'}}>
                126 R
              </span><br />
              <span style={{ fontSize: '10px', color: 'gray' }}>
                收益
              </span>
            </Col>
          </Row>
        </div>

        <div style={{ textAlign: 'left' }}>
          <Menu
            items={accountMenu.map(menuItem => ({
              key: menuItem.key,
              label: menuItem.title,
              icon: menuItem.icon,
              children: menuItem.children ? menuItem.children.map(subMenuItem => ({
                // Handle subMenuItem here if needed
              })) : undefined,
            }))}

          />
        </div>

      </Space>
    )
  }

  return (
    <Layout>
      <Header style={{ display: 'flex', backgroundColor: 'white', height: '15%' }}>
        <Row style={{ width: '100%', alignItems: 'center' }}>
          <Col style={{ textAlign: 'left', width: '30%' }} >
            <a style={{marginLeft:'10px'}} href={HOME_PATH_NAME}> <span className={classnames(mainCss.logoStyle, mainCss.hcqFont, mainCss.hcqStyle1)}>{t('header.logo')}</span> </a>
          </Col>
          <Col style={{ width: '40%' }}>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
          </Col>

          <Col style={{ width: '30%', display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Search size={"middle"} placeholder={t('header.search.placeholder')} title={t('header.search.title')} onSearch={onSearch} style={{ width: 200 }} />
              <Select size={"middle"} defaultValue="简体中文" onChange={handleChange} options={languges} style={{ marginLeft: '10px' }} />
              {tconnect ? (
                <Dropdown
                  dropdownRender={menu => (
                    <WalletInfo />
                  )}
                  placement="bottom"
                >
                  <Avatar style={{ backgroundColor: '#87d068', fontSize: '16px', marginLeft: '20px' }} icon={<UserOutlined />} />
                </Dropdown>
              ) : (
                <Button size={"middle"} icon={<UserOutlined />} onClick={handleConnectWallet} style={{ marginLeft: '10px' }}>
                  {t('walletconnect')}
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default MainLayout;


