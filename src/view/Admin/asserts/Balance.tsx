import React, { useState, useEffect } from 'react';
import { MoneyCollectOutlined, SwapOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Input, Select, message, Spin, Card, Row, Col, Statistic, Tooltip, Divider } from 'antd';
import AdminContentCard from '../AdminContentCard';
import styles from './Balance.module.scss';
// 导入图标
import ethIcon from '@/assets/icons/eth.png';
import rccIcon from '@/assets/icons/rcc.png';
import usdtIcon from '@/assets/icons/usdt.png';

const { Option } = Select;

interface TokenBalance {
    symbol: string;
    amount: number;
    usdValue: number;
    icon?: string;
}

interface PendingReward {
    symbol: string;
    amount: number;
    usdValue: number;
    source: string;
    estimatedTime: number; // 预计到账时间戳
}

interface ExchangeRate {
    symbol: string;
    rccRate: number;
}

interface BalanceInfo {
    walletBalance: TokenBalance[];
    totalRewards: number;
    pendingRewards: PendingReward[];
}

const Balance: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [balanceInfo, setBalanceInfo] = useState<BalanceInfo>({
        walletBalance: [
            { 
                symbol: 'RCC', // 把RCC放在第一位
                amount: 1000, 
                usdValue: 1000, 
                icon: 'https://example.com/rcc-icon.png'
            },
            { 
                symbol: 'ETH', 
                amount: 1.5, 
                usdValue: 3000, 
                icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png'
            },
            { 
                symbol: 'USDT', 
                amount: 500, 
                usdValue: 500, 
                icon: 'https://cryptologos.cc/logos/tether-usdt-logo.png'
            },
            { 
                symbol: 'DAI', 
                amount: 300, 
                usdValue: 300, 
                icon: 'https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png'
            }
        ],
        totalRewards: 71.3,
        pendingRewards: [
            {
                symbol: 'RCC',
                amount: 25.5,
                usdValue: 25.5,
                source: 'ETH 2.0 质押池',
                estimatedTime: Date.now() + 2 * 24 * 60 * 60 * 1000 // 2天后
            },
            {
                symbol: 'RCC',
                amount: 12.8,
                usdValue: 12.8,
                source: 'BTC 收益池',
                estimatedTime: Date.now() + 5 * 24 * 60 * 60 * 1000 // 5天后
            },
            {
                symbol: 'ETH',
                amount: 0.05,
                usdValue: 100,
                source: '推荐奖励',
                estimatedTime: Date.now() + 1 * 24 * 60 * 60 * 1000 // 1天后
            }
        ]
    });

    const [isExchangeModalVisible, setIsExchangeModalVisible] = useState(false);
    const [exchangeAmount, setExchangeAmount] = useState<string>('');
    const [selectedToken, setSelectedToken] = useState<string>('ETH');

    // 模拟汇率数据
    const exchangeRates: ExchangeRate[] = [
        { symbol: 'ETH', rccRate: 2000 },    // 1 ETH = 2000 RCC
        { symbol: 'USDT', rccRate: 1 },      // 1 USDT = 1 RCC
        { symbol: 'USDC', rccRate: 1 }       // 1 USDC = 1 RCC
    ];

    // 计算总在途收益
    const totalPendingRewards = balanceInfo.pendingRewards.reduce((sum, reward) => sum + reward.usdValue, 0);

    // 格式化日期
    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString('zh-CN');
    };

    // 计算剩余天数
    const getDaysRemaining = (timestamp: number) => {
        const days = Math.ceil((timestamp - Date.now()) / (24 * 60 * 60 * 1000));
        return days > 0 ? days : 0;
    };

    // 模拟获取数据
    useEffect(() => {
        const fetchBalanceData = async () => {
            try {
                // 这里应该调用实际的API
                setLoading(false);
            } catch (error) {
                message.error('获取数据失败');
                setLoading(false);
            }
        };

        fetchBalanceData();
    }, []);

    return (
        <>
            <AdminContentCard 
                title="资产总览" 
                icon={<MoneyCollectOutlined />} 
                reqKey="balance"
            >
                <Spin spinning={loading}>
                    <div className={styles.balanceContainer}>
                        {/* RCC资产展示区 */}
                        <div className={styles.rccSection}>
                            <div className={styles.rccBalance}>
                                <div className={styles.rccIcon}>
                                    <img src="/vite.svg" alt="RCC" />
                                </div>
                                <div className={styles.rccInfo}>
                                    <div className={styles.rccStatsRow}>
                                        <div className={styles.rccStatItem}>
                                            <span className={styles.statLabel}>账户余额</span>
                                            <div className={styles.statValueWrapper}>
                                                <span className={styles.statValue}>
                                                    {balanceInfo.walletBalance[0].amount.toLocaleString()}
                                                </span>
                                                <span className={styles.unit}>R</span>
                                                <span className={styles.statUsdValue}>
                                                    ≈ ${balanceInfo.walletBalance[0].usdValue.toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                        <div className={styles.rccStatItem}>
                                            <span className={styles.statLabel}>累计收益</span>
                                            <div className={styles.statValueWrapper}>
                                                <span className={styles.statValue}>
                                                    {balanceInfo.totalRewards.toLocaleString()}
                                                </span>
                                                <span className={styles.unit}>R</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 在途收益展示区 */}
                        <div className={styles.section}>
                            <div className={styles.sectionHeader}>
                                <h3>在途收益</h3>
                                <div className={styles.pendingTotal}>
                                    总计: <span className={styles.pendingTotalValue}>${totalPendingRewards.toLocaleString()}</span>
                                </div>
                            </div>
                            {balanceInfo.pendingRewards.length > 0 ? (
                                <div className={styles.pendingRewardsList}>
                                    {balanceInfo.pendingRewards.map((reward, index) => (
                                        <Card key={index} className={styles.pendingRewardCard}>
                                            <div className={styles.pendingRewardInfo}>
                                                <div className={styles.pendingRewardSource}>
                                                    {reward.source}
                                                </div>
                                                <div className={styles.pendingRewardAmount}>
                                                    +{reward.amount} {reward.symbol}
                                                    <span className={styles.pendingRewardUsd}>
                                                        (≈ ${reward.usdValue.toLocaleString()})
                                                    </span>
                                                </div>
                                                <div className={styles.pendingRewardTime}>
                                                    <ClockCircleOutlined /> 预计 {formatDate(reward.estimatedTime)} 到账
                                                    <Tooltip title={`还需 ${getDaysRemaining(reward.estimatedTime)} 天`}>
                                                        <span className={styles.daysRemaining}>
                                                            ({getDaysRemaining(reward.estimatedTime)}天)
                                                        </span>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <div className={styles.emptyPendingRewards}>
                                    暂无在途收益
                                </div>
                            )}
                        </div>

                        <Divider />

                        {/* 其他资产展示区 */}
                        <div className={styles.section}>
                            <div className={styles.sectionHeader}>
                                <h3>可兑换资产</h3>
                                <Button 
                                    type="primary" 
                                    icon={<SwapOutlined />}
                                    onClick={() => setIsExchangeModalVisible(true)}
                                >
                                    兑换为 RCC
                                </Button>
                            </div>
                            <div className={styles.tokenList}>
                                {balanceInfo.walletBalance.slice(1).map((token, index) => (
                                    <div key={index} className={styles.tokenItem}>
                                        <div className={styles.tokenIcon}>
                                            {token.icon && (
                                                <img 
                                                    src={token.icon} 
                                                    alt={token.symbol}
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.style.display = 'none';
                                                    }}
                                                />
                                            )}
                                        </div>
                                        <div className={styles.tokenInfo}>
                                            <div className={styles.tokenAmount}>
                                                {token.amount.toLocaleString()} {token.symbol}
                                            </div>
                                            <div className={styles.tokenValue}>
                                                ≈ ${token.usdValue.toLocaleString()}
                                            </div>
                                        </div>
                                        <Button 
                                            type="link" 
                                            icon={<SwapOutlined />}
                                            className={styles.exchangeButton}
                                            onClick={() => {
                                                setSelectedToken(token.symbol);
                                                setIsExchangeModalVisible(true);
                                            }}
                                        >
                                            兑换
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Spin>
            </AdminContentCard>

            {/* 兑换弹窗优化 */}
            <Modal
                title="兑换为 RCC"
                open={isExchangeModalVisible}
                onOk={() => {
                    message.success('兑换请求已提交');
                    setIsExchangeModalVisible(false);
                }}
                onCancel={() => setIsExchangeModalVisible(false)}
                okText="确认兑换"
                cancelText="取消"
            >
                <div className={styles.exchangeForm}>
                    <div className={styles.exchangeToken}>
                        <Select 
                            value={selectedToken}
                            onChange={setSelectedToken}
                            style={{ width: '100%' }}
                        >
                            {balanceInfo.walletBalance.slice(1).map((token, index) => (
                                <Option key={index} value={token.symbol}>
                                    <div className={styles.tokenOption}>
                                        <img src={token.icon} alt={token.symbol} />
                                        <span>{token.symbol}</span>
                                        <span className={styles.balance}>
                                            余额: {token.amount}
                                        </span>
                                    </div>
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <Input
                        placeholder="请输入兑换数量"
                        value={exchangeAmount}
                        onChange={(e) => setExchangeAmount(e.target.value)}
                        type="number"
                        min="0"
                        prefix={selectedToken}
                    />
                    <div className={styles.exchangeRate}>
                        当前兑换比率：1 {selectedToken} = {exchangeRates.find(r => r.symbol === selectedToken)?.rccRate || 0} RCC
                    </div>
                    <div className={styles.exchangeEstimate}>
                        预计获得：{(Number(exchangeAmount || 0) * (exchangeRates.find(r => r.symbol === selectedToken)?.rccRate || 0)).toFixed(2)} RCC
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Balance;