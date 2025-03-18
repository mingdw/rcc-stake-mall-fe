import React, { useState, useEffect } from 'react';
import { 
  Table, Button, Modal, Empty, Spin, Input, Tag, Tooltip, message,
  Space, Statistic, Card, Row, Col, Dropdown, Menu
} from 'antd';
import { 
  ClockCircleOutlined, SearchOutlined, ExclamationCircleOutlined, 
  WalletOutlined, DeleteOutlined, ReloadOutlined, FilterOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import AdminContentCard from '../AdminContentCard';
import styles from './OrderPending.module.scss';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  createdAt: string;
  totalAmount: number;
  products: Product[];
  expiresAt: Date;
}

const OrderPending: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('微信支付');
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total: number) => `共 ${total} 条订单`
    },
    sortField: 'createdAt',
    sortOrder: 'descend',
  });

  // 模拟加载数据
  const fetchOrders = () => {
    setLoading(true);
    // 实际项目中应替换为真实API调用
    setTimeout(() => {
      const mockOrders = [
        {
          id: 'ORD-2023-001',
          createdAt: '2023-10-15 14:30:22',
          totalAmount: 299.99,
          products: [
            {
              id: 1,
              name: '高品质无线蓝牙耳机',
              price: 149.99,
              quantity: 1,
              image: 'https://via.placeholder.com/70'
            },
            {
              id: 2,
              name: '智能手表健康监测器',
              price: 150.00,
              quantity: 1,
              image: 'https://via.placeholder.com/70'
            }
          ],
          expiresAt: new Date(Date.now() + 30 * 60 * 1000) // 30分钟后过期
        },
        {
          id: 'ORD-2023-002',
          createdAt: '2023-10-15 15:45:10',
          totalAmount: 1299.00,
          products: [
            {
              id: 3,
              name: '超薄笔记本电脑',
              price: 1299.00,
              quantity: 1,
              image: 'https://via.placeholder.com/70'
            }
          ],
          expiresAt: new Date(Date.now() + 15 * 60 * 1000) // 15分钟后过期
        },
        {
          id: 'ORD-2023-003',
          createdAt: '2023-10-15 16:20:05',
          totalAmount: 459.50,
          products: [
            {
              id: 4,
              name: '智能家居套装',
              price: 459.50,
              quantity: 1,
              image: 'https://via.placeholder.com/70'
            }
          ],
          expiresAt: new Date(Date.now() + 5 * 60 * 1000) // 5分钟后过期
        },
        {
          id: 'ORD-2023-004',
          createdAt: '2023-10-15 17:10:30',
          totalAmount: 899.00,
          products: [
            {
              id: 5,
              name: '高清投影仪',
              price: 899.00,
              quantity: 1,
              image: 'https://via.placeholder.com/70'
            }
          ],
          expiresAt: new Date(Date.now() + 25 * 60 * 1000)
        },
        {
          id: 'ORD-2023-005',
          createdAt: '2023-10-15 18:05:15',
          totalAmount: 129.50,
          products: [
            {
              id: 6,
              name: '便携式充电宝',
              price: 129.50,
              quantity: 1,
              image: 'https://via.placeholder.com/70'
            }
          ],
          expiresAt: new Date(Date.now() + 18 * 60 * 1000)
        }
      ];
      setOrders(mockOrders);
      setFilteredOrders(mockOrders);
      setLoading(false);
      setRefreshing(false);
    }, 1500);
  };

  useEffect(() => {
    fetchOrders();
    
    // 设置定时器，每分钟刷新一次倒计时
    const timer = setInterval(() => {
      setOrders(prevOrders => [...prevOrders]);
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  // 筛选和排序
  useEffect(() => {
    let result = [...orders];
    
    // 搜索筛选
    if (searchText) {
      result = result.filter(order => 
        order.id.toLowerCase().includes(searchText.toLowerCase()) ||
        order.products.some(product => 
          product.name.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }
    
    setFilteredOrders(result);
  }, [orders, searchText]);

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    setTableParams({
      pagination,
      sortField: sorter.field,
      sortOrder: sorter.order,
    });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  const handlePayOrder = (order: Order) => {
    setSelectedOrder(order);
    setSelectedPaymentMethod('微信支付'); // 默认选择微信支付
    setPaymentModalVisible(true);
  };

  const handleSelectPaymentMethod = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  const handleConfirmPayment = async () => {
    if (!selectedOrder) return;
    
    try {
      // 实际项目中应替换为真实API调用
      // await apiService.post('/orders/pay', { 
      //   orderId: selectedOrder.id,
      //   paymentMethod: selectedPaymentMethod 
      // });
      
      // 模拟支付成功
      message.success(`使用${selectedPaymentMethod}支付成功`);
      setOrders(orders.filter(order => order.id !== selectedOrder.id));
      setPaymentModalVisible(false);
    } catch (error) {
      message.error('支付失败，请稍后重试');
    }
  };

  const handleCancelOrder = (order: Order) => {
    Modal.confirm({
      title: '确认取消订单',
      icon: <ExclamationCircleOutlined />,
      content: '您确定要取消这个订单吗？取消后将无法恢复。',
      okText: '确认取消',
      cancelText: '返回',
      onOk: async () => {
        try {
          // 实际项目中应替换为真实API调用
          // await apiService.post('/orders/cancel', { orderId: order.id });
          
          // 模拟取消成功
          message.success('订单已取消');
          setOrders(orders.filter(o => o.id !== order.id));
        } catch (error) {
          message.error('取消订单失败，请稍后重试');
        }
      }
    });
  };

  const renderCountdown = (expiresAt: Date) => {
    const now = new Date();
    const timeLeft = expiresAt.getTime() - now.getTime();
    
    if (timeLeft <= 0) {
      return <Tag color="default" className={styles.statusTag}>已过期</Tag>;
    }
    
    const minutes = Math.floor(timeLeft / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    if (minutes < 5) {
      return (
        <div className={styles.countdownWrapper}>
          <ClockCircleOutlined className={styles.urgentClockIcon} />
          <span className={styles.urgentCountdown}>{minutes}分{seconds}秒后过期</span>
        </div>
      );
    }
    
    return (
      <div className={styles.countdownWrapper}>
        <ClockCircleOutlined className={styles.clockIcon} />
        <span className={styles.countdown}>{minutes}分钟后过期</span>
      </div>
    );
  };

  const renderSummary = () => {
    return (
      <Row gutter={16} className={styles.summaryContainer}>
        <Col span={8}>
          <Card className={styles.summaryCard}>
            <Statistic 
              title="待付款订单" 
              value={filteredOrders.length} 
              suffix="笔" 
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card className={styles.summaryCard}>
            <Statistic 
              title="待付款金额" 
              value={filteredOrders.reduce((sum, order) => sum + order.totalAmount, 0)} 
              precision={2}
              prefix="¥"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card className={styles.summaryCard}>
            <Statistic 
              title="即将过期" 
              value={filteredOrders.filter(order => {
                const timeLeft = order.expiresAt.getTime() - new Date().getTime();
                return timeLeft > 0 && timeLeft < 10 * 60 * 1000; // 10分钟内
              }).length} 
              suffix="笔"
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
      </Row>
    );
  };

  // 格式化日期时间
  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return (
      <div className={styles.dateTimeWrapper}>
        <div className={styles.dateDisplay}>{year}-{month}-{day}</div>
        <div className={styles.timeDisplay}>{hours}:{minutes}:{seconds}</div>
      </div>
    );
  };

  const renderProductList = (products: Product[]) => (
    <div className={styles.productInfo}>
      {products.map(product => (
        <div key={product.id} className={styles.productItem}>
          <img src={product.image} alt={product.name} className={styles.productImage} />
          <div className={styles.productDetails}>
            <div className={styles.productName}>{product.name}</div>
            <div className={styles.productPrice}>
              <span>¥{product.price.toFixed(2)}</span>
              <span className={styles.productQuantity}>x{product.quantity}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const columns = [
    {
      title: '订单编号',
      dataIndex: 'id',
      key: 'id',
      width: 150,
      render: (id: string) => <span className={styles.orderId}>{id}</span>
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      sorter: true,
      sortOrder: tableParams.sortField === 'createdAt' ? tableParams.sortOrder : null,
      render: (dateTime: string) => formatDateTime(dateTime)
    },
    {
      title: '商品信息',
      dataIndex: 'products',
      key: 'products',
      width: 300,
      render: (products: Product[]) => renderProductList(products)
    },
    {
      title: '支付期限',
      dataIndex: 'expiresAt',
      key: 'expiresAt',
      width: 150,
      render: (expiresAt: Date) => renderCountdown(expiresAt)
    },
    {
      title: '订单金额',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      width: 120,
      sorter: true,
      sortOrder: tableParams.sortField === 'totalAmount' ? tableParams.sortOrder : null,
      render: (amount: number) => <span className={styles.totalAmount}>¥{amount.toFixed(2)}</span>
    },
    {
      title: '操作',
      key: 'action',
      width: 180,
      fixed: 'right',
      render: (_: any, record: Order) => (
        <Space size="small" className={styles.actionButtons}>
          <Button 
            type="primary" 
            icon={<WalletOutlined />}
            onClick={() => handlePayOrder(record)}
            className={styles.payButton}
          >
            支付
          </Button>
          <Button 
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleCancelOrder(record)}
            className={styles.cancelButton}
          >
            取消
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.orderPendingContainer}>
      <AdminContentCard
        title="待付款订单"
        icon={<ClockCircleOutlined />}
        reqKey="pending-orders"
      >
        {renderSummary()}
        
        <div className={styles.toolbarContainer}>
          <div className={styles.searchContainer}>
            <Input
              placeholder="搜索订单号或商品"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              allowClear
              className={styles.searchInput}
            />
          </div>
          
          <div className={styles.actionsContainer}>
            <Tooltip title="刷新数据">
              <Button 
                icon={<ReloadOutlined spin={refreshing} />} 
                onClick={handleRefresh}
                className={styles.refreshButton}
              />
            </Tooltip>
            
            <Dropdown overlay={
              <Menu>
                <Menu.Item key="export">导出订单数据</Menu.Item>
                <Menu.Item key="batch">批量操作</Menu.Item>
                <Menu.Item key="settings">表格显示设置</Menu.Item>
              </Menu>
            } trigger={['click']}>
              <Button 
                icon={<FilterOutlined />}
                className={styles.filterButton}
              >
                更多操作
              </Button>
            </Dropdown>
            
            <Tooltip title="订单将在创建后30分钟自动取消">
              <QuestionCircleOutlined className={styles.helpIcon} />
            </Tooltip>
          </div>
        </div>
        
        <div className={styles.tableContainer}>
          {loading ? (
            <div className={styles.loadingContainer}>
              <Spin size="large" />
            </div>
          ) : filteredOrders.length > 0 ? (
            <Table 
              columns={columns as any} 
              dataSource={filteredOrders}
              rowKey="id"
              pagination={tableParams.pagination}
              loading={loading}
              onChange={handleTableChange}
              scroll={{ x: 1100 }}
              className={styles.orderTable}
              rowClassName={styles.tableRow}
              summary={() => (
                <Table.Summary fixed>
                  <Table.Summary.Row className={styles.summaryRow}>
                    <Table.Summary.Cell index={0} colSpan={3}>
                      <div className={styles.tableSummary}>
                        <span>当前页共 {filteredOrders.length} 条订单</span>
                      </div>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1} colSpan={3}>
                      <div className={styles.tableSummary}>
                        <span className={styles.summaryLabel}>总金额：</span>
                        <span className={styles.summaryAmount}>
                          ¥{filteredOrders.reduce((sum, order) => sum + order.totalAmount, 0).toFixed(2)}
                        </span>
                      </div>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </Table.Summary>
              )}
            />
          ) : (
            <div className={styles.emptyContainer}>
              <Empty 
                description="暂无待付款订单" 
                image={Empty.PRESENTED_IMAGE_SIMPLE} 
              />
            </div>
          )}
        </div>
      </AdminContentCard>

      <Modal
        title={
          <div className={styles.paymentModalTitle}>
            <WalletOutlined className={styles.paymentIcon} />
            <span>订单支付</span>
          </div>
        }
        visible={paymentModalVisible}
        onCancel={() => setPaymentModalVisible(false)}
        footer={null}
        width={500}
        className={styles.paymentModal}
      >
        {selectedOrder && (
          <div className={styles.paymentModalContent}>
            <div className={styles.paymentOrderInfo}>
              <div className={styles.paymentRow}>
                <span className={styles.paymentLabel}>订单编号:</span>
                <span>{selectedOrder.id}</span>
              </div>
              
              <div className={styles.paymentProductList}>
                {selectedOrder.products.map(product => (
                  <div key={product.id} className={styles.paymentProductItem}>
                    <img src={product.image} alt={product.name} className={styles.paymentProductImage} />
                    <div className={styles.paymentProductDetails}>
                      <div className={styles.paymentProductName}>{product.name}</div>
                      <div className={styles.paymentProductPrice}>
                        <span>¥{product.price.toFixed(2)}</span>
                        <span className={styles.paymentProductQuantity}>x{product.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className={styles.paymentTotalRow}>
                <span className={styles.paymentLabel}>订单金额:</span>
                <span className={styles.paymentAmount}>¥{selectedOrder.totalAmount.toFixed(2)}</span>
              </div>
              
              <div className={styles.paymentCountdown}>
                {renderCountdown(selectedOrder.expiresAt)}
              </div>
            </div>
            
            <div className={styles.paymentMethods}>
              <div className={styles.paymentMethodTitle}>选择支付方式</div>
              <Row gutter={[16, 16]} className={styles.paymentMethodOptions}>
                <Col span={8}>
                  <Card 
                    className={`${styles.paymentMethodCard} ${selectedPaymentMethod === '微信支付' ? styles.active : ''}`}
                    onClick={() => handleSelectPaymentMethod('微信支付')}
                  >
                    <div className={styles.paymentMethodIcon}>
                      <img src="/icons/wechat-pay.png" alt="微信支付" />
                    </div>
                    <div className={styles.paymentMethodName}>微信支付</div>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card 
                    className={`${styles.paymentMethodCard} ${selectedPaymentMethod === '支付宝' ? styles.active : ''}`}
                    onClick={() => handleSelectPaymentMethod('支付宝')}
                  >
                    <div className={styles.paymentMethodIcon}>
                      <img src="/icons/alipay.png" alt="支付宝" />
                    </div>
                    <div className={styles.paymentMethodName}>支付宝</div>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card 
                    className={`${styles.paymentMethodCard} ${selectedPaymentMethod === '银联' ? styles.active : ''}`}
                    onClick={() => handleSelectPaymentMethod('银联')}
                  >
                    <div className={styles.paymentMethodIcon}>
                      <img src="/icons/unionpay.png" alt="银联" />
                    </div>
                    <div className={styles.paymentMethodName}>银联</div>
                  </Card>
                </Col>
              </Row>
            </div>
            
            <div className={styles.paymentActions}>
              <Button 
                size="large"
                onClick={() => setPaymentModalVisible(false)}
                className={styles.cancelPaymentButton}
              >
                取消
              </Button>
              <Button 
                type="primary" 
                size="large"
                onClick={handleConfirmPayment}
                className={styles.confirmPaymentButton}
              >
                确认支付
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OrderPending;

