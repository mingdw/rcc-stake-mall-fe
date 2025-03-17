import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Tag, Empty, message, Modal, Spin } from 'antd';
import { ShoppingCartOutlined, WalletOutlined, ClockCircleOutlined } from '@ant-design/icons';
import styles from './OrderPending.module.scss';
import dayjs from 'dayjs';

interface OrderItem {
  id: string;
  orderNumber: string;
  createTime: string;
  totalAmount: number;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    imageUrl: string;
  }[];
  status: 'pending' | 'paid' | 'cancelled';
  expiresAt?: string;
}

const OrderPending: React.FC = () => {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<OrderItem | null>(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [countdown, setCountdown] = useState<Record<string, number>>({});

  useEffect(() => {
    fetchPendingOrders();
    fetchUserBalance();
  }, []);

  useEffect(() => {
    if (orders.length === 0) return;
    
    const initialCountdowns: Record<string, number> = {};
    orders.forEach(order => {
      if (order.expiresAt) {
        const expiresAt = dayjs(order.expiresAt);
        const now = dayjs();
        const diffInSeconds = expiresAt.diff(now, 'seconds');
        initialCountdowns[order.id] = diffInSeconds > 0 ? diffInSeconds : 0;
      }
    });
    
    setCountdown(initialCountdowns);
    
    const timer = setInterval(() => {
      setCountdown(prev => {
        const updated = { ...prev };
        let needUpdate = false;
        
        Object.keys(updated).forEach(id => {
          if (updated[id] > 0) {
            updated[id] -= 1;
            needUpdate = true;
          }
          
          if (updated[id] === 0) {
            const orderToCancel = orders.find(order => order.id === id);
            if (orderToCancel) {
              message.info(`订单 ${orderToCancel.orderNumber} 已超时自动取消`);
              setOrders(prev => prev.filter(order => order.id !== id));
            }
          }
        });
        
        return needUpdate ? updated : prev;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [orders]);

  const fetchPendingOrders = async () => {
    setLoading(true);
    try {
      setTimeout(() => {
        const now = dayjs();
        const mockOrders: OrderItem[] = [
          {
            id: '1',
            orderNumber: 'ORD20230001',
            createTime: '2023-10-15 14:30:25',
            totalAmount: 1200,
            items: [
              {
                id: '101',
                name: '高级会员资格',
                quantity: 1,
                price: 1200,
                imageUrl: 'https://via.placeholder.com/80',
              },
            ],
            status: 'pending',
            expiresAt: now.clone().add(15, 'minutes').format(),
          },
          {
            id: '2',
            orderNumber: 'ORD20230002',
            createTime: '2023-10-16 09:15:30',
            totalAmount: 500,
            items: [
              {
                id: '201',
                name: '数字藏品A',
                quantity: 2,
                price: 250,
                imageUrl: 'https://via.placeholder.com/80',
              },
            ],
            status: 'pending',
            expiresAt: now.clone().add(25, 'minutes').format(),
          },
        ];
        setOrders(mockOrders);
        setLoading(false);
      }, 1000);
    } catch (error) {
      message.error('获取待付款订单失败，请稍后重试');
      setLoading(false);
    }
  };

  const fetchUserBalance = async () => {
    try {
      // 实际项目中应替换为真实API调用
      // const response = await apiService.get('/user/balance');
      // setBalance(response.data);
      
      // 模拟数据
      setBalance(1000);
    } catch (error) {
      message.error('获取用户余额失败，请稍后重试');
    }
  };

  const handlePayment = (order: OrderItem) => {
    setCurrentOrder(order);
    setPaymentModalVisible(true);
  };

  const confirmPayment = async () => {
    if (!currentOrder) return;
    
    setPaymentLoading(true);
    try {
      // 实际项目中应替换为真实API调用
      // await apiService.post('/orders/pay', { orderId: currentOrder.id });
      
      // 模拟支付成功
      message.success('支付成功');
      setOrders(orders.filter(order => order.id !== currentOrder.id));
      setPaymentModalVisible(false);
    } catch (error) {
      message.error('支付失败，请稍后重试');
    } finally {
      setPaymentLoading(false);
    }
  };

  const cancelOrder = async (orderId: string) => {
    try {
      // 实际项目中应替换为真实API调用
      // await apiService.post('/orders/cancel', { orderId });
      
      // 模拟取消成功
      message.success('订单已取消');
      setOrders(orders.filter(order => order.id !== orderId));
    } catch (error) {
      message.error('取消订单失败，请稍后重试');
    }
  };

  const formatCountdown = (seconds: number) => {
    if (seconds <= 0) return '已超时';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const columns = [
    {
      title: '订单号',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '商品信息',
      key: 'items',
      render: (_: any, record: OrderItem) => (
        <div className={styles.productInfo}>
          {record.items.map(item => (
            <div key={item.id} className={styles.productItem}>
              <img src={item.imageUrl} alt={item.name} className={styles.productImage} />
              <div className={styles.productDetails}>
                <div className={styles.productName}>{item.name}</div>
                <div className={styles.productPrice}>
                  <span>{item.price} RCC</span>
                  <span className={styles.productQuantity}>x{item.quantity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: '金额',
      key: 'amount',
      render: (_: any, record: OrderItem) => (
        <span className={styles.totalAmount}>{record.totalAmount} RCC</span>
      ),
    },
    {
      title: '状态',
      key: 'status',
      render: (_: any, record: OrderItem) => (
        <div>
          <Tag color="orange">待付款</Tag>
          {countdown[record.id] !== undefined && (
            <div className={styles.countdownWrapper}>
              <ClockCircleOutlined className={styles.clockIcon} />
              <span className={countdown[record.id] < 300 ? styles.urgentCountdown : styles.countdown}>
                {formatCountdown(countdown[record.id])}
              </span>
            </div>
          )}
        </div>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: OrderItem) => (
        <div className={styles.actionButtons}>
          <Button 
            type="primary" 
            icon={<WalletOutlined />} 
            onClick={() => handlePayment(record)}
            className={styles.payButton}
          >
            付款
          </Button>
          <Button 
            onClick={() => cancelOrder(record.id)}
            className={styles.cancelButton}
          >
            取消
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.orderPendingContainer}>
      <Card 
        title={
          <div className={styles.cardTitle}>
            <ShoppingCartOutlined className={styles.titleIcon} />
            <span>待付款订单</span>
          </div>
        }
        extra={<div className={styles.balanceInfo}>账户余额: <span className={styles.balanceAmount}>{balance} RCC</span></div>}
        className={styles.orderCard}
      >
        {loading ? (
          <div className={styles.loadingContainer}>
            <Spin size="large" />
          </div>
        ) : orders.length > 0 ? (
          <Table 
            dataSource={orders} 
            columns={columns} 
            rowKey="id"
            pagination={false}
            className={styles.orderTable}
          />
        ) : (
          <Empty 
            description="暂无待付款订单" 
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            className={styles.emptyContainer}
          />
        )}
      </Card>

      <Modal
        title="确认支付"
        visible={paymentModalVisible}
        onCancel={() => setPaymentModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setPaymentModalVisible(false)}>
            取消
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            loading={paymentLoading} 
            onClick={confirmPayment}
            disabled={!!currentOrder && balance < currentOrder.totalAmount}
          >
            确认支付
          </Button>,
        ]}
      >
        {currentOrder && (
          <div className={styles.paymentModalContent}>
            <div className={styles.paymentInfo}>
              <div className={styles.paymentRow}>
                <span className={styles.paymentLabel}>订单号:</span>
                <span>{currentOrder.orderNumber}</span>
              </div>
              <div className={styles.paymentRow}>
                <span className={styles.paymentLabel}>订单金额:</span>
                <span className={styles.paymentAmount}>{currentOrder.totalAmount} RCC</span>
              </div>
              <div className={styles.paymentRow}>
                <span className={styles.paymentLabel}>账户余额:</span>
                <span className={styles.balanceAmount}>{balance} RCC</span>
              </div>
            </div>
            
            {balance < currentOrder.totalAmount && (
              <div className={styles.insufficientBalance}>
                余额不足，请先充值后再进行支付
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OrderPending;

