import React from "react";
import { Button, Result } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAccount, useBalance, useChainId } from 'wagmi';
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { formatBalance } from "../utils/common";
import { authManager } from "../utils/authManager";

const NotConnected: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const chainId = useChainId();
    const from = location.state?.from || '/';
    const { openConnectModal } = useConnectModal();
    const { isConnected, address } = useAccount(); // 获取连接状态和地址
    const { data: balance, isLoading, isError, refetch } = useBalance({ address,query:{enabled:true} });
    // 监听连接状态变化
    React.useEffect(() => {
        if (isConnected) {
            // 如果连接成功，跳转回原始目标页面
            navigate(from);
        }
    }, [isConnected, navigate, from]);

    const handleConnect = async () => {
        try {
            //此处通过使用useConnectModal方式调起钱包连接
           
            if (!isConnected) {
                openConnectModal?.();
              }else{
                //  如果连接成功，setAuthData
                authManager.setAddress(address || '');
                authManager.setBalance(formatBalance(balance?.value.toString() || '0'));
                await authManager.setUserInfoByAddress(address || '');
                console.log(" 连接成功: " + JSON.stringify(authManager.userInfo));
              }
        } catch (error) {
            console.error('连接钱包失败:', error);
        }
    };

    return (
        <div>
            <Result
                status="403"
                title="403"
                subTitle="非常抱歉，您没有权限访问该页面，请先连接钱包"
                extra={<Button type="primary" onClick={handleConnect}>连接钱包</Button>}    
            />
        </div>
    );
};

export default NotConnected;

function setAuthData(arg0: { address: any; balance: string; chainID: any; name: string; isAdmin: boolean; }) {
    throw new Error("Function not implemented.");
}
