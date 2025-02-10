import React from 'react';
import { Result, Button } from 'antd';

const Budding: React.FC = () => {
  const handleBackHome = () => {
    // 这里可以实现返回首页的逻辑
    window.location.href = '/';
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Result
        status="info"
        title="商城系统正在建设中,敬请期待"
        subTitle="我们正在努力建设代币商城系统，更多精彩内容敬请期待"
        extra={
          <Button type="primary" onClick={handleBackHome}>
            返回首页
          </Button>
        }
      />
    </div>
  );
};

export default Budding;