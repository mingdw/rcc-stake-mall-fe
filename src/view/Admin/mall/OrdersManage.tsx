import React, { useState, useEffect } from 'react';
import {
  Table,
  Tag,
  Space,
  Button,
  Input,
  DatePicker,
  Select,
  Card,
  Typography,
  Row,
  Col,
  Badge,
  Dropdown,
  Menu,
  message,
  Tooltip,
  Tabs,
  Avatar
} from 'antd';
import moment from 'moment';
import {
  SearchOutlined,
  FilterOutlined,
  DownloadOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  MoreOutlined,
  ReloadOutlined,
  PrinterOutlined,
  CarOutlined,
  ShoppingOutlined,
  UserOutlined,
  DollarOutlined,
  PhoneOutlined
} from '@ant-design/icons';
import type { TableProps } from 'antd';
import styles from './OrdersManage.module.scss';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { TabPane } = Tabs;

// 订单状态类型
type OrderStatus = 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';

// 订单数据接口
interface OrderData {
  key: string;
  id: string;
  customer: {
    name: string;
    phone: string;
    avatar?: string;
  };
  createdAt: string;
  paidAt?: string;
  totalAmount: number;
  paymentMethod?: string;
  status: OrderStatus;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  address: string;
  trackingNumber?: string;
  expectedDelivery?: string;
  remark?: string;
}

// 模拟订单数据
const generateMockData = (): OrderData[] => {
  const statuses: OrderStatus[] = ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'];
  const paymentMethods = ['微信支付', '支付宝', '银联', '信用卡'];
  const productNames = [
    '高级羊绒围巾',
    '轻薄休闲夹克',
    '真丝连衣裙',
    '纯棉T恤',
    '优质牛仔裤',
    '保暖羽绒服',
    '商务正装',
    '休闲运动鞋',
    '真皮手提包',
    '智能手表'
  ];
  
  return Array.from({ length: 100 }, (_, i) => {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const createdAt = moment().subtract(Math.floor(Math.random() * 30), 'days').format('YYYY-MM-DD HH:mm:ss');
    const itemsCount = Math.floor(Math.random() * 3) + 1;
    
    // 生成订单商品
    const orderItems = Array.from({ length: itemsCount }, (_, j) => {
      const productName = productNames[Math.floor(Math.random() * productNames.length)];
      const quantity = Math.floor(Math.random() * 3) + 1;
      const price = Math.floor(Math.random() * 500) + 100;
      
      return {
        id: `PROD-${10000 + j}`,
        name: productName,
        quantity: quantity,
        price: price,
        image: `https://picsum.photos/200/200?random=${i * 10 + j}`
      };
    });
    
    // 计算订单总金额
    const totalAmount = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    return {
      key: i.toString(),
      id: `ORD-${moment().format('YYYYMM')}${10000 + i}`,
      customer: {
        name: `顾客${i + 1}`,
        phone: `1${Math.floor(Math.random() * 9 + 1)}${Math.floor(Math.random() * 10000000000).toString().padStart(10, '0')}`,
        avatar: Math.random() > 0.7 ? `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg` : undefined
      },
      createdAt: createdAt,
      paidAt: status !== 'pending' ? moment(createdAt).add(Math.floor(Math.random() * 60) + 1, 'minutes').format('YYYY-MM-DD HH:mm:ss') : undefined,
      totalAmount: totalAmount,
      paymentMethod: status !== 'pending' ? paymentMethods[Math.floor(Math.random() * paymentMethods.length)] : undefined,
      status: status,
      items: orderItems,
      address: `${['北京市', '上海市', '广州市', '深圳市', '杭州市', '南京市', '成都市', '武汉市'][Math.floor(Math.random() * 8)]}${['朝阳区', '海淀区', '浦东新区', '天河区', '福田区', '西湖区', '鼓楼区', '武侯区', '江汉区'][Math.floor(Math.random() * 9)]}${['中关村', '望京', '陆家嘴', '珠江新城', '华强北', '西溪', '夫子庙', '锦里', '楚河汉街'][Math.floor(Math.random() * 9)]}路${Math.floor(Math.random() * 100) + 1}号`,
      trackingNumber: ['shipped', 'delivered'].includes(status) ? `SF${Math.floor(Math.random() * 1000000000000)}` : undefined,
      expectedDelivery: status === 'shipped' ? moment().add(Math.floor(Math.random() * 7) + 1, 'days').format('YYYY-MM-DD') : undefined,
      remark: Math.random() > 0.7 ? ['请尽快发货', '周末再送货', '需要发票', '轻拿轻放，易碎物品', '送货前电话联系'][Math.floor(Math.random() * 5)] : undefined
    };
  });
};

