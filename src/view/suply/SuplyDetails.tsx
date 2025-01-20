import { use } from "i18next";
import React, { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SuplyDetails: FC = () => {
    const location = useLocation();
    const { address, balance, chainID, name, isAdmin } = useAuth()
    const { data } = location.state || {}; // 获取传递的行数据
    useEffect(()=>{
        console.log("pool key: "+data.key);
    },[data])

    return (
        <>
            <div>
                <h1>质押服务明细</h1>
                {data ? (
                    <div>
                        <p>币种名称: {data.coin}</p>
                        <p>目标质押池数量: {data.targetPool}</p>
                        <p>收益率: {data.yieldRate}</p>
                        <p>已借出数量: {data.borrowedAmount}</p>
                        <p>借出费率: {data.borrowRate}</p>
                        <p>状态: {data.status}</p>
                    </div>
                ) : (
                    <p>没有可用的明细数据。</p>
                )}
                <div>
                    {address ? (
                        <p>address: {address}</p>
                    ) : (
                        <p>address: 未登录</p>
                    )}
                    <p>balance: {balance}</p>
                    <p>chainID: {chainID}</p>
                    <p>name: {name}</p>
                    <p>isAdmin: {isAdmin}</p>
                </div>
            </div>
        </>
    );
};

export default SuplyDetails; 