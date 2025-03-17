import React, { useState, useEffect } from 'react';
import { 
    Card, 
    Row, 
    Col, 
    Typography, 
    Statistic, 
    Button, 
    Table, 
    Tag, 
    Space, 
    Progress, 
    Tooltip, 
    Modal, 
    Form, 
    InputNumber, 
    Divider, 
    Alert,
    message,
    Spin
} from 'antd';
import { 
    WalletOutlined, 
    RiseOutlined, 
    UnlockOutlined, 
    CheckCircleOutlined,
    ClockCircleOutlined,
    ArrowUpOutlined,
    GiftOutlined
} from '@ant-design/icons';
import AdminContentCard from '../AdminContentCard';
import styles from './Staking.module.scss';

const { Title, Text } = Typography;

// 质押资产类型定义
interface StakingPosition {
    id: string;
    poolName: string;
    symbol: string;
    icon: string;
    stakedAmount: number;
    usdValue: number;
    apr: number;
    startTime: number;
    lockPeriod: number; // 锁定期（天）
    endTime: number;
    rewards: number;
    rewardsUsd: number;
    status: 'active' | 'locked' | 'unlocking';
    unlockTime?: number; // 解锁时间戳（如果状态是unlocking）
}

const Staking: React.FC = () => {
    const [loading, setLoading] = useState(true);
    // 状态管理
    const [stakingPositions, setStakingPositions] = useState<StakingPosition[]>([
        {
            id: '1',
            poolName: 'ETH 2.0 质押池',
            symbol: 'ETH',
            icon: '/assets/eth.png',
            stakedAmount: 2.5,
            usdValue: 5000,
            apr: 5.8,
            startTime: Date.now() - 30 * 24 * 60 * 60 * 1000,
            lockPeriod: 30,
            endTime: Date.now() + 30 * 24 * 60 * 60 * 1000,
            rewards: 0.0125,
            rewardsUsd: 25,
            status: 'active'
        },
        {
            id: '2',
            poolName: 'BTC 收益池',
            symbol: 'BTC',
            icon: '/assets/btc.png',
            stakedAmount: 0.15,
            usdValue: 4500,
            apr: 3.2,
            startTime: Date.now() - 45 * 24 * 60 * 60 * 1000,
            lockPeriod: 60,
            endTime: Date.now() + 15 * 24 * 60 * 60 * 1000,
            rewards: 0.0004,
            rewardsUsd: 12,
            status: 'locked'
        },
        {
            id: '3',
            poolName: 'DOT 验证者池',
            symbol: 'DOT',
            icon: '/assets/dot.png',
            stakedAmount: 100,
            usdValue: 800,
            apr: 12.5,
            startTime: Date.now() - 10 * 24 * 60 * 60 * 1000,
            lockPeriod: 14,
            endTime: Date.now() + 4 * 24 * 60 * 60 * 1000,
            rewards: 1.08,
            rewardsUsd: 8.64,
            status: 'locked'
        },
        {
            id: '4',
            poolName: 'ADA 权益池',
            symbol: 'ADA',
            icon: '/assets/ada.png',
            stakedAmount: 1500,
            usdValue: 750,
            apr: 7.2,
            startTime: Date.now() - 5 * 24 * 60 * 60 * 1000,
            lockPeriod: 7,
            endTime: Date.now() + 2 * 24 * 60 * 60 * 1000,
            rewards: 9.32,
            rewardsUsd: 4.66,
            status: 'unlocking',
            unlockTime: Date.now() + 3 * 24 * 60 * 60 * 1000 // 3天后
        }
    ]);
    
    // 模态框状态
    const [unstakeModalVisible, setUnstakeModalVisible] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState<StakingPosition | null>(null);
    const [unstakeForm] = Form.useForm();
    
    // 计算总质押价值和总收益
    const totalStakedValue = stakingPositions.reduce((sum, position) => sum + position.usdValue, 0);
    const totalRewards = stakingPositions.reduce((sum, position) => sum + position.rewardsUsd, 0);
    
    useEffect(() => {
        // 模拟API调用
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);
    
    // 打开解除质押模态框
    const openUnstakeModal = (position: StakingPosition) => {
        setSelectedPosition(position);
        unstakeForm.setFieldsValue({
            amount: 0
        });
        setUnstakeModalVisible(true);
    };
    
    // 提交解除质押表单
    const handleUnstakeSubmit = (values: any) => {
        if (selectedPosition) {
            // 更新资产状态
            setStakingPositions(prevPositions => 
                prevPositions.map(position => 
                    position.id === selectedPosition.id 
                        ? {
                            ...position,
                            stakedAmount: position.stakedAmount - values.amount,
                            usdValue: position.usdValue * (position.stakedAmount - values.amount) / position.stakedAmount,
                            status: 'unlocking' as const,
                            unlockTime: Date.now() + position.lockPeriod * 24 * 60 * 60 * 1000 / 2 // 解锁时间为锁定期的一半
                        } 
                        : position
                ).filter(position => position.stakedAmount > 0) // 移除完全解除质押的项
            );
            
            // 关闭模态框
            setUnstakeModalVisible(false);
            unstakeForm.resetFields();
            
            message.success('解除质押请求已提交，请等待处理');
        }
    };
    
    // 提取收益
    const handleClaimRewards = (position: StakingPosition) => {
        message.success(`已成功提取 ${position.rewards} ${position.symbol} 收益`);
        
        // 更新收益为0
        setStakingPositions(
            stakingPositions.map(p => 
                p.id === position.id 
                    ? { ...p, rewards: 0, rewardsUsd: 0 } 
                    : p
            )
        );
    };
    
    // 渲染资产状态标签
    const renderStatusTag = (status: string, unlockTime?: number) => {
        switch(status) {
            case 'active':
                return <Tag color="green" icon={<CheckCircleOutlined />}>活跃中</Tag>;
            case 'locked':
                return <Tag color="blue" icon={<ClockCircleOutlined />}>锁定中</Tag>;
            case 'unlocking':
                if (unlockTime) {
                    const daysLeft = Math.ceil((unlockTime - Date.now()) / (24 * 60 * 60 * 1000));
                    return (
                        <Tooltip title={`${daysLeft}天后解锁`}>
                            <Tag color="orange" icon={<ClockCircleOutlined />}>解锁中</Tag>
                        </Tooltip>
                    );
                }
                return <Tag color="orange" icon={<ClockCircleOutlined />}>解锁中</Tag>;
            default:
                return <Tag color="default">{status}</Tag>;
        }
    };
    
    // 格式化日期
    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString('zh-CN');
    };
    
    // 计算剩余天数
    const getRemainingDays = (endTime: number) => {
        const days = Math.ceil((endTime - Date.now()) / (24 * 60 * 60 * 1000));
        return days > 0 ? days : 0;
    };
    
    // 资产列表列定义
    const positionColumns = [
        {
            title: '质押池',
            dataIndex: 'poolName',
            key: 'poolName',
            render: (text: string, record: StakingPosition) => (
                <div className={styles.poolInfo}>
                    <div className={styles.poolIcon}>
                        {record.symbol.charAt(0)}
                    </div>
                    <div className={styles.poolDetails}>
                        <div className={styles.poolName}>{text}</div>
                        <div className={styles.poolSymbol}>{record.symbol}</div>
                    </div>
                </div>
            )
        },
        {
            title: '质押数量',
            dataIndex: 'stakedAmount',
            key: 'stakedAmount',
            render: (amount: number, record: StakingPosition) => (
                <div className={styles.amountInfo}>
                    <div className={styles.amountValue}>{amount} {record.symbol}</div>
                    <div className={styles.amountUsd}>≈ ${record.usdValue.toLocaleString()}</div>
                </div>
            )
        },
        {
            title: '年化收益率',
            dataIndex: 'apr',
            key: 'apr',
            render: (apr: number) => (
                <Tag color="green" className={styles.aprTag}>
                    <RiseOutlined /> {apr}%
                </Tag>
            )
        },
        {
            title: '锁定期',
            key: 'lockInfo',
            render: (text: string, record: StakingPosition) => (
                <div className={styles.lockInfo}>
                    <div>{record.lockPeriod} 天</div>
                    <div className={styles.dateRange}>
                        {formatDate(record.startTime)} - {formatDate(record.endTime)}
                    </div>
                    {record.status !== 'unlocking' && (
                        <Progress 
                            percent={Math.round(((Date.now() - record.startTime) / (record.endTime - record.startTime)) * 100)} 
                            size="small" 
                            showInfo={false}
                            strokeColor={{
                                '0%': '#1890ff',
                                '100%': '#52c41a',
                            }}
                        />
                    )}
                    {record.status !== 'unlocking' && (
                        <div className={styles.remainingDays}>
                            剩余 {getRemainingDays(record.endTime)} 天
                        </div>
                    )}
                </div>
            )
        },
        {
            title: '累计收益',
            dataIndex: 'rewards',
            key: 'rewards',
            render: (rewards: number, record: StakingPosition) => (
                <div className={styles.rewardsInfo}>
                    <div className={styles.rewardsValue}>
                        +{rewards} {record.symbol}
                    </div>
                    <div className={styles.rewardsUsd}>
                        ≈ ${record.rewardsUsd.toLocaleString()}
                    </div>
                </div>
            )
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (status: string, record: StakingPosition) => renderStatusTag(status, record.unlockTime)
        },
        {
            title: '操作',
            key: 'action',
            render: (text: string, record: StakingPosition) => (
                <Space size="middle" className={styles.actionButtons}>
                    <Button 
                        type="primary" 
                        icon={<GiftOutlined />}
                        onClick={() => handleClaimRewards(record)}
                        disabled={record.rewards <= 0}
                    >
                        提取收益
                    </Button>
                    <Button 
                        danger
                        icon={<UnlockOutlined />}
                        onClick={() => openUnstakeModal(record)}
                        disabled={record.status === 'unlocking'}
                    >
                        解除质押
                    </Button>
                </Space>
            )
        }
    ];
    
    return (
        <AdminContentCard title="质押管理" icon={<WalletOutlined />} reqKey="staking">
            <Spin spinning={loading}>
                <div className={styles.stakingContainer}>
                    {/* 概览卡片 */}
                    <Row gutter={[24, 24]} className={styles.overviewSection}>
                        <Col xs={24} sm={8}>
                            <Card className={styles.overviewCard}>
                                <Statistic
                                    title="总质押价值"
                                    value={totalStakedValue}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' }}
                                    prefix={<WalletOutlined />}
                                    suffix="USD"
                                />
                                <div className={styles.cardTrend}>
                                    <ArrowUpOutlined /> 较上月增长 8.2%
                                </div>
                            </Card>
                        </Col>
                        <Col xs={24} sm={8}>
                            <Card className={styles.overviewCard}>
                                <Statistic
                                    title="累计质押收益"
                                    value={totalRewards}
                                    precision={2}
                                    valueStyle={{ color: '#cf1322' }}
                                    prefix={<RiseOutlined />}
                                    suffix="USD"
                                />
                                <div className={styles.cardTrend}>
                                    <ArrowUpOutlined /> 较上月增长 12.5%
                                </div>
                            </Card>
                        </Col>
                        <Col xs={24} sm={8}>
                            <Card className={styles.overviewCard}>
                                <Statistic
                                    title="平均年化收益率"
                                    value={7.2}
                                    precision={1}
                                    valueStyle={{ color: '#1890ff' }}
                                    prefix={<RiseOutlined />}
                                    suffix="%"
                                />
                                <div className={styles.cardTrend}>
                                    <ArrowUpOutlined /> 较上月增长 0.5%
                                </div>
                            </Card>
                        </Col>
                    </Row>
                    
                    {/* 质押资产列表 */}
                    <div className={styles.stakingPositions}>
                        <div className={styles.sectionHeader}>
                            <Title level={4}>我的质押资产</Title>
                        </div>
                        
                        {stakingPositions.length > 0 ? (
                            <Table 
                                dataSource={stakingPositions} 
                                columns={positionColumns} 
                                rowKey="id"
                                pagination={false}
                                className={styles.stakingTable}
                                rowClassName={styles.stakingRow}
                            />
                        ) : (
                            <div className={styles.emptyState}>
                                <Text>您当前没有任何质押资产</Text>
                                <Button type="primary">开始质押</Button>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* 解除质押模态框 */}
                <Modal
                    title={
                        <div className={styles.modalTitle}>
                            <UnlockOutlined /> 解除质押 {selectedPosition?.symbol}
                        </div>
                    }
                    open={unstakeModalVisible}
                    onCancel={() => setUnstakeModalVisible(false)}
                    footer={null}
                    className={styles.stakingModal}
                >
                    {selectedPosition && (
                        <Form
                            form={unstakeForm}
                            layout="vertical"
                            onFinish={handleUnstakeSubmit}
                        >
                            <div className={styles.assetInfoModal}>
                                <div className={styles.assetIconLarge}>
                                    {selectedPosition.symbol.charAt(0)}
                                </div>
                                <div className={styles.assetDetailsModal}>
                                    <div className={styles.assetNameModal}>{selectedPosition.poolName}</div>
                                    <div className={styles.assetBalanceModal}>
                                        已质押: {selectedPosition.stakedAmount} {selectedPosition.symbol}
                                        <span className={styles.usdValue}>
                                            (≈ ${selectedPosition.usdValue.toLocaleString()})
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            <Divider />
                            
                            <Form.Item
                                label="解除质押数量"
                                name="amount"
                                rules={[
                                    { required: true, message: '请输入解除质押数量' },
                                    { 
                                        type: 'number', 
                                        min: 0.000001, 
                                        max: selectedPosition.stakedAmount,
                                        message: `解除质押数量必须大于0且不超过已质押数量 ${selectedPosition.stakedAmount} ${selectedPosition.symbol}`
                                    }
                                ]}
                            >
                                <InputNumber
                                    style={{ width: '100%' }}
                                    placeholder={`输入解除质押数量，最多 ${selectedPosition.stakedAmount} ${selectedPosition.symbol}`}
                                    step={0.01}
                                    precision={6}
                                    addonAfter={selectedPosition.symbol}
                                />
                            </Form.Item>
                            
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Button 
                                        style={{ width: '100%' }} 
                                        onClick={() => {
                                            unstakeForm.setFieldsValue({
                                                amount: selectedPosition.stakedAmount / 4
                                            });
                                        }}
                                    >
                                        25%
                                    </Button>
                                </Col>
                                <Col span={12}>
                                    <Button 
                                        style={{ width: '100%' }} 
                                        onClick={() => {
                                            unstakeForm.setFieldsValue({
                                                amount: selectedPosition.stakedAmount / 2
                                            });
                                        }}
                                    >
                                        50%
                                    </Button>
                                </Col>
                            </Row>
                            
                            <Row gutter={16} style={{ marginTop: 16 }}>
                                <Col span={12}>
                                    <Button 
                                        style={{ width: '100%' }} 
                                        onClick={() => {
                                            unstakeForm.setFieldsValue({
                                                amount: selectedPosition.stakedAmount * 0.75
                                            });
                                        }}
                                    >
                                        75%
                                    </Button>
                                </Col>
                                <Col span={12}>
                                    <Button 
                                        style={{ width: '100%' }} 
                                        onClick={() => {
                                            unstakeForm.setFieldsValue({
                                                amount: selectedPosition.stakedAmount
                                            });
                                        }}
                                    >
                                        最大
                                    </Button>
                                </Col>
                            </Row>
                            
                            <Alert
                                message="解除质押说明"
                                description={
                                    <ul className={styles.unstakeNotes}>
                                        <li>发起解除质押后需要等待锁定期的一半时间才能完成</li>
                                        <li>解除质押期间将不再产生质押收益</li>
                                        <li>解除质押完成后资产将自动返还到您的可用余额</li>
                                        <li>累计收益不受影响，将继续保留在您的账户中</li>
                                    </ul>
                                }
                                type="warning"
                                showIcon
                                className={styles.unstakeAlert}
                            />
                            
                            <div className={styles.modalFooter}>
                                <Button onClick={() => setUnstakeModalVisible(false)} style={{ marginRight: 8 }}>
                                    取消
                                </Button>
                                <Button type="primary" htmlType="submit" danger>
                                    确认解除质押
                                </Button>
                            </div>
                        </Form>
                    )}
                </Modal>
            </Spin>
        </AdminContentCard>
    );
};

export default Staking;