import React, { useState } from 'react';
import { BellOutlined } from '@ant-design/icons';
import AdminContentCard from '../AdminContentCard';
import { Checkbox, Button, message } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

interface NotificationSettingsState {
    accountActivity: boolean;
    transactionConfirmation: boolean;
    systemUpdates: boolean;
}

const NotificationSettings: React.FC = () => {
    const [notifications, setNotifications] = useState<NotificationSettingsState>({
        accountActivity: true,
        transactionConfirmation: true,
        systemUpdates: false,
    });

    const handleCheckboxChange = (e: CheckboxChangeEvent) => {
        const { name, checked } = e.target;
        setNotifications(prev => ({ ...prev, [name as keyof NotificationSettingsState]: checked }));
    };

    const handleSave = () => {
        message.success('通知设置已保存！');
    };

    return (
        <div>
            <AdminContentCard title="通知设置" icon={<BellOutlined />}>
                <Checkbox
                    name="accountActivity"
                    checked={notifications.accountActivity}
                    onChange={handleCheckboxChange}
                >
                    账户活动通知
                </Checkbox>
                <br />
                <Checkbox
                    name="transactionConfirmation"
                    checked={notifications.transactionConfirmation}
                    onChange={handleCheckboxChange}
                >
                    交易确认通知
                </Checkbox>
                <br />
                <Checkbox
                    name="systemUpdates"
                    checked={notifications.systemUpdates}
                    onChange={handleCheckboxChange}
                >
                    系统公告和更新
                </Checkbox>
                <br />
                <Button type="primary" onClick={handleSave} style={{ marginTop: '16px' }}>
                    保存设置
                </Button>
            </AdminContentCard>
        </div>
    );
};

export default NotificationSettings;