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
  return (
    <Layout>
      <Header style={{ display: 'flex',backgroundColor:'white',height:'15%' }}>
        <Row justify="space-around" style={{width:'100%',alignItems:'center'}}>
          <Col>
            <a href={HOME_PATH_NAME}> <span className={classnames(mainCss.logoStyle,mainCss.hcqFont,mainCss.hcqStyle1)}>{t('header.logo')}</span> </a>

          </Col>
          <Col span={10} style={{backgroundColor:'green',textAlign:'center'}}>
          <div style={{width:'100%'}}>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}/>
           
          </div>
        
          </Col>
          <Select  defaultValue="简体中文"  onChange={handleChange} options={languges} />
          <Col style={{display:'flex',justifyContent:'center',alignItems:'center',fontSize:'8px'}}>
          <Search placeholder={t('header.placeholder.title')} onSearch={onSearch} enterButton={t('header.nav.search')} />&nbsp;&nbsp;&nbsp;&nbsp;
            <Space direction='horizontal' size="large" align='center'>
              <Button style={{backgroundColor:'#15C377',color:'white'}}>{t('walletconnect')}</Button>
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