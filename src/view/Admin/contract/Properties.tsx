import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, message, InputNumber, Switch, Divider, Tooltip, Space, Row, Col } from 'antd';
import { 
  SettingOutlined, 
  InfoCircleOutlined, 
  SaveOutlined, 
  ReloadOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined
} from '@ant-design/icons';
import AdminContentCard from '../AdminContentCard';
import styles from './Properties.module.scss';

const Properties: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [withdrawPaused, setWithdrawPaused] = useState(false);
    const [claimPaused, setClaimPaused] = useState(false);
    const [currentBlockNumber, setCurrentBlockNumber] = useState<number>(0);

    // 模拟获取合约参数
    useEffect(() => {
        const fetchContractParams = async () => {
            try {
                // 这里应该调用区块链接口获取当前合约参数
                // 模拟数据
                const mockData = {
                    rccAddress: '0x7890abcdef1234567890abcdef123456789012345',
                    startBlock: 15000000,
                    endBlock: 17000000,
                    rccPerBlock: 10,
                    withdrawPaused: false,
                    claimPaused: false
                };
                
                form.setFieldsValue(mockData);
                setWithdrawPaused(mockData.withdrawPaused);
                setClaimPaused(mockData.claimPaused);
                
                // 模拟获取当前区块号
                setCurrentBlockNumber(15500000);
            } catch (error) {
                message.error('获取合约参数失败');
                console.error('获取合约参数失败:', error);
            }
        };
        
        fetchContractParams();
    }, [form]);

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            console.log('更新合约参数:', values);
            // 应该调用合约方法更新参数
            // 例如: await contract.setRCC(values.rccAddress)
            //      await contract.setStartBlock(values.startBlock)
            //      await contract.setEndBlock(values.endBlock)
            //      await contract.setRCCPerBlock(values.rccPerBlock)
            
            message.success('参数设置已更新');
        } catch (error) {
            message.error('更新失败');
            console.error('更新合约参数失败:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePauseWithdraw = async () => {
        setLoading(true);
        try {
            // 调用合约的pauseWithdraw或unpauseWithdraw方法
            // const tx = await contract.pauseWithdraw();
            // await tx.wait();
            
            setWithdrawPaused(!withdrawPaused);
            message.success(`提款功能已${!withdrawPaused ? '暂停' : '恢复'}`);
        } catch (error) {
            message.error(`${!withdrawPaused ? '暂停' : '恢复'}提款功能失败`);
            console.error('更改提款状态失败:', error);
        } finally {
            setLoading(false);
        }
    };
    
    const handlePauseClaim = async () => {
        setLoading(true);
        try {
            // 调用合约的pauseClaim或unpauseClaim方法
            // const tx = await contract.pauseClaim();
            // await tx.wait();
            
            setClaimPaused(!claimPaused);
            message.success(`领取奖励功能已${!claimPaused ? '暂停' : '恢复'}`);
        } catch (error) {
            message.error(`${!claimPaused ? '暂停' : '恢复'}领取奖励功能失败`);
            console.error('更改领取奖励状态失败:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminContentCard 
            title="合约参数设置"
            icon={<SettingOutlined />}
        >
            <div className={styles.properties}>
                <div className={styles.blockInfo}>
                    <div className={styles.currentBlock}>
                        <div className={styles.blockTitle}>当前区块</div>
                        <div className={styles.blockNumber}>{currentBlockNumber.toLocaleString()}</div>
                    </div>
                    <div className={styles.statusCards}>
                        <Card className={`${styles.statusCard} ${withdrawPaused ? styles.paused : styles.active}`}>
                            <div className={styles.statusIcon}>
                                {withdrawPaused ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                            </div>
                            <div className={styles.statusInfo}>
                                <div className={styles.statusTitle}>提款状态</div>
                                <div className={styles.statusValue}>{withdrawPaused ? '已暂停' : '活跃中'}</div>
                            </div>
                            <Button 
                                type="primary"
                                danger={!withdrawPaused}
                                onClick={handlePauseWithdraw}
                                loading={loading}
                                className={styles.statusButton}
                            >
                                {withdrawPaused ? '恢复提款' : '暂停提款'}
                            </Button>
                        </Card>
                        <Card className={`${styles.statusCard} ${claimPaused ? styles.paused : styles.active}`}>
                            <div className={styles.statusIcon}>
                                {claimPaused ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                            </div>
                            <div className={styles.statusInfo}>
                                <div className={styles.statusTitle}>领取奖励状态</div>
                                <div className={styles.statusValue}>{claimPaused ? '已暂停' : '活跃中'}</div>
                            </div>
                            <Button 
                                type="primary"
                                danger={!claimPaused}
                                onClick={handlePauseClaim}
                                loading={loading}
                                className={styles.statusButton}
                            >
                                {claimPaused ? '恢复领取' : '暂停领取'}
                            </Button>
                        </Card>
                    </div>
                </div>

                <Divider orientation="left">基础参数配置</Divider>
                
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    className={styles.settingsForm}
                >
                    <Row gutter={24}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="rccAddress"
                                label={
                                    <span>
                                        RCC代币地址
                                        <Tooltip title="设置RCC代币的合约地址，用于分发奖励">
                                            <InfoCircleOutlined className={styles.infoIcon} />
                                        </Tooltip>
                                    </span>
                                }
                                rules={[
                                    { required: true, message: '请输入RCC代币地址' },
                                    { pattern: /^0x[a-fA-F0-9]{40}$/, message: '请输入有效的以太坊地址' }
                                ]}
                            >
                                <Input placeholder="输入RCC代币合约地址" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="rccPerBlock"
                                label={
                                    <span>
                                        每区块RCC奖励
                                        <Tooltip title="每个区块分发的RCC代币奖励数量">
                                            <InfoCircleOutlined className={styles.infoIcon} />
                                        </Tooltip>
                                    </span>
                                }
                                rules={[{ required: true, message: '请输入每区块RCC奖励数量' }]}
                            >
                                <InputNumber 
                                    min={0.000001} 
                                    step={0.1} 
                                    precision={6} 
                                    style={{ width: '100%' }}
                                    placeholder="输入每区块奖励数量"
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="startBlock"
                                label={
                                    <span>
                                        开始区块号
                                        <Tooltip title="质押挖矿开始的区块号">
                                            <InfoCircleOutlined className={styles.infoIcon} />
                                        </Tooltip>
                                    </span>
                                }
                                rules={[{ required: true, message: '请输入开始区块号' }]}
                            >
                                <InputNumber 
                                    min={0} 
                                    style={{ width: '100%' }}
                                    placeholder="输入开始区块号" 
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="endBlock"
                                label={
                                    <span>
                                        结束区块号
                                        <Tooltip title="质押挖矿结束的区块号">
                                            <InfoCircleOutlined className={styles.infoIcon} />
                                        </Tooltip>
                                    </span>
                                }
                                rules={[
                                    { required: true, message: '请输入结束区块号' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('startBlock') < value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('结束区块必须大于开始区块'));
                                        },
                                    }),
                                ]}
                            >
                                <InputNumber 
                                    min={0} 
                                    style={{ width: '100%' }}
                                    placeholder="输入结束区块号" 
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <div className={styles.formActions}>
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            loading={loading}
                            icon={<SaveOutlined />}
                            className={styles.submitButton}
                        >
                            保存设置
                        </Button>
                        <Button 
                            onClick={() => form.resetFields()} 
                            icon={<ReloadOutlined />}
                        >
                            重置
                        </Button>
                    </div>
                </Form>
            </div>
        </AdminContentCard>
    );
};

export default Properties; 