import React from 'react';
import { MoneyCollectOutlined } from '@ant-design/icons';
import AdminContentCard from '../AdminContentCard';

const Balance: React.FC = () => {
    // 示例数据
    const stableCoinBalance = 1000; // 稳定币余额
    const stakedAssets = 500; // 质押资产
    const borrowedAssets = 300; // 借贷资产

    return (
        <div>
            <AdminContentCard title="账户余额" icon={<MoneyCollectOutlined />} reqKey="questions-1">
                <p>稳定币余额: ${stableCoinBalance}</p>
                <p>质押资产: ${stakedAssets}</p>
                <p>借贷资产: ${borrowedAssets}</p>
            </AdminContentCard>
        </div>
    );
};

export default Balance;