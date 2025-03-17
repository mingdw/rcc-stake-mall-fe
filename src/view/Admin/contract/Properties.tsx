import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import AdminContentCard from '../AdminContentCard';
import styles from './Properties.module.scss';

const Properties: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            // 处理合约参数设置
            message.success('参数设置已更新');
        } catch (error) {
            message.error('更新失败');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminContentCard 
            title="参数设置"
            icon={<SettingOutlined />}
        >
            <div className={styles.properties}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    {/* 添加参数配置表单项 */}
                </Form>
            </div>
        </AdminContentCard>
    );
};

export default Properties; 