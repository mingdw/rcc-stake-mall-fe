import React, { useState } from 'react';
import { Form, Input, Button, Upload, message, Card, Alert } from 'antd';
import { UploadOutlined, CloudUploadOutlined } from '@ant-design/icons';
import AdminContentCard from '../AdminContentCard';
import styles from './ContractUpgrade.module.scss';

const ContractUpgrade: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleUpgrade = async (values: any) => {
        setLoading(true);
        try {
            // 处理合约升级逻辑
            message.success('合约升级成功');
        } catch (error) {
            message.error('升级失败');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminContentCard 
            title="合约升级"
            icon={<CloudUploadOutlined />}
        >
            <div className={styles.contractUpgrade}>
                <Alert
                    message="警告"
                    description="升级合约将影响所有用户，请确保新版本经过充分测试！"
                    type="warning"
                    showIcon
                    className={styles.warning}
                />
                <Card title="升级配置" className={styles.upgradeCard}>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleUpgrade}
                    >
                        <Form.Item
                            label="新合约地址"
                            name="newAddress"
                            rules={[{ required: true, message: '请输入新合约地址' }]}
                        >
                            <Input placeholder="请输入新合约地址" />
                        </Form.Item>
                        <Form.Item
                            label="ABI文件"
                            name="abiFile"
                        >
                            <Upload>
                                <Button icon={<UploadOutlined />}>上传ABI文件</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                确认升级
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </AdminContentCard>
    );
};

export default ContractUpgrade; 