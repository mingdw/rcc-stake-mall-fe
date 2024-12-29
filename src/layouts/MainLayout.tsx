import React,{FC,useState} from 'react';
import { HomeOutlined,ShoppingOutlined,AppstoreOutlined,TransactionOutlined,UsergroupAddOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {  Col, Row, Layout, Menu, theme, Space } from 'antd';
import { Outlet,useNavigate   } from 'react-router-dom';
import classnames from 'classnames';

import mainCss from './MainLayout.module.scss'

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: '首页',
    key: 'home',
    icon:<HomeOutlined />,
  },
  {
    label: '质押池',
    key: 'pool',
    icon: <ShoppingOutlined />,
  },
  {
    label: '质押',
    key: 'pledge',
    icon: <AppstoreOutlined />,
  },

 {
    label: '领奖',
    key: 'prize',
    icon: <TransactionOutlined />,
  },
  {
    label: '关于我们',
    key: 'about',
    icon: <UsergroupAddOutlined />
  },

];


const MainLayout: FC = () => {
  const [current, setCurrent] = useState('home');
  const navigate = useNavigate()


  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
    navigate('/'+e.key)
  };
  return (
    <Layout>
      <Header style={{ display: 'flex',backgroundColor:'white',height:'15%' }}>
        <Row justify="space-around" style={{width:'100%'}}>
          <Col span={6}>
            <a href="/"> <span className={classnames(mainCss.logoStyle,mainCss.hcqFont,mainCss.hcqStyle1)}>RCC代币质押</span> </a>

          </Col>
          <Col span={12}>
            <Space size={100}>
              <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
            </Space>
           
          </Col>
          
          <Col span={6} style={{alignContent:'center'}}>
                    <form className="form-inline" >
                        <input className="form-control mr-sm-4" type="search" placeholder="请输入交易账户地址" aria-label="Search" />
                        <a href='/transactionList' className='btn btn-outline-success my-2 my-sm-0'>搜索</a>
                        <a  style={{marginLeft: '15%'}}   href="/about" className="btn btn-success btn-xs"><span>连接钱包</span></a>
                    </form>
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