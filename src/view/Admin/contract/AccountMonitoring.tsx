import React, { useState } from 'react';
import { Card, Statistic, Table, Alert, Row, Col } from 'antd';
import { BarChartOutlined } from '@ant-design/icons';
import AdminContentCard from '../AdminContentCard';
import styles from './AccountMonitoring.module.scss';

const AccountMonitoring: React.FC = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);

    const columns = [
        {
            title: '交易哈希',
            dataIndex: 'hash',
            key: 'hash',
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: '金额',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: '时间',
            dataIndex: 'timestamp',
            key: 'timestamp',
        }
    ];

    return (
        <AdminContentCard 
            title="财务监控"
            icon={<BarChartOutlined />}
        >
            <div className={styles.accountMonitoring}>
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Card>
                            <Statistic title="总流动性" value={1000000} suffix="RCC" />
                        </Card>
                    </Col>
                    {/* 其他统计数据 */}
                </Row>
                <Table 
                    columns={columns}
                    dataSource={transactions}
                    loading={loading}
                    rowKey="hash"
                />
            </div>
        </AdminContentCard>
    );
};

export default AccountMonitoring; 