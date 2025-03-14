import React, { useState } from 'react';
import { LockOutlined } from '@ant-design/icons';
import { Form, Input, Button, Switch, message } from 'antd';
import AdminContentCard from '../AdminContentCard';

const SecuritySettings: React.FC = () => {
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [form] = Form.useForm();

    const handlePasswordChange = (values: any) => {
        console.log('新密码:', values.newPassword);
        message.success('密码修改成功！');
    };

    const handleTwoFactorChange = (checked: boolean) => {
        setTwoFactorEnabled(checked);
        message.success(`两步验证已${checked ? '启用' : '禁用'}`);
    };

    return (
        <div>
            <AdminContentCard title="安全设置" icon={<LockOutlined />}>
                <Form form={form} onFinish={handlePasswordChange}>
                    <Form.Item
                        label="当前密码"
                        name="currentPassword"
                        rules={[{ required: true, message: '请输入当前密码!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="新密码"
                        name="newPassword"
                        rules={[{ required: true, message: '请输入新密码!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="确认新密码"
                        name="confirmPassword"
                        rules={[{ required: true, message: '请确认新密码!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            修改密码
                        </Button>
                    </Form.Item>
                </Form>
                <div style={{ marginTop: '16px' }}>
                    <p>启用两步验证以增强账户安全性。</p>
                    <Switch checked={twoFactorEnabled} onChange={handleTwoFactorChange} />
                </div>
            </AdminContentCard>
        </div>
    );
};

export default SecuritySettings;