const OrdersManage: React.FC = () => {
  const [data, setData] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredData, setFilteredData] = useState<OrderData[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [dateRange, setDateRange] = useState<[moment.Moment, moment.Moment] | null>(null);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string[]>([]);

  useEffect(() => {
    // 模拟API请求
    setTimeout(() => {
      const mockData = generateMockData();
      setData(mockData);
      setFilteredData(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  // 处理搜索和筛选
  useEffect(() => {
    let result = [...data];
    
    // 搜索文本筛选
    if (searchText) {
      result = result.filter(
        item => 
          item.id.toLowerCase().includes(searchText.toLowerCase()) ||
          item.customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.customer.phone.includes(searchText) ||
          (item.trackingNumber && item.trackingNumber.toLowerCase().includes(searchText.toLowerCase())) ||
          (item.address && item.address.toLowerCase().includes(searchText.toLowerCase()))
      );
    }
    
    // 日期范围筛选
    if (dateRange && dateRange[0] && dateRange[1]) {
      result = result.filter(item => {
        const orderDate = moment(item.createdAt);
        return orderDate.isBetween(dateRange[0], dateRange[1], 'day', '[]');
      });
    }
    
    // 标签页筛选
    if (activeTab !== 'all') {
      result = result.filter(item => item.status === activeTab);
    }
    
    // 状态筛选
    if (statusFilter.length > 0) {
      result = result.filter(item => statusFilter.includes(item.status));
    }
    
    setFilteredData(result);
  }, [searchText, dateRange, activeTab, statusFilter, data]);

  // 获取订单状态标签
  const getStatusTag = (status: OrderStatus) => {
    const statusConfig = {
      pending: { color: 'default', text: '待付款', icon: <DollarOutlined /> },
      paid: { color: 'blue', text: '已付款', icon: <DollarOutlined /> },
      processing: { color: 'purple', text: '处理中', icon: <ShoppingOutlined /> },
      shipped: { color: 'cyan', text: '已发货', icon: <CarOutlined /> },
      delivered: { color: 'green', text: '已完成', icon: <CheckCircleOutlined /> },
      cancelled: { color: 'red', text: '已取消', icon: <CloseCircleOutlined /> },
      refunded: { color: 'orange', text: '已退款', icon: <DollarOutlined /> }
    };
    
    const config = statusConfig[status];
    return (
      <Tag icon={config.icon} color={config.color} style={{ whiteSpace: 'nowrap' }}>
        {config.text}
      </Tag>
    );
  };

  // 处理订单状态更新
  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    // 实际应用中这里应该调用API
    message.success(`订单 ${orderId} 状态已更新为 ${newStatus}`);
    
    // 更新本地数据
    const newData = data.map(item => {
      if (item.id === orderId) {
        return { ...item, status: newStatus };
      }
      return item;
    });
    
    setData(newData);
  };

  // 查看订单详情
  const viewOrderDetails = (orderId: string) => {
    message.info(`查看订单详情: ${orderId}`);
    // 实际应用中这里应该导航到订单详情页面
  };

  // 联系客户
  const contactCustomer = (phone: string) => {
    message.info(`联系客户: ${phone}`);
    // 实际应用中这里可能会打开聊天窗口或提供电话拨打功能
  };

  // 打印订单
  const printOrder = (orderId: string) => {
    message.info(`打印订单: ${orderId}`);
    // 实际应用中这里应该调用打印功能
  };

  // 表格列定义
  const columns: TableProps<OrderData>['columns'] = [
    {
      title: '订单编号',
      dataIndex: 'id',
      key: 'id',
      render: (id) => <a onClick={() => viewOrderDetails(id)}>{id}</a>,
      width: 180,
    },
    {
      title: '客户信息',
      dataIndex: 'customer',
      key: 'customer',
      render: (customer) => (
        <div className={styles.customerInfo}>
          {customer.avatar ? (
            <Avatar src={customer.avatar} size="small" className={styles.customerAvatar} />
          ) : (
            <Avatar icon={<UserOutlined />} size="small" className={styles.customerAvatar} />
          )}
          <div>
            <div>{customer.name}</div>
            <Text type="secondary" style={{ fontSize: '12px' }}>{customer.phone}</Text>
          </div>
          <Button
            type="text"
            icon={<PhoneOutlined />}
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              contactCustomer(customer.phone);
            }}
            className={styles.contactButton}
            title="联系客户"
          />
        </div>
      ),
      width: 200,
    },
    {
      title: '下单时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
      render: (date) => (
        <Tooltip title={date}>
          {moment(date).format('YYYY-MM-DD')}
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>{moment(date).format('HH:mm:ss')}</Text>
        </Tooltip>
      ),
      width: 120,
    },
    {
      title: '订单总额',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      sorter: (a, b) => a.totalAmount - b.totalAmount,
      render: (amount) => <span className={styles.amount}>¥{amount.toFixed(2)}</span>,
      width: 120,
    },
    {
      title: '支付方式',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      render: (method) => method || '-',
      filters: [
        { text: '微信支付', value: '微信支付' },
        { text: '支付宝', value: '支付宝' },
        { text: '银联', value: '银联' },
        { text: '信用卡', value: '信用卡' },
      ],
      onFilter: (value, record) => record.paymentMethod === value,
      width: 120,
    },
    {
      title: '商品信息',
      key: 'items',
      render: (_, record) => (
        <div className={styles.itemsInfo}>
          <span className={styles.itemsCount}>{record.items.length}件商品</span>
          <Tooltip title={
            <div>
              {record.items.map((item, index) => (
                <div key={index} className={styles.itemTooltip}>
                  <div className={styles.itemDetails}>
                    <div>{item.name}</div>
                    <div>¥{item.price.toFixed(2)} × {item.quantity}</div>
                  </div>
                </div>
              ))}
            </div>
          }>
            <Button type="link" size="small">查看详情</Button>
          </Tooltip>
        </div>
      ),
      width: 150,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusTag(status),
      width: 100,
    },
    {
      title: '收货地址',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true,
      width: 200,
    },
    {
      title: '物流信息',
      key: 'tracking',
      render: (_, record) => (
        <div>
          {record.trackingNumber ? (
            <>
              <div className={styles.trackingNumber}>{record.trackingNumber}</div>
              {record.expectedDelivery && (
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  预计送达: {record.expectedDelivery}
                </Text>
              )}
            </>
          ) : (
            <Text type="secondary">暂无物流信息</Text>
          )}
        </div>
      ),
      width: 150,
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 100,
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            onClick={() => viewOrderDetails(record.id)}
            title="查看详情"
          />
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="1" onClick={() => viewOrderDetails(record.id)} icon={<EyeOutlined />}>
                  查看详情
                </Menu.Item>
                <Menu.Divider />
                {record.status === 'pending' && (
                  <Menu.Item key="2" onClick={() => handleStatusChange(record.id, 'cancelled')} icon={<CloseCircleOutlined />}>
                    取消订单
                  </Menu.Item>
                )}
                {record.status === 'paid' && (
                  <Menu.Item key="3" onClick={() => handleStatusChange(record.id, 'processing')} icon={<ShoppingOutlined />}>
                    开始处理
                  </Menu.Item>
                )}
                {record.status === 'processing' && (
                  <Menu.Item key="4" onClick={() => handleStatusChange(record.id, 'shipped')} icon={<CarOutlined />}>
                    标记为已发货
                  </Menu.Item>
                )}
                {record.status === 'shipped' && (
                  <Menu.Item key="5" onClick={() => handleStatusChange(record.id, 'delivered')} icon={<CheckCircleOutlined />}>
                    标记为已送达
                  </Menu.Item>
                )}
                {(['paid', 'processing'].includes(record.status)) && (
                  <Menu.Item key="6" onClick={() => handleStatusChange(record.id, 'refunded')} icon={<DollarOutlined />}>
                    申请退款
                  </Menu.Item>
                )}
                <Menu.Divider />
                <Menu.Item key="7" onClick={() => contactCustomer(record.customer.phone)} icon={<PhoneOutlined />}>
                  联系客户
                </Menu.Item>
                <Menu.Item key="8" onClick={() => printOrder(record.id)} icon={<PrinterOutlined />}>
                  打印订单
                </Menu.Item>
              </Menu>
            }
          >
            <Button type="text" icon={<MoreOutlined />} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  // 统计信息
  const getStatistics = () => {
    const total = data.length;
    const pendingCount = data.filter(item => item.status === 'pending').length;
    const processingCount = data.filter(item => ['paid', 'processing'].includes(item.status)).length;
    const shippedCount = data.filter(item => item.status === 'shipped').length;
    const completedCount = data.filter(item => item.status === 'delivered').length;
    const cancelledCount = data.filter(item => ['cancelled', 'refunded'].includes(item.status)).length;
    
    const totalRevenue = data
      .filter(item => ['paid', 'processing', 'shipped', 'delivered'].includes(item.status))
      .reduce((sum, item) => sum + item.totalAmount, 0);
    
    const todayOrders = data.filter(item => 
      moment(item.createdAt).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')
    ).length;
    
    return { 
      total, 
      pendingCount, 
      processingCount, 
      shippedCount, 
      completedCount, 
      cancelledCount,
      totalRevenue,
      todayOrders
    };
  };

  const stats = getStatistics();

  // 刷新数据
  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = generateMockData();
      setData(mockData);
      setFilteredData(mockData);
      setLoading(false);
      message.success('数据已刷新');
    }, 1000);
  };

  // 导出订单数据
  const exportData = () => {
    message.success('订单数据导出成功');
    // 实际应用中这里应该调用导出功能
  };

  // 重置筛选
  const resetFilters = () => {
    setSearchText('');
    setDateRange(null);
    setActiveTab('all');
    setStatusFilter([]);
    setFilteredData(data);
  };

  return (
    <div className={styles.ordersManageContainer}>
      <Card bordered={false} className={styles.headerCard}>
        <Row gutter={24} align="middle">
          <Col span={12}>
            <Title level={2}>订单管理中心</Title>
            <Text type="secondary">高效管理所有订单，提供快捷操作和详细信息</Text>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Space>
              <Button icon={<DownloadOutlined />} onClick={exportData}>导出数据</Button>
              <Button type="primary" icon={<ReloadOutlined />} onClick={refreshData}>
                刷新数据
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      <Row gutter={16} className={styles.statsRow}>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className={styles.statCard}>
            <Statistic 
              title="订单总数" 
              value={stats.total} 
              prefix={<Badge status="processing" />} 
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className={styles.statCard}>
            <Statistic 
              title="待处理订单" 
              value={stats.processingCount} 
              prefix={<Badge status="warning" />} 
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className={styles.statCard}>
            <Statistic 
              title="今日新增" 
              value={stats.todayOrders} 
              prefix={<Badge status="success" />} 
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className={styles.statCard}>
            <Statistic 
              title="总收入" 
              value={`¥${stats.totalRevenue.toFixed(2)}`} 
              prefix={<Badge status="success" />} 
            />
          </Card>
        </Col>
      </Row>

      <Card bordered={false} className={styles.filterCard}>
        <Row gutter={16}>
          <Col xs={24} md={8} lg={7}>
            <Input
              placeholder="搜索订单号/客户/电话/地址"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} md={8} lg={7}>
            <RangePicker
              style={{ width: '100%' }}
              onChange={(dates) => setDateRange(dates as [moment.Moment, moment.Moment])}
              placeholder={['开始日期', '结束日期']}
              allowClear
            />
          </Col>
          <Col xs={24} md={8} lg={7}>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="订单状态"
              value={statusFilter}
              onChange={setStatusFilter}
              allowClear
              maxTagCount={2}
            >
              <Option value="pending">待付款</Option>
              <Option value="paid">已付款</Option>
              <Option value="processing">处理中</Option>
              <Option value="shipped">已发货</Option>
              <Option value="delivered">已完成</Option>
              <Option value="cancelled">已取消</Option>
              <Option value="refunded">已退款</Option>
            </Select>
          </Col>
          <Col xs={24} lg={3} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="primary" icon={<FilterOutlined />} onClick={resetFilters}>
              重置筛选
            </Button>
          </Col>
        </Row>
      </Card>

      <Card bordered={false} className={styles.tableCard}>
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          type="card"
          className={styles.orderTabs}
        >
          <TabPane tab="全部订单" key="all" />
          <TabPane 
            tab={
              <span>
                <DollarOutlined />待付款
                <Badge count={stats.pendingCount} offset={[5, -5]} size="small" />
              </span>
            } 
            key="pending" 
          />
          <TabPane 
            tab={
              <span>
                <ShoppingOutlined />待处理
                <Badge count={stats.processingCount} offset={[5, -5]} size="small" />
              </span>
            } 
            key="processing" 
          />
          <TabPane 
            tab={
              <span>
                <CarOutlined />已发货
                <Badge count={stats.shippedCount} offset={[5, -5]} size="small" />
              </span>
            } 
            key="shipped" 
          />
          <TabPane 
            tab={
              <span>
                <CheckCircleOutlined />已完成
                <Badge count={stats.completedCount} offset={[5, -5]} size="small" />
              </span>
            } 
            key="delivered" 
          />
          <TabPane 
            tab={
              <span>
                <CloseCircleOutlined />已取消
                <Badge count={stats.cancelledCount} offset={[5, -5]} size="small" />
              </span>
            } 
            key="cancelled" 
          />
        </Tabs>

        <Table
          columns={columns}
          dataSource={filteredData}
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条订单`,
            pageSizeOptions: ['10', '20', '50', '100'],
          }}
          rowClassName={(record) => {
            if (record.status === 'pending') return styles.rowPending;
            if (['cancelled', 'refunded'].includes(record.status)) return styles.rowCancelled;
            if (record.status === 'delivered') return styles.rowDelivered;
            if (record.status === 'shipped') return styles.rowShipped;
            return '';
          }}
          scroll={{ x: 1500 }}
          rowKey="id"
          size="middle"
        />
      </Card>
    </div>
  );
};

// 统计组件
interface StatisticProps {
  title: string;
  value: string | number;
  prefix?: React.ReactNode;
}

const Statistic: React.FC<StatisticProps> = ({ title, value, prefix }) => {
  return (
    <div className={styles.statistic}>
      <div className={styles.statisticTitle}>{title}</div>
      <div className={styles.statisticValue}>
        {prefix && <span className={styles.statisticPrefix}>{prefix}</span>}
        {value}
      </div>
    </div>
  );
};

export default OrdersManage;
    

