import React, { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button, Card, Col, Divider, Progress, Row, Space, Tabs, TabsProps, Tooltip, Typography } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import styles from './SuplyDetails.module.scss'
import ApyChartCompoment from "../../components/ApyChartCompoment";
import { formatBalance } from "../../utils/common";

const SuplyDetails: FC = () => {
    const location = useLocation();
    const { data } = location.state || {}; // 获取传递的行数据
    const {authData} = useAuth();
    const [selectedPeriod, setSelectedPeriod] = useState<'1m' | '6m' | '1y'>('1m');
    const balanceInfo = [
            {key:'tab1',title:'ETH',content:'ETH 余额信息展示区域'},
            {key:'tab2',title:'WETH',content:'WETH 余额信息展示区域'}
    ]


    const [selectedTab, setSelectedTab] = useState('tab1'); // 默认选中 WETH
    const handleTabChange = (key: string) => {
        setSelectedTab(key);
        console.log(key);
        console.log("authData: " + JSON.stringify(authData));
    };

    // 定义利率数据
    const interestRateData = {
        '1m': [
            { month: 'Jan', rate: 2.5 },
            { month: 'Feb', rate: 2.7 },
            { month: 'Mar', rate: 2.6 },
            { month: 'Apr', rate: 2.8 },
            { month: 'May', rate: 2.9 },
            { month: 'Jun', rate: 3.0 },
            { month: 'Jul', rate: 3.1 },
            { month: 'Aug', rate: 3.2 },
            { month: 'Sep', rate: 3.3 },
            { month: 'Oct', rate: 3.4 },
            { month: 'Nov', rate: 3.5 },
            { month: 'Dec', rate: 3.6 },
        ],
        '6m': [
            { month: 'Jul', rate: 3.1 },
            { month: 'Aug', rate: 3.2 },
            { month: 'Sep', rate: 3.3 },
            { month: 'Oct', rate: 3.4 },
            { month: 'Nov', rate: 3.5 },
            { month: 'Dec', rate: 3.6 },
            { month: 'Jan', rate: 3.7 },
            { month: 'Feb', rate: 3.8 },
            { month: 'Mar', rate: 3.9 },
            { month: 'Apr', rate: 4.0 },
            { month: 'May', rate: 4.1 },
            { month: 'Jun', rate: 4.2 },
        ],
        '1y': [
            { month: 'Jan', rate: 2.5 },
            { month: 'Feb', rate: 2.7 },
            { month: 'Mar', rate: 2.6 },
            { month: 'Apr', rate: 2.8 },
            { month: 'May', rate: 2.9 },
            { month: 'Jun', rate: 3.0 },
            { month: 'Jul', rate: 3.1 },
            { month: 'Aug', rate: 3.2 },
            { month: 'Sep', rate: 3.3 },
            { month: 'Oct', rate: 3.4 },
            { month: 'Nov', rate: 3.5 },
            { month: 'Dec', rate: 3.6 },
        ],
    };

    useEffect(() => {
        console.log("pool key: " + data.key);
        console.log("authData: " + JSON.stringify(authData));
    }, [data,authData])


    const createBalanceInfo = (tabKey:string)=>{
        return <div>
                    <Space direction="horizontal" size={10}>
                     <span className="iconfont" style={{color:'gray',fontSize:'36px'}}>&#xe6e0;</span>
                    {/* <PayCircleOutlined style={{color:'gray',fontSize:'36px'}}/> */}
                        <div>
                            <span className={styles.p1}>账户余额</span><br/>
                            <span className={styles.p2}>{authData.balance ? authData.balance: 0} {tabKey === 'tab1' ? 'ETH' : 'WETH'}</span><br/>
                        </div>
                    </Space>  
                    <Divider type="vertical" />

                    <div>

                    </div>
                </div>
    }

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
                                <Row className={styles.p3}>
                                    <Typography.Title level={4} >质押池状态 & 配置</Typography.Title>
                                </Row>
                                <Row style={{ marginTop: '20px' }}>
                                    <Col span={4}>
                                        <Typography.Title level={5} className={styles.p3}>质押详情</Typography.Title>
                                    </Col>
                                    <Col span={20}>
                                        <Row>
                                            <Space direction="horizontal" size={30}>
                                                <Progress strokeColor="#4CAF50" size={70} type="dashboard" percent={75} gapDegree={-25} className={styles.progress} />
                                                <div>
                                                    <div className={styles.p1}>质押率
                                                        <Tooltip title="质押率是指已质押资产与目标质押资产的比率。">
                                                            <InfoCircleOutlined style={{ marginLeft: '4px', marginBottom: '6px', cursor: 'pointer', color: 'gray', fontSize: '12px' }} />
                                                        </Tooltip>
                                                    </div>
                                                    <div className={styles.p2}>75.423M / 100.4234M</div>
                                                    <div className={styles.p1}>$400.000M / $500.000M</div>
                                                </div>
                                                <Divider type="vertical" />
                                                <div>
                                                    <div className={styles.p1}>收益率
                                                        <Tooltip title="收益率是指已质押资产达到期限获取总收益的比率。">
                                                            <InfoCircleOutlined style={{ marginLeft: '4px', marginBottom: '6px', cursor: 'pointer', color: 'gray', fontSize: '12px' }} />
                                                        </Tooltip>
                                                    </div>
                                                    <div className={styles.p2}>小于 0.1%</div>
                                                    <div className={styles.p1}>&nbsp;</div>
                                                </div>
                                            </Space>
                                        </Row>
                                        <Row style={{ width: '100%', marginTop: '20px' }}>
                                            <Col span={24}>
                                                <ApyChartCompoment
                                                    data={interestRateData[selectedPeriod]}
                                                    selectedPeriod={selectedPeriod}
                                                    onPeriodChange={setSelectedPeriod}
                                                    title="利率走势" // 传递图标名称
                                                /> {/* 使用公共图表组件并传递数据和处理函数 */}
                                            </Col>
                                        </Row>
                                        <div>
                                            <div>
                                                <Typography.Title level={5} className={styles.p2}>质押池相关统计 <span style={{ color: '#4CAF50', fontSize: '14px' }}>可质押</span></Typography.Title>
                                            </div>
                                            <Row>
                                                <Col span={8}>
                                                    <div className={styles.p1}>最大LTV
                                                        <Tooltip title="贷款价值比率 (LTV)：LTV 是贷款金额与抵押资产价值的比率，通常以百分比表示。计算公式为：Max LTV 指的是贷款机构愿意接受的最高 LTV 比率。例如，如果一项贷款的最大 LTV 为 80%，这意味着借款人可以借到的贷款金额最多为抵押资产价值的 80%。如果抵押资产的价值为 100,000 美元，借款人最多可以借到 80,000 美元">
                                                            <InfoCircleOutlined style={{ marginLeft: '4px', marginBottom: '6px', cursor: 'pointer', color: 'gray', fontSize: '12px' }} />
                                                        </Tooltip>
                                                    </div>
                                                    <div className={styles.p2}>75%</div>
                                                </Col>
                                                <Col span={8}>
                                                    <div className={styles.p1}>清算阈值
                                                        <Tooltip title="清算阈值是指抵押资产的价值相对于借款金额的比率。例如，如果借款人抵押了价值 100,000 美元的资产，借款金额为 80,000 美元，那么清算阈值为 80%。如果抵押资产的价值下降到 80,000 美元（即 80% 的清算阈值），借款人可能会面临清算">
                                                            <InfoCircleOutlined style={{ marginLeft: '4px', marginBottom: '6px', cursor: 'pointer', color: 'gray', fontSize: '12px' }} />
                                                        </Tooltip>
                                                    </div>
                                                    <div className={styles.p2}>79.00%</div>
                                                </Col>
                                                <Col span={8}>
                                                    <div className={styles.p1}>清算罚金
                                                        <Tooltip title="清算罚金是指当借款人未能维持其抵押资产的价值在安全范围内，导致其抵押资产被强制清算时，借款人需要支付的额外费用。这笔费用通常是为了补偿贷款方在清算过程中可能遭受的损失">
                                                            <InfoCircleOutlined style={{ marginLeft: '4px', marginBottom: '6px', cursor: 'pointer', color: 'gray', fontSize: '12px' }} />
                                                        </Tooltip>
                                                    </div>
                                                    <div className={styles.p2}>7.02%</div>
                                                </Col>
                                            </Row>

                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col span={7} style={{ marginLeft: '20px' }}>
                            <Card className={styles.accountInfo}>
                                <Row style={{ textAlign: 'left', color: 'gray' }}>
                                    <Typography.Title level={4} className={styles.p1}>账户信息</Typography.Title>
                                </Row>
                                <Row className={styles.row}>
                                    <Col span={12} >
                                        <Button className={selectedTab === 'tab1' ? styles.buttonActive : styles.buttonUnActive} onClick={()=>handleTabChange('tab1')}>{balanceInfo[0].title}</Button>
                                    </Col>
                                    <Col span={12} >
                                        <Button className={selectedTab === 'tab2' ? styles.buttonActive : styles.buttonUnActive} onClick={()=>handleTabChange('tab2')}>{balanceInfo[1].title}</Button>
                                    </Col>
                                </Row>
                                <Row style={{marginTop:'20px'}}>
                                      {balanceInfo.map((item,index)=>{
                                        if(item.key === selectedTab){
                                        return <Col span={12}>
                                            {createBalanceInfo(item.key)}
                                      </Col>
                                      }
                                      })}
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