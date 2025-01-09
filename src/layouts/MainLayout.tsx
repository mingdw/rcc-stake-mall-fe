import React,{FC,useState} from 'react';
import { HomeOutlined,ShoppingOutlined,AppstoreOutlined,TransactionOutlined,TeamOutlined,UserOutlined, CopyFilled, CopyOutlined } from '@ant-design/icons';
import { MenuProps,Input, Avatar, List, Divider } from 'antd';
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
import Compact from 'antd/es/space/Compact';
import Item from 'antd/es/list/Item';
import Paragraph from 'antd/es/typography/Paragraph';



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
const defaultAddeess = "qc502sd...Kj52"




const { useToken } = theme;
const MainLayout: FC = () => {
  const { address, isConnected } = useAccount()
  const [tconnect, setTconnect] = useState(false); //
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
  const supportedChains = [  { label: mainnet.name, value: mainnet.id },
    { label: sepolia.name, value: sepolia.id }]

  // 处理连接钱包
  const handleConnectWallet = () => {
    setTconnect(true); // 默认设置为已连接
    if (openConnectModal) {
      //openConnectModal()
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
    key: item.value.toString(),
    label: item.label,
    onClick: () => {
      if (window.ethereum) {
        window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${item.value.toString(16)}` }],
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
  const items2: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Avatar icon={<UserOutlined />} />
      ),
    },
    {
      key: '2',
      label: (
        <Paragraph copyable>{defaultAddeess}</Paragraph>
      ),
     
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          3rd menu item (disabled)
        </a>
      ),
      disabled: true,
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
      <div style={{textAlign:'right'}}>
        <Space direction="vertical" size="small">
          <Space.Compact>
            
          </Space.Compact>
        </Space>
      </div>
    )
    const { Option } = Select;
    const selectBefore = (
      <Select defaultValue={supportedChains[1].value}>
        {supportedChains.map((item) => (
          <Option value={item.value}>{item.label}</Option>
        ))}
       
      </Select>
    );
    const { useToken } = theme;
    const { token } = useToken();
    const contentStyle: React.CSSProperties = {
      backgroundColor: token.colorBgElevated,
      borderRadius: token.borderRadiusLG,
      boxShadow: token.boxShadowSecondary,
    };
  
    const menuStyle: React.CSSProperties = {
      boxShadow: 'none',
    };
  return (
    <Layout>
      <Header style={{ display: 'flex',backgroundColor:'white',height:'15%' }}>
        <Row style={{width:'100%',alignItems:'center'}}>
          <Col style={{textAlign:'center'}} span={4}>
            <a href={HOME_PATH_NAME}> <span className={classnames(mainCss.logoStyle,mainCss.hcqFont,mainCss.hcqStyle1)}>{t('header.logo')}</span> </a>
          </Col>
          <Col>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{marginLeft:'55px' }}/>
          </Col>
        
          <Col span={10} style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
              <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                <Search size={"middle"} placeholder={t('header.search.placeholder')} title={t('header.search.title')} onSearch={onSearch}  style={{ width: 200 }} />
                <Select   size={"middle"} defaultValue="简体中文"  onChange={handleChange} options={languges} style={{marginLeft:'10px'}}/>
              {tconnect ? (
                <Dropdown
                menu={{items:items2 }}
                dropdownRender={(menu) => (
                  <div style={contentStyle}>
                    {React.cloneElement(
                      menu as React.ReactElement<{
                        style: React.CSSProperties;
                      }>,
                      { style: menuStyle },
                    )}
                    <Divider style={{ margin: 0 }} />
                    <Space style={{ padding: 8 }}>
                      <Button type="primary">Click me!</Button>
                    </Space>
                  </div>
                )}
              > <Input addonBefore={selectBefore}  defaultValue={defaultAddeess} style={{width:'200px',marginLeft:'10px'}}/></Dropdown>
                
                 
              ) : (
                <Button size={"middle"} icon={<UserOutlined />} onClick={handleConnectWallet} style={{marginLeft:'10px'}}>
                  {t('walletconnect')}
                </Button>
              )}
            </div>
               
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
