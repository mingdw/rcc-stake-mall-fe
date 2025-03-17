import React, { useState, useEffect } from 'react';
import { Table, Tabs, Tag, Spin, message } from 'antd';
import { HistoryOutlined } from '@ant-design/icons';
import AdminContentCard from '../AdminContentCard';
import styles from './TradeList.modulue.scss';

const { TabPane } = Tabs;

interface TradeRecord {
    id: string;
    type: 'exchange' | 'stake' | 'unstake' | 'reward';
    token: string;
    amount: number;
    timestamp: number;
    status: 'completed' | 'pending' | 'failed';
    details?: string;
}

const TradeList: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [tradeRecords, setTradeRecords] = useState<TradeRecord[]>([]);

    useEffect(() => {
        const fetchTradeRecords = async () => {
            try {
                // 模拟API调用
                setTimeout(() => {
                    const mockData: TradeRecord[] = [
                        {
                            id: '1',
                            type: 'exchange',
                            token: 'ETH',
                            amount: 0.5,
                            timestamp: Date.now() - 86400000,
                            status: 'completed',
                            details: '兑换为 1000 RCC'
                        },
                        {
                            id: '2',
                            type: 'stake',
                            token: 'RCC',
                            amount: 500,
                            timestamp: Date.now() - 172800000,
                            status: 'completed',
                            details: '90天锁定期'
                        },
                        {
                            id: '3',
                            type: 'reward',
                            token: 'RCC',
                            amount: 10,
                            timestamp: Date.now() - 259200000,
                            status: 'completed',
                            details: '质押奖励'
                        },
                        {
                            id: '4',
                            type: 'unstake',
                            token: 'RCC',
                            amount: 200,
                            timestamp: Date.now() - 345600000,
                            status: 'completed',
                            details: '解除质押'
                        }
                    ];
                    setTradeRecords(mockData);
                    setLoading(false);
                }, 1000);
            } catch (error) {
                message.error('获取交易记录失败');
                setLoading(false);
            }
        };

        fetchTradeRecords();
    }, []);

    const getTypeText = (type: string) => {
        const typeMap: Record<string, string> = {
            exchange: '兑换',
            stake: '质押',
            unstake: '解除质押',
            reward: '收益提取'
        };
        return typeMap[type] || type;
    };

    const getStatusTag = (status: string) => {
        const statusConfig: Record<string, { color: string; text: string }> = {
            completed: { color: 'green', text: '已完成' },
            pending: { color: 'blue', text: '处理中' },
            failed: { color: 'red', text: '失败' }
        };
        
        const config = statusConfig[status] || { color: 'default', text: status };
        return <Tag color={config.color}>{config.text}</Tag>;
    };

    const columns = [
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            render: (type: string) => getTypeText(type)
        },
        {
            title: '代币',
            dataIndex: 'token',
            key: 'token',
        },
        {
            title: '数量',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount: number, record: TradeRecord) => `${amount} ${record.token}`
        },
        {
            title: '时间',
            dataIndex: 'timestamp',
            key: 'timestamp',
            render: (timestamp: number) => new Date(timestamp).toLocaleString('zh-CN')
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => getStatusTag(status)
        },
        {
            title: '详情',
            dataIndex: 'details',
            key: 'details',
        }
    ];

    return (
        <AdminContentCard
            title="交易记录"
            icon={<HistoryOutlined />}
            reqKey="tradeList"
        >
            <Spin spinning={loading}>
                <Tabs defaultActiveKey="all">
                    <TabPane tab="全部交易" key="all">
                        <Table 
                            dataSource={tradeRecords} 
                            columns={columns} 
                            rowKey="id"
                            pagination={{ pageSize: 10 }}
                        />
                    </TabPane>
                    <TabPane tab="兑换记录" key="exchange">
                        <Table 
                            dataSource={tradeRecords.filter(record => record.type === 'exchange')} 
                            columns={columns} 
                            rowKey="id"
                            pagination={{ pageSize: 10 }}
                        />
                    </TabPane>
                    <TabPane tab="质押记录" key="stake">
                        <Table 
                            dataSource={tradeRecords.filter(record => ['stake', 'unstake', 'reward'].includes(record.type))} 
                            columns={columns} 
                            rowKey="id"
                            pagination={{ pageSize: 10 }}
                        />
                    </TabPane>
                </Tabs>
            </Spin>
        </AdminContentCard>
    );
};

export default TradeList;


