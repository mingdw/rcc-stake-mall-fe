import React, { useState } from 'react';
import styles from './Suply.module.scss';
import {  Card, Col, Row, Space, Table, Typography, Input, Button } from "antd";
import { Outlet, useNavigate } from 'react-router-dom'; // 导入 useHistory
import { AppstoreOutlined } from '@ant-design/icons';


const { Search: AntSearch } = Input;

const Suply: React.FC = () => {
    const navigate = useNavigate(); // 使用 useNavigate 钩子

    const onSearch = (value: string) => {
        console.log(value);
    }

    // 示例数据
    const allDataSource = [
        { key: '1', coin: 'Ethereum (ETH)', targetPool: 1000, yieldRate: '5%', borrowedAmount: 500, borrowRate: '1%', status: 'b01,b03' },
        { key: '2', coin: 'Bitcoin (BTC)', targetPool: 2000, yieldRate: '4%', borrowedAmount: 800, borrowRate: '1.5%', status: 'b02,b04' },
        { key: '3', coin: 'Cardano (ADA)', targetPool: 1500, yieldRate: '6%', borrowedAmount: 300, borrowRate: '0.5%', status: 'b03' },
        { key: '4', coin: 'Solana (SOL)', targetPool: 1200, yieldRate: '7%', borrowedAmount: 600, borrowRate: '1.2%', status: 'b04,b03' },
        { key: '5', coin: 'Polkadot (DOT)', targetPool: 1800, yieldRate: '5.5%', borrowedAmount: 400, borrowRate: '1.1%', status: 'b05' },
        { key: '6', coin: 'Litecoin (LTC)', targetPool: 900, yieldRate: '4.5%', borrowedAmount: 200, borrowRate: '0.8%', status: 'b06' },
        { key: '7', coin: 'Chainlink (LINK)', targetPool: 1100, yieldRate: '6.5%', borrowedAmount: 350, borrowRate: '1.3%', status: 'b07' },
        { key: '8', coin: 'Ripple (XRP)', targetPool: 1300, yieldRate: '3.5%', borrowedAmount: 450, borrowRate: '0.7%', status: 'b08,b05' },
        { key: '9', coin: 'Ethereum (ETH)', targetPool: 1000, yieldRate: '5%', borrowedAmount: 500, borrowRate: '1%' ,status:'b01,b03'},
        { key: '10', coin: 'Bitcoin (BTC)', targetPool: 2000, yieldRate: '4%', borrowedAmount: 800, borrowRate: '1.5%' ,status:'b02,b04'},
        { key: '11', coin: 'Cardano (ADA)', targetPool: 1500, yieldRate: '6%', borrowedAmount: 300, borrowRate: '0.5%' ,status:'b03'},
        { key: '12', coin: 'Solana (SOL)', targetPool: 1200, yieldRate: '7%', borrowedAmount: 600, borrowRate: '1.2%' ,status:'b04'},
    ];

    const [visibleCount, setVisibleCount] = useState(5); // 初始显示5行

    // 状态描述映射
    const statusDescriptions: { [key: string]: string } = {
        b01: '可质押',
        b02: '已满',
        b03: '收益波动',
        b04: '流动性紧张',
        b05: '正常运营',
        b06: '维护中',
        b07: '高风险',
        b08: '合规',
    };

     // 动态样式映射
     const dynamicStyles: { [key: string]: React.CSSProperties } = {
        b01: { color: '#4caf50' }, // 绿色
        b02: { color: '#f44336' }, // 红色
        b03: { color: '#ff9800' }, // 橙色
        b04: { color: '#ffeb3b' }, // 黄色
        b05: { color: '#2196f3' }, // 蓝色
        b06: { color: '#9e9e9e' }, // 灰色
        b07: { color: '#e91e63' }, // 粉色
        b08: { color: '#3f51b5' }, // 深蓝色
    };

    // 表格列定义
    const columns = [
        {
            title: '质押币种名称',
            dataIndex: 'coin',
            key: 'coin',
            sorter: (a: any, b: any) => a.coin.localeCompare(b.coin), // 字符串排序
        },
        {
            title: '目标质押池数量',
            dataIndex: 'targetPool',
            key: 'targetPool',
            sorter: (a: any, b: any) => a.targetPool - b.targetPool, // 数字排序
        },
        {
            title: '收益率',
            dataIndex: 'yieldRate',
            key: 'yieldRate',
            sorter: (a: any, b: any) => parseFloat(a.yieldRate) - parseFloat(b.yieldRate), // 数字排序
        },
        {
            title: '已借出数量',
            dataIndex: 'borrowedAmount',
            key: 'borrowedAmount',
            sorter: (a: any, b: any) => a.borrowedAmount - b.borrowedAmount, // 数字排序
        },
        {
            title: '借出费率',
            dataIndex: 'borrowRate',
            key: 'borrowRate',
            sorter: (a: any, b: any) => parseFloat(a.borrowRate) - parseFloat(b.borrowRate), // 数字排序
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <div>
                    {status.split(',').map((s, index) => (
                        <span key={index} className={styles.statusBadge} style={dynamicStyles[s]}>
                            {statusDescriptions[s]} {/* 显示中文描述 */}
                        </span>
                    ))}
                </div>
            ),
        },
        {
            title: '操作',
            key: 'action',
            render: (text: any, record: any) => (
                <Button type="link" onClick={() => handleViewDetails(record)}>
                    查看明细
                </Button>
            ),
        },
    ];

    // 查看明细的处理函数
    // 查看明细的处理函数
    const handleViewDetails = (record: any) => {
        // 跳转到明细页面并传递参数
        console.log(JSON.stringify(record))
        navigate('/suply/details', { state: { data: record } }); // 使用 navigate 替代 history.push
    };


    // 加载更多的处理函数
    const handleLoadMore = () => {
        setVisibleCount(prevCount => prevCount + 5); // 每次增加5行
    };

    return <>
        <div className={styles.container}>
           <div className={styles.containerTop}>
                <Col span={2}>
                    <AppstoreOutlined className={styles.icon}/>
                </Col>
                <Col span={10}>
                    <div style={{textAlign:'left',marginLeft:'20px',color:'#fff'}}>
                        <Space direction="vertical" size={1}>
                            <Typography.Title level={5}  className={styles.p1}>质押</Typography.Title>
                            <Typography.Title level={2}  className={styles.p2}>你可以将一部分的资产质押，到期后换取更多的收益</Typography.Title>
                        </Space>
                   </div>
                </Col>
                <Col span={12}>
                    <Row style={{textAlign:'center'}}     >
                        <Col span={6}>
                            <span className={styles.sp1}>质押池数量</span><br/>
                            <span className={styles.sp2}>4</span>
                        </Col>
                        <Col span={6}>
                            <span className={styles.sp1}>目标数量</span><br/>
                            <span className={styles.sp2}>$ 405.23M</span>
                        </Col>
                        <Col span={6}>
                            <span className={styles.sp1}>质押总数</span><br/>
                            <span className={styles.sp2}>$ 301.23M</span>
                        </Col>
                        <Col span={6}>
                            <span className={styles.sp1}>使用率</span><br/>
                            <span className={styles.sp2}>87%</span>
                        </Col>
                    </Row>
                </Col>
           </div>
          
          
           <div className={styles.containerContent}>
            <Card style={{width:'100%'}}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
                    <Typography.Text style={{ margin: 0 ,fontSize:'36px',color:'gray',fontFamily:'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif',fontWeight:'bold'}}>sepolia</Typography.Text>
                    <AntSearch
                        placeholder="请输入币种"
                        onSearch={onSearch}
                        style={{ width: 200 }}
                    />
                </div>
                <div>
                   <Table
                        dataSource={allDataSource.slice(0, visibleCount)} // 根据可见行数切片数据
                        columns={columns}
                        pagination={false} // 关闭分页
                        rowKey="key" // 设置行的唯一标识
                    />
                    {visibleCount < allDataSource.length && ( // 如果还有更多数据，显示加载更多按钮
                        <Button type="primary" onClick={handleLoadMore} style={{ marginTop: '20px' }}>
                            加载更多
                        </Button>
                    )}
                </div>
            </Card>
            </div>
        </div>
    </>
}

export default Suply