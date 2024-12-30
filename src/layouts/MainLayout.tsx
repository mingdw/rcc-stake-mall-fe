import React,{FC,useState} from 'react';
import { HomeOutlined,ShoppingOutlined,AppstoreOutlined,TransactionOutlined,TeamOutlined } from '@ant-design/icons';
import type { MenuProps,Input } from 'antd';
import {  Col, Row, Layout, Menu, theme, Space,Select, Button  } from 'antd';
import { Outlet,useNavigate   } from 'react-router-dom';
import classnames from 'classnames';

import mainCss from './MainLayout.module.scss'
import Search from 'antd/es/input/Search';
import { useTranslation  } from 'react-i18next';

const { Header, Content, Footer, Sider } = Layout;


export const HOME_PATH_NAME = "home"

export const POOL_PATH_NAME = "pool"

export const PlEDGE_PATH_NAME = "pledge"

export const PRIZE_PATH_NAME = "prize"

export const ABOUT_PATH_NAME = "about"

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: '首页',
    key: HOME_PATH_NAME,
    icon:<HomeOutlined />,
  },
  {
    label: '质押池',
    key: POOL_PATH_NAME,
    icon: <ShoppingOutlined />,
  },
  {
    label: '质押',
    key: PlEDGE_PATH_NAME,
    icon: <AppstoreOutlined />,
  },

 {
    label: '领奖',
    key: PRIZE_PATH_NAME,
    icon: <TransactionOutlined />,
  },
  {
    label: '关于我们',
    key: ABOUT_PATH_NAME,
    icon: <TeamOutlined />
  },

];

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
  const [current, setCurrent] = useState('home');
  const navigate = useNavigate()
  const { i18n } = useTranslation();

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
    navigate('/'+e.key)
  };

  const handleChange = (value: string) => {
    i18n.changeLanguage(value)
  };

  const onSearch = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <Layout>
      <Header style={{ display: 'flex',backgroundColor:'white',height:'15%' }}>
        <Row justify="space-around" style={{width:'100%'}}>
          <Col span={6}>
            <a href={HOME_PATH_NAME}> <span className={classnames(mainCss.logoStyle,mainCss.hcqFont,mainCss.hcqStyle1)}>RCC代币质押</span> </a>

          </Col>
          <Col span={10}>
            <Space size={100}>
              <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
            </Space>
           
          </Col>
          
          <Col span={8} style={{display:'flex',justifyContent:'center',alignItems:'center',fontSize:'8px'}}>
          <Search placeholder="请输入交易地址/账户" onSearch={onSearch} enterButton='搜索' />&nbsp;&nbsp;&nbsp;&nbsp;
            <Space direction='horizontal' size="large" align='center'>
              <Select  defaultValue="简体中文"   style={{ width: 100 }} onChange={handleChange} options={languges} />
              <Button style={{backgroundColor:'#15C377',color:'white'}}>{i18n('walletconnect')}</Button>
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