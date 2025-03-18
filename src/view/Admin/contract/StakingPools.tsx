import React, { useState, useEffect } from 'react';
import { DatabaseOutlined } from '@ant-design/icons';
import AdminContentCard from '../AdminContentCard';
import styles from './StakingPools.module.scss';

const StakingPools: React.FC = () => {
    // ... 组件代码

    return (
        <AdminContentCard 
            title="质押池管理"
            icon={<DatabaseOutlined />}
        >
            <div className={styles.stakingPools}>
                {/* ... 内容保持不变 */}
            </div>
        </AdminContentCard>
    );
};

export default StakingPools; 