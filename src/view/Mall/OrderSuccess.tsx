import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Result, Button, Typography, Divider, Card } from 'antd';
import { CheckCircleOutlined, ShoppingOutlined, HomeOutlined } from '@ant-design/icons';
import styles from './OrderSuccess.module.scss';

const { Title, Text, Paragraph } = Typography;

const OrderSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, product } = location.state || {};

  // 如果没有订单ID，重定向到商城首页
  if (!orderId) {
    navigate('/mall');
    return null;
  }

  return (
    <div className={styles.successContainer}>
      <Result
        status="success"
        icon={<CheckCircleOutlined className={styles.successIcon} />}
        title="兑换成功！"
        subTitle={`订单号: ${orderId}`}
        extra={[
          <Button 
            type="primary" 
            key="orders" 
            icon={<ShoppingOutlined />}
            onClick={() => navigate('/admin/profile/orders')}
          >
            查看我的订单
          </Button>,
          <Button 
            key="mall" 
            icon={<HomeOutlined />}
            onClick={() => navigate('/mall')}
          >
            继续购物
          </Button>,
        ]}
      />
      
      <Card className={styles.orderInfoCard}>
        <Title level={5}>订单信息</Title>
        <Divider />
        
        <div className={styles.orderDetail}>
          <div className={styles.detailItem}>
            <Text strong>订单编号：</Text>
            <Text copyable>{orderId}</Text>
          </div>
          <div className={styles.detailItem}>
            <Text strong>兑换商品：</Text>
            <Text>{product?.productSpu?.name || '未知商品'}</Text>
          </div>
          <div className={styles.detailItem}>
            <Text strong>支付方式：</Text>
            <Text>钱包支付</Text>
          </div>
          <div className={styles.detailItem}>
            <Text strong>订单状态：</Text>
            <Text type="success">已支付</Text>
          </div>
        </div>
        
        <Divider />
        
        <Paragraph className={styles.notice}>
          <Text type="secondary">
            您的订单已支付成功，我们将尽快为您安排发货。您可以在"我的订单"中查看订单详情和物流信息。
          </Text>
        </Paragraph>
      </Card>
    </div>
  );
};

export default OrderSuccess; 