import React, { useState } from 'react';
import { Table, Button, Space, Modal, message } from 'antd';
import { TeamOutlined } from '@ant-design/icons';
import AdminContentCard from '../AdminContentCard';
import styles from './UserManagement.module.scss';

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const columns = [
        {
            title: '用户地址',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '角色',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: '操作',
            key: 'action',
            render: (_: any) => (
                <Space>
                    <Button type="link">编辑</Button>
                    <Button type="link" danger>禁用</Button>
                </Space>
            )
        }
    ];

    return (
        <AdminContentCard 
            title="用户管理"
            icon={<TeamOutlined />}
        >
            <div className={styles.userManagement}>
                <Table 
                    columns={columns}
                    dataSource={users}
                    loading={loading}
                    rowKey="address"
                />
            </div>
        </AdminContentCard>
    );
};

export default UserManagement; 