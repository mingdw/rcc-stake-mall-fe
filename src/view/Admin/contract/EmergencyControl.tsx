import React, { useState } from 'react';
import { Button, Card, Alert, Modal, Input, Space } from 'antd';
import { ExclamationCircleOutlined, AlertOutlined } from '@ant-design/icons';
import AdminContentCard from '../AdminContentCard';
import styles from './EmergencyControl.module.scss';

const EmergencyControl: React.FC = () => {
    // ... 其他代码保持不变

    return (
        <AdminContentCard 
            title="紧急控制"
            icon={<AlertOutlined />}  // 添加图标
        >
            <div className={styles.emergencyControl}>
                {/* ... 内容保持不变 */}
            </div>
        </AdminContentCard>
    );
}; 
export default EmergencyControl;
