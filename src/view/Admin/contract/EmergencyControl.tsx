import React, { useState } from 'react';
import { Button, Card, Alert, Modal, Input, Space, Divider, Typography, Row, Col, message } from 'antd';
import { 
  ExclamationCircleOutlined, 
  AlertOutlined, 
  PauseCircleOutlined, 
  PlayCircleOutlined,
  LockOutlined,
  UnlockOutlined,
  WarningOutlined,
  SyncOutlined,
  SendOutlined
} from '@ant-design/icons';
import AdminContentCard from '../AdminContentCard';
import styles from './EmergencyControl.module.scss';

const { Text, Title } = Typography;
const { confirm } = Modal;

const EmergencyControl: React.FC = () => {
    const [loading, setLoading] = useState<{[key: string]: boolean}>({
        pause: false,
        emergencyWithdraw: false,
        upgrade: false
    });
    const [contractPaused, setContractPaused] = useState(false);
    const [upgradeModalVisible, setUpgradeModalVisible] = useState(false);
    const [upgradeAddress, setUpgradeAddress] = useState('');

    // 处理合约暂停/恢复
    const handlePauseContract = async () => {
        setLoading({...loading, pause: true});
        try {
            // 这里应该调用合约方法来暂停/恢复合约
            // 例如: await contract.pause() 或 await contract.unpause()
            
            setContractPaused(!contractPaused);
            message.success(`合约已${contractPaused ? '恢复' : '暂停'}`);
        } catch (error) {
            message.error(`${contractPaused ? '恢复' : '暂停'}合约失败`);
            console.error('合约暂停/恢复操作失败:', error);
        } finally {
            setLoading({...loading, pause: false});
        }
    };

    // 处理紧急提款确认
    const showEmergencyWithdrawConfirm = () => {
        confirm({
            title: '确认执行紧急提款操作？',
            icon: <ExclamationCircleOutlined />,
            content: (
                <div className={styles.confirmContent}>
                    <Alert
                        message="危险操作警告"
                        description="紧急提款将强制释放所有用户的质押资金。此操作不可逆，仅在极端紧急情况下使用。"
                        type="error"
                        showIcon
                        className={styles.warningAlert}
                    />
                    <Text>请输入 <Text strong>EMERGENCY_WITHDRAW</Text> 确认操作：</Text>
                    <Input className={styles.confirmInput} placeholder="输入确认文字" />
                </div>
            ),
            okText: '确认执行',
            okType: 'danger',
            cancelText: '取消',
            onOk: handleEmergencyWithdraw,
        });
    };

    // 执行紧急提款
    const handleEmergencyWithdraw = async () => {
        setLoading({...loading, emergencyWithdraw: true});
        try {
            // 这里应该调用合约方法执行紧急提款
            // 例如: await contract.emergencyWithdraw()
            
            message.success('紧急提款操作已执行');
        } catch (error) {
            message.error('紧急提款操作失败');
            console.error('紧急提款操作失败:', error);
        } finally {
            setLoading({...loading, emergencyWithdraw: false});
        }
    };

    // 处理合约升级
    const handleUpgrade = async () => {
        if (!upgradeAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
            message.error('请输入有效的合约地址');
            return;
        }

        setLoading({...loading, upgrade: true});
        try {
            // 这里应该调用合约方法执行升级
            // 例如: await contract.upgradeTo(upgradeAddress)
            
            message.success('合约升级成功');
            setUpgradeModalVisible(false);
            setUpgradeAddress('');
        } catch (error) {
            message.error('合约升级失败');
            console.error('合约升级失败:', error);
        } finally {
            setLoading({...loading, upgrade: false});
        }
    };

    // 显示升级模态框
    const showUpgradeModal = () => {
        setUpgradeModalVisible(true);
    };

    return (
        <AdminContentCard 
            title="紧急控制中心"
            icon={<AlertOutlined />}
        >
            <div className={styles.emergencyControl}>
                <Alert
                    message="管理员安全提示"
                    description="此页面包含高风险操作，请谨慎使用。所有操作都将记录在区块链上且不可撤销。"
                    type="warning"
                    showIcon
                    className={styles.pageAlert}
                />

                <Row gutter={[24, 24]} className={styles.controlGrid}>
                    <Col xs={24} md={8}>
                        <Card 
                            className={`${styles.controlCard} ${contractPaused ? styles.paused : styles.active}`}
                            title={
                                <div className={styles.cardTitle}>
                                    {contractPaused ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                                    <span>合约状态控制</span>
                                </div>
                            }
                        >
                            <div className={styles.cardContent}>
                                <div className={styles.statusDisplay}>
                                    <Text>当前状态:</Text>
                                    <Text strong className={contractPaused ? styles.pausedText : styles.activeText}>
                                        {contractPaused ? '已暂停' : '运行中'}
                                    </Text>
                                </div>
                                <div className={styles.statusDescription}>
                                    <Text type="secondary">
                                        {contractPaused 
                                            ? '合约当前已暂停，所有用户交互功能已禁用。' 
                                            : '合约当前正常运行，所有功能可用。'}
                                    </Text>
                                </div>
                                <Button
                                    type="primary"
                                    danger={!contractPaused}
                                    icon={contractPaused ? <PlayCircleOutlined /> : <PauseCircleOutlined />}
                                    loading={loading.pause}
                                    onClick={handlePauseContract}
                                    className={styles.actionButton}
                                >
                                    {contractPaused ? '恢复合约' : '暂停合约'}
                                </Button>
                            </div>
                        </Card>
                    </Col>

                    <Col xs={24} md={8}>
                        <Card 
                            className={`${styles.controlCard} ${styles.danger}`}
                            title={
                                <div className={styles.cardTitle}>
                                    <WarningOutlined />
                                    <span>紧急提款</span>
                                </div>
                            }
                        >
                            <div className={styles.cardContent}>
                                <div className={styles.warningBox}>
                                    <Text strong className={styles.dangerText}>高风险操作</Text>
                                    <Text type="secondary">
                                        此操作将解锁并返还所有用户的质押资金，仅用于紧急情况。
                                    </Text>
                                </div>
                                <Button
                                    type="primary"
                                    danger
                                    icon={<UnlockOutlined />}
                                    loading={loading.emergencyWithdraw}
                                    onClick={showEmergencyWithdrawConfirm}
                                    className={styles.actionButton}
                                >
                                    执行紧急提款
                                </Button>
                            </div>
                        </Card>
                    </Col>

                    <Col xs={24} md={8}>
                        <Card 
                            className={`${styles.controlCard} ${styles.upgrade}`}
                            title={
                                <div className={styles.cardTitle}>
                                    <SyncOutlined />
                                    <span>合约升级</span>
                                </div>
                            }
                        >
                            <div className={styles.cardContent}>
                                <div className={styles.warningBox}>
                                    <Text type="secondary">
                                        升级合约逻辑实现，需要提供新合约地址。请确保新合约已经过全面测试。
                                    </Text>
                                </div>
                                <Button
                                    type="primary"
                                    icon={<SendOutlined />}
                                    onClick={showUpgradeModal}
                                    className={styles.actionButton}
                                >
                                    升级合约
                                </Button>
                            </div>
                        </Card>
                    </Col>
                </Row>

                <Divider orientation="left">功能状态概览</Divider>
                
                <div className={styles.statusOverview}>
                    <Card className={styles.statusSummaryCard}>
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={12} md={8}>
                                <div className={styles.statusItem}>
                                    <div className={styles.statusLabel}>
                                        <LockOutlined className={styles.statusIcon} />
                                        <Text>提款状态</Text>
                                    </div>
                                    <Text strong className={styles.activeText}>正常</Text>
                                </div>
                            </Col>
                            <Col xs={24} sm={12} md={8}>
                                <div className={styles.statusItem}>
                                    <div className={styles.statusLabel}>
                                        <SendOutlined className={styles.statusIcon} />
                                        <Text>领取奖励状态</Text>
                                    </div>
                                    <Text strong className={styles.activeText}>正常</Text>
                                </div>
                            </Col>
                            <Col xs={24} sm={12} md={8}>
                                <div className={styles.statusItem}>
                                    <div className={styles.statusLabel}>
                                        <SyncOutlined className={styles.statusIcon} />
                                        <Text>合约实现版本</Text>
                                    </div>
                                    <Text strong>V1.0.0</Text>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </div>
            </div>

            <Modal
                title="升级合约"
                open={upgradeModalVisible}
                onCancel={() => setUpgradeModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setUpgradeModalVisible(false)}>
                        取消
                    </Button>,
                    <Button 
                        key="submit" 
                        type="primary" 
                        loading={loading.upgrade}
                        onClick={handleUpgrade}
                    >
                        确认升级
                    </Button>
                ]}
            >
                <Alert
                    message="操作提示"
                    description="请确保新合约实现已经过全面测试，且与当前存储布局兼容。"
                    type="info"
                    showIcon
                    style={{ marginBottom: 16 }}
                />
                <div className={styles.upgradeForm}>
                    <Text strong>新合约实现地址:</Text>
                    <Input 
                        placeholder="输入新合约地址 (0x...)" 
                        value={upgradeAddress}
                        onChange={(e) => setUpgradeAddress(e.target.value)}
                        className={styles.upgradeInput}
                    />
                </div>
            </Modal>
        </AdminContentCard>
    );
}; 

export default EmergencyControl;
