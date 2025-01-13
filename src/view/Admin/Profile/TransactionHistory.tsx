import React from 'react';
import { HistoryOutlined } from '@ant-design/icons';
import AdminContentCard from '../AdminContentCard';
import { List } from 'antd';

const TransactionHistory: React.FC = () => {
    // 示例数据
    const transactions = [
        { id: 1, title: '质押 $200', date: '2023-01-01', status: '成功' },
        { id: 2, title: '借款 $100', date: '2023-01-02', status: '成功' },
        { id: 3, title: '还款 $50', date: '2023-01-03', status: '成功' },
        { id: 4, title: '取回 $150', date: '2023-01-04', status: '成功' },
    ];

    return (
        <div>
            <AdminContentCard title="交易历史" icon={<HistoryOutlined />}>
                <List
                    dataSource={transactions}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={item.title}
                                description={`${item.date} - ${item.status}`}
                            />
                        </List.Item>
                    )}
                />
            </AdminContentCard>
        </div>
    );
};

export default TransactionHistory; 