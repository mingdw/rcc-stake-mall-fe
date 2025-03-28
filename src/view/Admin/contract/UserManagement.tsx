import React, { useState, useEffect } from 'react';
import { 
  Table, Button, Space, Modal, message, Input, Tabs, Card, Row, Col, Typography, 
  Tag, Tooltip, Statistic, Badge, Divider, Select, Drawer, Form, Alert, Empty,
  Spin, Pagination
} from 'antd';
import { 
  TeamOutlined, SearchOutlined, UserOutlined, InfoCircleOutlined, 
  LockOutlined, UnlockOutlined, KeyOutlined, WalletOutlined,
  HistoryOutlined, LineChartOutlined, FieldTimeOutlined, BarsOutlined,
  ArrowUpOutlined, ArrowDownOutlined
} from '@ant-design/icons';
import AdminContentCard from '../AdminContentCard';
import styles from './UserManagement.module.scss';

const { Text, Title } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

interface UserData {
  key: string;
  address: string;
  roles: string[];
  totalStaked: number;
  pendingRewards: number;
  stakedPools: number[];
  lastActivity: number;
  status: 'active' | 'inactive';
}

interface UserDetail {
  address: string;
  roles: string[];
  status: 'active' | 'inactive';
  stakes: {
    poolId: number;
    amount: number;
    tokenAddress: string;
    tokenSymbol: string;
  }[];
  pendingRewards: number;
  rccRewards: number;
  requests: {
    poolId: number;
    amount: number;
    unlockBlock: number;
    isUnlocked: boolean;
  }[];
  lastActivity: {
    blockNumber: number;
    timestamp: number;
    action: string;
  };
}

