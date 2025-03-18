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
  Tabs
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
  InboxOutlined,
  ShoppingOutlined
} from '@ant-design/icons';
import type { TableProps } from 'antd';
import styles from './TransactionList.module.scss';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { TabPane } = Tabs;

// 订单状态类型
type OrderStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled';

// 订单数据接口
interface OrderData {
  key: string;
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  date: string;
  amount: number;
  paymentMethod: string;
  status: OrderStatus;
  items: number;
  address: string;
  trackingNumber?: string;
  expectedDelivery?: string;
}

// 模拟订单数据
const generateMockData = (): OrderData[] => {
  const statuses: OrderStatus[] = ['processing', 'shipped', 'delivered', 'cancelled'];
  const paymentMethods = ['信用卡', '支付宝', '微信支付', '银联'];
  
  return Array.from({ length: 100 }, (_, i) => ({
    key: i.toString(),
    id: `ORD-${2023000 + i}`,
    customer: {
      name: `客户${i + 1}`,
      email: `customer${i + 1}@example.com`,
      phone: `1${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
    },
    date: moment().subtract(Math.floor(Math.random() * 30), 'days').format('YYYY-MM-DD HH:mm:ss'),
    amount: Math.floor(Math.random() * 10000) / 100 + 100,
    paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    items: Math.floor(Math.random() * 5) + 1,
    address: `中国某省某市某区某街道${Math.floor(Math.random() * 100) + 1}号`,
    trackingNumber: Math.random() > 0.5 ? `SF${Math.floor(Math.random() * 10000000000)}` : undefined,
    expectedDelivery: Math.random() > 0.5 ? moment().add(Math.floor(Math.random() * 7) + 1, 'days').format('YYYY-MM-DD') : undefined,
  }));
};

const TransactionList: React.FC = () => {
  const [data, setData] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredData, setFilteredData] = useState<OrderData[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [dateRange, setDateRange] = useState<[moment.Moment, moment.Moment] | null>(null);
  const [activeTab, setActiveTab] = useState<string>('all');

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
          item.customer.email.toLowerCase().includes(searchText.toLowerCase()) ||
          item.customer.phone.includes(searchText)
      );
    }
    
    // 日期范围筛选
    if (dateRange && dateRange[0] && dateRange[1]) {
      result = result.filter(item => {
        const orderDate = moment(item.date);
        return orderDate.isBetween(dateRange[0], dateRange[1], 'day', '[]');
      });
    }
    
    // 标签页筛选
    if (activeTab !== 'all') {
      result = result.filter(item => item.status === activeTab);
    }
    
    setFilteredData(result);
  }, [searchText, dateRange, activeTab, data]);

  // 获取订单状态标签
  const getStatusTag = (status: OrderStatus) => {
    const statusConfig = {
      processing: { color: 'blue', text: '待发货', icon: <ShoppingOutlined /> },
      shipped: { color: 'cyan', text: '已发货', icon: <CarOutlined /> },
      delivered: { color: 'green', text: '已完成', icon: <CheckCircleOutlined /> },
      cancelled: { color: 'red', text: '已取消', icon: <CloseCircleOutlined /> },
    };
    
    const config = statusConfig[status];
    return (
      <Tag icon={config.icon} color={config.color}>
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

  // 表格列定义
  const columns: TableProps<OrderData>['columns'] = [
    {
      title: '订单号',
      dataIndex: 'id',
      key: 'id',
      render: (id) => <a onClick={() => viewOrderDetails(id)}>{id}</a>,
    },
    {
      title: '客户信息',
      dataIndex: 'customer',
      key: 'customer',
      render: (customer) => (
        <div>
          <div>{customer.name}</div>
          <Text type="secondary" style={{ fontSize: '12px' }}>{customer.phone}</Text>
        </div>
      ),
    },
    {
      title: '下单时间',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
      render: (date) => (
        <Tooltip title={date}>
          {moment(date).format('YYYY-MM-DD')}
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>{moment(date).format('HH:mm:ss')}</Text>
        </Tooltip>
      ),
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a, b) => a.amount - b.amount,
      render: (amount) => <span>¥{amount.toFixed(2)}</span>,
    },
    {
      title: '支付方式',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      filters: [
        { text: '信用卡', value: '信用卡' },
        { text: '支付宝', value: '支付宝' },
        { text: '微信支付', value: '微信支付' },
        { text: '银联', value: '银联' },
      ],
      onFilter: (value, record) => record.paymentMethod === value,
    },
    {
      title: '商品数量',
      dataIndex: 'items',
      key: 'items',
      sorter: (a, b) => a.items - b.items,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusTag(status),
    },
    {
      title: '物流信息',
      key: 'tracking',
      render: (_, record) => (
        <div>
          {record.trackingNumber ? (
            <>
              <div>{record.trackingNumber}</div>
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
      responsive: ['lg'],
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            onClick={() => viewOrderDetails(record.id)}
          />
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="1" onClick={() => viewOrderDetails(record.id)}>
                  查看详情
                </Menu.Item>
                <Menu.Divider />
                {record.status === 'processing' && (
                  <Menu.Item key="2" onClick={() => handleStatusChange(record.id, 'shipped')}>
                    标记为已发货
                  </Menu.Item>
                )}
                {record.status === 'shipped' && (
                  <Menu.Item key="3" onClick={() => handleStatusChange(record.id, 'delivered')}>
                    标记为已完成
                  </Menu.Item>
                )}
                {(record.status === 'processing' || record.status === 'shipped') && (
                  <Menu.Item key="4" onClick={() => handleStatusChange(record.id, 'cancelled')}>
                    取消订单
                  </Menu.Item>
                )}
                {record.status === 'cancelled' && (
                  <Menu.Item key="5" onClick={() => handleStatusChange(record.id, 'processing')}>
                    恢复订单
                  </Menu.Item>
                )}
                <Menu.Divider />
                <Menu.Item key="6">
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
    const total = filteredData.length;
    const totalAmount = filteredData.reduce((sum, item) => sum + item.amount, 0);
    const statusCounts = data.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return { total, totalAmount, statusCounts };
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

  return (
    <div className={styles.transactionListContainer}>
      <Card bordered={false} className={styles.headerCard}>
        <Row gutter={24} align="middle">
          <Col span={12}>
            <Title level={2}>订单管理</Title>
            <Text type="secondary">管理和跟踪所有已付款订单</Text>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Space>
              <Button icon={<DownloadOutlined />}>导出数据</Button>
              <Button type="primary" icon={<ReloadOutlined />} onClick={refreshData}>
                刷新
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      <Row gutter={16} className={styles.statsRow}>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className={styles.statCard}>
            <Statistic title="总订单数" value={data.length} prefix={<Badge status="processing" />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className={styles.statCard}>
            <Statistic 
              title="待发货" 
              value={stats.statusCounts.processing || 0} 
              prefix={<Badge status="warning" />} 
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className={styles.statCard}>
            <Statistic 
              title="已发货" 
              value={stats.statusCounts.shipped || 0} 
              prefix={<Badge status="processing" />} 
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className={styles.statCard}>
            <Statistic 
              title="已完成" 
              value={stats.statusCounts.delivered || 0} 
              prefix={<Badge status="success" />} 
            />
          </Card>
        </Col>
      </Row>

      <Card bordered={false} className={styles.filterCard}>
        <Row gutter={16}>
          <Col xs={24} md={12} lg={8}>
            <Input
              placeholder="搜索订单号/客户/电话"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <RangePicker
              style={{ width: '100%' }}
              onChange={(dates) => setDateRange(dates as [moment.Moment, moment.Moment])}
              placeholder={['开始日期', '结束日期']}
            />
          </Col>
          <Col xs={24} lg={8} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Space>
              <Button icon={<FilterOutlined />}>高级筛选</Button>
              <Button type="primary" onClick={() => {
                setSearchText('');
                setDateRange(null);
                setActiveTab('all');
              }}>重置筛选</Button>
            </Space>
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
          <TabPane tab="全部订单" key="all">
            {/* 全部订单内容在下方表格中显示 */}
          </TabPane>
          <TabPane tab={
            <span>
              <ShoppingOutlined />待发货
              <Badge count={stats.statusCounts.processing || 0} offset={[5, -5]} size="small" />
            </span>
          } key="processing">
            {/* 待发货订单内容在下方表格中显示 */}
          </TabPane>
          <TabPane tab={
            <span>
              <CarOutlined />已发货
              <Badge count={stats.statusCounts.shipped || 0} offset={[5, -5]} size="small" />
            </span>
          } key="shipped">
            {/* 已发货订单内容在下方表格中显示 */}
          </TabPane>
          <TabPane tab={
            <span>
              <CheckCircleOutlined />已完成
              <Badge count={stats.statusCounts.delivered || 0} offset={[5, -5]} size="small" />
            </span>
          } key="delivered">
            {/* 已完成订单内容在下方表格中显示 */}
          </TabPane>
          <TabPane tab={
            <span>
              <CloseCircleOutlined />已取消
              <Badge count={stats.statusCounts.cancelled || 0} offset={[5, -5]} size="small" />
            </span>
          } key="cancelled">
            {/* 已取消订单内容在下方表格中显示 */}
          </TabPane>
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
          }}
          rowClassName={(record) => {
            if (record.status === 'cancelled') return styles.rowCancelled;
            if (record.status === 'processing') return styles.rowProcessing;
            if (record.status === 'shipped') return styles.rowShipped;
            return '';
          }}
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

export default TransactionList;
