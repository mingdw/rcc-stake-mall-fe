import React, { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Card, Col, Progress, Row, Space, Typography } from "antd";
import styles from './SuplyDetails.module.scss'

const SuplyDetails: FC = () => {
    const location = useLocation();
    const { address, balance, chainID, name, isAdmin } = useAuth()
    const { data } = location.state || {}; // 获取传递的行数据
    useEffect(() => {
        console.log("pool key: " + data.key);
    }, [data])

    return (
        <>
            <div className={styles.container}>
                <div className={styles.containerTop}>
                    <Col span={2}>
                        <span className={styles.iconfont}>&#xe7ee;</span>
                    </Col>
                    <Col span={8}>
                        <div style={{ textAlign: 'left', marginLeft: '20px', color: '#fff' }}>
                            <Space direction="vertical" size={1}>
                                <Typography.Title level={5} className={styles.p1}>{data.coin}</Typography.Title>
                                <Typography.Title level={2} className={styles.p2}>以太坊主网2.0 </Typography.Title>
                            </Space>
                        </div>
                    </Col>
                    <Col span={14}>
                        <Row style={{ textAlign: 'center' }}     >
                            <Col span={6}>
                                <span className={styles.sp1}>目标总金额</span><br />
                                <span className={styles.sp2}>$ 405.23M</span>
                            </Col>
                            <Col span={6}>
                                <span className={styles.sp1}>已质押</span><br />
                                <span className={styles.sp2}>$ 12.23M</span>
                            </Col>
                            <Col span={6}>
                                <span className={styles.sp1}>利用率</span><br />
                                <span className={styles.sp2}>$ 301.23M</span>
                            </Col>
                            <Col span={6}>
                                <span className={styles.sp1}>预言机价格</span><br />
                                <span className={styles.sp2}>$ 3723.06</span>
                            </Col>
                        </Row>
                    </Col>
                </div>
                <div className={styles.containerContent}>
                    <Row style={{ width: '100%' }}>
                        <Col span={16}>
                            <Card>
                                <Row style={{ textAlign: 'left',  color: 'gray' }}>
                                    <Typography.Title level={4} className={styles.p1}>质押池状态 & 配置</Typography.Title>
                                </Row>
                                <Row style={{marginTop: '20px'}}>
                                    <Col span={4} style={{textAlign: 'left', color: 'gray'}}>
                                        <Typography.Title level={5} className={styles.p1}>质押详情</Typography.Title>
                                    </Col>
                                    <Col span={20}>
                                        <Row>
                                            <Progress size={50} type="dashboard" percent={75} gapDegree={30} />
                                        </Row>
                                        <Row>

                                        </Row>
                                        <Row>

                                        </Row>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col span={6} style={{ marginLeft: '20px' }}>
                            <Card>
                            <Row style={{ textAlign: 'left',  color: 'gray' }}>
                                    <Typography.Title level={4} className={styles.p1}>账户信息</Typography.Title>
                            </Row>
                              <Row>
                                {balance && <p>balance: {balance}</p>}
                              </Row>
                                <Row>
                                
                              </Row>
                              <Row>
                                
                              </Row>
                              <Row>
                                
                              </Row>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
};

export default SuplyDetails; 