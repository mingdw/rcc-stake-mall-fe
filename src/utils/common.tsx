// 余额格式话：将 wei 转换为 ETH 并保留3位小数
export const formatBalance = (balance: string | bigint) => {
    // 如果 balance 是 bigint 类型，将其转换为字符串
    if (typeof balance === 'bigint') {
        balance = balance.toString();
    }
    const ethBalance = parseFloat(balance) / Math.pow(10, 18);
    return ethBalance.toFixed(3);
};

// 地址缩写函数
export const shortenAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
};
