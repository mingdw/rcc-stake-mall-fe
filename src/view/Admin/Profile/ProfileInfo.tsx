import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import AdminContentCard from '../AdminContentCard';

const ProfileInfo: React.FC = () => {
    return (
        <div>
            <AdminContentCard title="个人信息" icon={<UserOutlined />}>
                <p>用户名: 用户名</p>
                <p>电子邮件: user@example.com</p>
                <p>手机号码: 123-456-7890</p>
            </AdminContentCard>
        </div>
    );
};

export default ProfileInfo;