const UserManagement: React.FC = () => {
    // 状态管理
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [detailVisible, setDetailVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null);
    const [roleModalVisible, setRoleModalVisible] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [stats, setStats] = useState({
      totalUsers: 0,
      activeUsers: 0,
      totalStaked: 0,
      averageStaked: 0
    });

    // 模拟获取用户数据
    useEffect(() => {
        fetchUsers();
        fetchStats();
    }, [page, pageSize]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            // 在实际应用中，这里会调用合约或API获取用户数据
            // 模拟延迟和数据获取
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // 模拟数据
            const mockUsers: UserData[] = Array(25).fill(null).map((_, index) => ({
                key: `${index}`,
                address: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 10)}`,
                roles: Math.random() > 0.8 ? ['admin', 'user'] : ['user'],
                totalStaked: parseFloat((Math.random() * 100).toFixed(2)),
                pendingRewards: parseFloat((Math.random() * 10).toFixed(2)),
                stakedPools: Array(Math.floor(Math.random() * 3) + 1)
                  .fill(0)
                  .map(() => Math.floor(Math.random() * 5)),
                lastActivity: Date.now() - Math.random() * 10000000,
                status: Math.random() > 0.2 ? 'active' : 'inactive'
            }));
            
            setUsers(mockUsers.slice((page - 1) * pageSize, page * pageSize));
            setTotalUsers(mockUsers.length);
            
        } catch (error) {
            message.error('获取用户数据失败');
            console.error('获取用户数据失败:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            // 模拟获取统计数据
            await new Promise(resolve => setTimeout(resolve, 300));
            
            setStats({
                totalUsers: 345,
                activeUsers: 278,
                totalStaked: 24680.5,
                averageStaked: 71.54
            });
        } catch (error) {
            console.error('获取统计数据失败:', error);
        }
    };

    // 搜索用户
    const handleSearch = (value: string) => {
        setSearchText(value);
        // 实际应用中这里会根据输入筛选用户或者调用API
    };

    // 打开用户详情
    const handleViewDetail = async (address: string) => {
        setLoading(true);
        try {
            // 模拟获取用户详细信息
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // 模拟用户详情数据
            const userDetail: UserDetail = {
                address,
                roles: users.find(u => u.address === address)?.roles || ['user'],
                status: Math.random() > 0.2 ? 'active' : 'inactive',
                stakes: Array(Math.floor(Math.random() * 3) + 1).fill(null).map((_, i) => ({
                    poolId: i,
                    amount: parseFloat((Math.random() * 100).toFixed(2)),
                    tokenAddress: `0x${Math.random().toString(16).slice(2, 42)}`,
                    tokenSymbol: ['ETH', 'RCC', 'USDT'][i % 3]
                })),
                pendingRewards: parseFloat((Math.random() * 10).toFixed(2)),
                rccRewards: parseFloat((Math.random() * 50).toFixed(2)),
                requests: Array(Math.floor(Math.random() * 2)).fill(null).map(() => ({
                    poolId: Math.floor(Math.random() * 3),
                    amount: parseFloat((Math.random() * 20).toFixed(2)),
                    unlockBlock: 150000 + Math.floor(Math.random() * 1000),
                    isUnlocked: Math.random() > 0.5
                })),
                lastActivity: {
                    blockNumber: 150000 + Math.floor(Math.random() * 1000),
                    timestamp: Date.now() - Math.random() * 10000000,
                    action: ['质押', '提取', '领取奖励'][Math.floor(Math.random() * 3)]
                }
            };
            
            setSelectedUser(userDetail);
            setDetailVisible(true);
        } catch (error) {
            message.error('获取用户详情失败');
            console.error('获取用户详情失败:', error);
        } finally {
            setLoading(false);
        }
    };

    // 管理用户角色
    const handleManageRoles = (address: string, roles: string[]) => {
        setSelectedAddress(address);
        setSelectedRoles([...roles]);
        setRoleModalVisible(true);
    };

    // 保存角色设置
    const handleSaveRoles = async () => {
        setLoading(true);
        try {
            // 这里应该调用合约方法来设置用户角色
            // 例如: await contract.grantRole(role, address)
            
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // 更新本地状态
            setUsers(prevUsers => 
                prevUsers.map(user => 
                    user.address === selectedAddress 
                        ? { ...user, roles: [...selectedRoles] } 
                        : user
                )
            );
            
            message.success('用户角色已更新');
            setRoleModalVisible(false);
        } catch (error) {
            message.error('更新角色失败');
            console.error('更新角色失败:', error);
        } finally {
            setLoading(false);
        }
    };

    // 表格列定义
    const columns = [
        {
            title: '用户地址',
            dataIndex: 'address',
            key: 'address',
            render: (address: string) => (
                <Tooltip title={address}>
                    <span className={styles.addressText}>{address}</span>
                </Tooltip>
            )
        },
        {
            title: '角色',
            dataIndex: 'roles',
            key: 'roles',
            render: (roles: string[]) => (
                <Space>
                    {roles.map(role => (
                        <Tag color={role === 'admin' ? 'blue' : 'default'} key={role}>
                            {role === 'admin' ? '管理员' : '用户'}
                        </Tag>
                    ))}
                </Space>
            )
        },
        {
            title: '总质押量',
            dataIndex: 'totalStaked',
            key: 'totalStaked',
            sorter: (a: UserData, b: UserData) => a.totalStaked - b.totalStaked,
            render: (amount: number) => <span>{amount.toFixed(2)}</span>
        },
        {
            title: '待领取奖励',
            dataIndex: 'pendingRewards',
            key: 'pendingRewards',
            sorter: (a: UserData, b: UserData) => a.pendingRewards - b.pendingRewards,
            render: (amount: number) => <span>{amount.toFixed(2)}</span>
        },
        {
            title: '质押池',
            dataIndex: 'stakedPools',
            key: 'stakedPools',
            render: (pools: number[]) => (
                <Space>
                    {pools.map(poolId => (
                        <Tag color="green" key={poolId}>池-{poolId}</Tag>
                    ))}
                </Space>
            )
        },
        {
            title: '最近活动',
            dataIndex: 'lastActivity',
            key: 'lastActivity',
            render: (timestamp: number) => {
                const date = new Date(timestamp);
                return <span>{date.toLocaleDateString()}</span>;
            },
            sorter: (a: UserData, b: UserData) => a.lastActivity - b.lastActivity
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Badge 
                    status={status === 'active' ? 'success' : 'default'} 
                    text={status === 'active' ? '活跃' : '不活跃'} 
                />
            ),
            filters: [
                { text: '活跃', value: 'active' },
                { text: '不活跃', value: 'inactive' },
            ],
            onFilter: (value: any, record: UserData) => record.status === value
        },
        {
            title: '操作',
            key: 'action',
            render: (_: any, record: UserData) => (
                <Space size="small" className={styles.actionButtons}>
                    <Button 
                        type="link" 
                        icon={<InfoCircleOutlined />} 
                        onClick={() => handleViewDetail(record.address)}
                    >
                        详情
                    </Button>
                    <Button 
                        type="link" 
                        icon={<KeyOutlined />} 
                        onClick={() => handleManageRoles(record.address, record.roles)}
                    >
                        角色
                    </Button>
                </Space>
            )
        }
    ];

    const handlePaginationChange = (page: number, pageSize?: number) => {
        setPage(page);
        if (pageSize) {
            setPageSize(pageSize);
        }
    };

    return (
        <AdminContentCard 
            title="质押用户管理"
            icon={<TeamOutlined />}
        >
            <div className={styles.userManagement}>
                <div className={styles.statsRow}>
                    <Card className={styles.statsCard}>
                        <Row gutter={[24, 24]}>
                            <Col xs={12} sm={12} md={6}>
                                <Statistic 
                                    title={
                                        <div className={styles.statTitle}>
                                            <UserOutlined className={styles.statIcon} />
                                            <span>总用户数</span>
                                        </div>
                                    }
                                    value={stats.totalUsers}
                                    className={styles.statValue}
                                />
                            </Col>
                            <Col xs={12} sm={12} md={6}>
                                <Statistic 
                                    title={
                                        <div className={styles.statTitle}>
                                            <LineChartOutlined className={styles.statIcon} />
                                            <span>活跃用户</span>
                                        </div>
                                    }
                                    value={stats.activeUsers}
                                    className={styles.statValue}
                                    suffix={<small>/{stats.totalUsers}</small>}
                                />
                            </Col>
                            <Col xs={12} sm={12} md={6}>
                                <Statistic 
                                    title={
                                        <div className={styles.statTitle}>
                                            <WalletOutlined className={styles.statIcon} />
                                            <span>总质押量</span>
                                        </div>
                                    }
                                    value={stats.totalStaked}
                                    precision={2}
                                    className={styles.statValue}
                                />
                            </Col>
                            <Col xs={12} sm={12} md={6}>
                                <Statistic 
                                    title={
                                        <div className={styles.statTitle}>
                                            <FieldTimeOutlined className={styles.statIcon} />
                                            <span>平均质押量</span>
                                        </div>
                                    }
                                    value={stats.averageStaked}
                                    precision={2}
                                    className={styles.statValue}
                                />
                            </Col>
                        </Row>
                    </Card>
                </div>

                <div className={styles.header}>
                    <div className={styles.searchContainer}>
                        <Input
                            placeholder="输入用户地址搜索"
                            prefix={<SearchOutlined />}
                            onChange={(e) => handleSearch(e.target.value)}
                            className={styles.searchInput}
                            allowClear
                        />
                    </div>
                </div>

                <Table 
                    columns={columns}
                    dataSource={users}
                    loading={loading}
                    rowKey="address"
                    pagination={false}
                    className={styles.userTable}
                />
                
                <div className={styles.paginationWrapper}>
                    <Pagination 
                        current={page}
                        total={totalUsers}
                        pageSize={pageSize}
                        onChange={handlePaginationChange}
                        showSizeChanger
                        showQuickJumper
                        showTotal={(total) => `共 ${total} 条记录`}
                    />
                </div>

                {/* 用户详情抽屉 */}
                <Drawer
                    title="用户详情"
                    placement="right"
                    onClose={() => setDetailVisible(false)}
                    open={detailVisible}
                    width={600}
                    className={styles.userDetailDrawer}
                >
                    {selectedUser ? (
                        <div className={styles.userDetailContent}>
                            <div className={styles.userHeader}>
                                <div className={styles.userInfo}>
                                    <div className={styles.userAvatar}>
                                        <UserOutlined />
                                    </div>
                                    <div className={styles.userAddress}>
                                        <Tooltip title={selectedUser.address}>
                                            <Text ellipsis className={styles.addressText}>
                                                {selectedUser.address}
                                            </Text>
                                        </Tooltip>
                                        <div className={styles.userRoles}>
                                            {selectedUser.roles.map(role => (
                                                <Tag color={role === 'admin' ? 'blue' : 'default'} key={role}>
                                                    {role === 'admin' ? '管理员' : '用户'}
                                                </Tag>
                                            ))}
                                            <Badge 
                                                status={selectedUser.status === 'active' ? 'success' : 'default'} 
                                                text={selectedUser.status === 'active' ? '活跃' : '不活跃'} 
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.userActions}>
                                    <Button 
                                        type="primary" 
                                        icon={<KeyOutlined />}
                                        onClick={() => handleManageRoles(selectedUser.address, selectedUser.roles)}
                                    >
                                        管理角色
                                    </Button>
                                </div>
                            </div>

                            <Divider orientation="left">质押概览</Divider>
                            
                            <Row gutter={[16, 16]} className={styles.userStats}>
                                <Col xs={24} sm={12}>
                                    <Card className={styles.userStatCard}>
                                        <Statistic 
                                            title="总质押量" 
                                            value={selectedUser.stakes.reduce((sum, stake) => sum + stake.amount, 0)} 
                                            precision={2}
                                            prefix={<WalletOutlined />}
                                        />
                                    </Card>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Card className={styles.userStatCard}>
                                        <Statistic 
                                            title="待领取奖励" 
                                            value={selectedUser.pendingRewards} 
                                            precision={2}
                                            valueStyle={{ color: '#52c41a' }}
                                            prefix={<LineChartOutlined />}
                                        />
                                    </Card>
                                </Col>
                            </Row>

                            <Tabs defaultActiveKey="stakes" className={styles.userTabs}>
                                <TabPane 
                                    tab={
                                        <span><WalletOutlined />质押记录</span>
                                    } 
                                    key="stakes"
                                >
                                    {selectedUser.stakes.length > 0 ? (
                                        <Table 
                                            dataSource={selectedUser.stakes}
                                            rowKey={(record) => `${record.poolId}-${record.tokenSymbol}`}
                                            pagination={false}
                                            columns={[
                                                {
                                                    title: '池ID',
                                                    dataIndex: 'poolId',
                                                    key: 'poolId',
                                                    render: (id) => <Tag color="blue">池-{id}</Tag>
                                                },
                                                {
                                                    title: '代币',
                                                    dataIndex: 'tokenSymbol',
                                                    key: 'tokenSymbol'
                                                },
                                                {
                                                    title: '质押数量',
                                                    dataIndex: 'amount',
                                                    key: 'amount',
                                                    render: (amount) => amount.toFixed(2)
                                                }
                                            ]}
                                        />
                                    ) : (
                                        <Empty description="暂无质押记录" />
                                    )}
                                </TabPane>
                                <TabPane 
                                    tab={
                                        <span><BarsOutlined />提款请求</span>
                                    } 
                                    key="withdrawals"
                                >
                                    {selectedUser.requests.length > 0 ? (
                                        <Table 
                                            dataSource={selectedUser.requests}
                                            rowKey={(record, index) => `${record.poolId}-${index}`}
                                            pagination={false}
                                            columns={[
                                                {
                                                    title: '池ID',
                                                    dataIndex: 'poolId',
                                                    key: 'poolId',
                                                    render: (id) => <Tag color="blue">池-{id}</Tag>
                                                },
                                                {
                                                    title: '数量',
                                                    dataIndex: 'amount',
                                                    key: 'amount',
                                                    render: (amount) => amount.toFixed(2)
                                                },
                                                {
                                                    title: '解锁区块',
                                                    dataIndex: 'unlockBlock',
                                                    key: 'unlockBlock'
                                                },
                                                {
                                                    title: '状态',
                                                    dataIndex: 'isUnlocked',
                                                    key: 'isUnlocked',
                                                    render: (isUnlocked) => (
                                                        <Tag color={isUnlocked ? 'green' : 'orange'}>
                                                            {isUnlocked ? '已解锁' : '锁定中'}
                                                        </Tag>
                                                    )
                                                }
                                            ]}
                                        />
                                    ) : (
                                        <Empty description="暂无提款请求" />
                                    )}
                                </TabPane>
                                <TabPane 
                                    tab={
                                        <span><HistoryOutlined />最近活动</span>
                                    } 
                                    key="activity"
                                >
                                    <Card className={styles.activityCard}>
                                        <div className={styles.activityItem}>
                                            <div className={styles.activityInfo}>
                                                <div className={styles.activityAction}>
                                                    <Tag color="blue">{selectedUser.lastActivity.action}</Tag>
                                                </div>
                                                <div className={styles.activityTime}>
                                                    <Text type="secondary">
                                                        {new Date(selectedUser.lastActivity.timestamp).toLocaleString()}
                                                    </Text>
                                                </div>
                                            </div>
                                            <div className={styles.activityBlock}>
                                                <Text type="secondary">区块: </Text>
                                                <Text strong>{selectedUser.lastActivity.blockNumber}</Text>
                                            </div>
                                        </div>
                                    </Card>
                                </TabPane>
                            </Tabs>
                        </div>
                    ) : (
                        <Spin />
                    )}
                </Drawer>

                {/* 角色管理模态框 */}
                <Modal
                    title="管理用户角色"
                    open={roleModalVisible}
                    onCancel={() => setRoleModalVisible(false)}
                    onOk={handleSaveRoles}
                    confirmLoading={loading}
                >
                    <Alert
                        message="权限说明"
                        description="管理员角色可以调用合约的管理功能，包括设置参数、暂停合约、添加质押池等。请谨慎分配权限。"
                        type="info"
                        showIcon
                        style={{ marginBottom: 16 }}
                    />
                    
                    <Form layout="vertical">
                        <Form.Item label="用户地址">
                            <Input value={selectedAddress} disabled />
                        </Form.Item>
                        <Form.Item label="分配角色">
                            <Select
                                mode="multiple"
                                placeholder="选择角色"
                                value={selectedRoles}
                                onChange={setSelectedRoles}
                                style={{ width: '100%' }}
                            >
                                <Option value="user">普通用户</Option>
                                <Option value="admin">管理员</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </AdminContentCard>
    );
};

export default UserManagement; 