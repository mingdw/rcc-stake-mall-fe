import React, { useEffect } from 'react';
import { Card, Col, Layout, List, Menu, Row, Space } from 'antd';
import { UserOutlined, DatabaseOutlined, ApiOutlined } from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import styles from './AdminLayout.module.scss'
import Avatar from 'antd/es/avatar/avatar';
import test from 'node:test';


const { Sider, Content } = Layout;


interface AdminLayoutProps {
    address?: string;  // 使用可选属性，这样即使不传入 address 也不会报错
}

const AdminLayout: React.FC<AdminLayoutProps> = (props) => {

    const { address } = props;
    const navigate = useNavigate();


    //默认跳转到首页
    useEffect(() => {
        navigate('/admin/home')
    }, [])

    
    const location = useLocation();

    const menuItems = [
        {
            key: '/admin/profile',
            icon: <UserOutlined />,
            label: '个人中心',
        },
        {
            key: '/admin/stake',
            icon: <DatabaseOutlined />,
            label: '质押管理',
        },
        {
            key: '/admin/contract',
            icon: <ApiOutlined />,
            label: '合约管理',
        },
    ];

    const handleMenuClick = ({ key }: { key: string }) => {
        navigate(key);
    };

    const cardStyle: React.CSSProperties = {
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        height: '100%',
        textAlign: 'left'
    }

    

    return (
        <div className={styles.container}>
            <Layout className={styles.layout}>
                <Sider theme='light' style={{ background: '#F4F5FA', width: '30%' }}>
                    <Space direction='vertical' size={20}>
                        <Card bordered={false} style={cardStyle}>
                            <Row>
                                <a href='#'><Avatar style={{ backgroundColor: 'gray', fontSize: '24px' }} icon={<UserOutlined />} /></a>&nbsp;&nbsp;
                                <span style={{ marginTop: '5px' }}>{address}0x6700...abC2</span>
                            </Row>
                            <Row style={{ marginTop: '20px' }}>
                                <Col span={12} style={{ textAlign: 'left' }}>
                                    <span className="text-gray">0.123</span><br></br>
                                    <span className="badge badge-danger badge-pill">ETH</span>
                                </Col>
                                <Col span={12} style={{ textAlign: 'right' }}>
                                    <span className="text-gray">25</span><br />
                                    <span className="badge badge-success badge-pill">R</span>
                                </Col>
                            </Row>
                        </Card>
                        <Card bordered={false} style={cardStyle} title={<div>
                            <h5 className="card-title" style={{textAlign:'left'}}>  
                                <strong>账户中心</strong>
                            </h5>
                        </div>} >

                        </Card>
                        <Card bordered={false} >

                        </Card>
                    </Space>
                </Sider>
                <Content>
                    <Outlet />
                </Content>
            </Layout>
        </div>
    );
};

export default AdminLayout;