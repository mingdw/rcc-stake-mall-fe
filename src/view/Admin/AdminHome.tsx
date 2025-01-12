import { Button, Col, Divider } from "antd";
import { Avatar, Card, Row } from "antd";
import { UserOutlined, DatabaseOutlined, ApiOutlined } from '@ant-design/icons';
import React, { FC } from "react";



const AdminHome: FC = () => {

    const cardStyle: React.CSSProperties = {
        width: '100%',
        textAlign: 'left',
        backgroundColor: '#fff'
    }

    return <>
        <div>
            <Card style={cardStyle}>
                <Row>
                    <Col span={2}>
                        <a href='#'><Avatar size={48} icon={<UserOutlined />} /></a>
                    </Col>
                    <Col span={20}>
                        <span style={{ marginTop: '5px', color: 'black', fontSize: '16px' }}>0x67003e9d9B26Ed30B8AfeA6da762279D7c83abC2</span>

                        <Row>
                            <Col span={5}>
                                <div style={{ marginTop: '10px'}}>
                                    <span style={{ fontSize: '12px', color: 'gray' }}>1.23 ETH</span><br />
                                    <span className="badge badge-success badge-pill">账户余额</span>
                                </div>
                            </Col>

                            <Col span={5}   >
                                <div style={{ marginTop: '10px' }}>
                                    <span style={{ fontSize: '12px', color: 'gray' }}>1.23 ETH</span><br />
                                    <span className="badge badge-success badge-pill">质押在途</span>
                                </div>
                            </Col>
                            <Col span={5}   >
                                <div style={{ marginTop: '10px' }}>
                                    <span style={{ fontSize: '12px', color: 'gray' }}>56 R</span><br />
                                    <span className="badge badge-success badge-pill">代币余额</span>
                                </div>
                            </Col>
                            <Col span={5}   >
                                <div style={{ marginTop: '10px' }}>
                                    <span style={{ fontSize: '12px', color: 'gray' }}>56 R</span><br />
                                    <span className="badge badge-success badge-pill">预估收益</span>
                                </div>
                            </Col>

                        </Row>

                    </Col>
                    <Col span={2}>
                        <Button type="primary" size="small">退出登录</Button>
                    </Col>
                </Row>
                <Divider />
                <Row>

                </Row>
                <Row>

                </Row>
            </Card>
        </div>
    </>
}

export default AdminHome