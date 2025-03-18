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
  Modal,
  Form,
  InputNumber,
  Upload,
  Divider,
  Steps,
  Timeline,
  Avatar,
  Image,
  Statistic
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
  RollbackOutlined,
  DollarOutlined,
  MessageOutlined,
  UploadOutlined,
  ExclamationCircleOutlined,
  SolutionOutlined,
  ShopOutlined,
  UserOutlined,
  InboxOutlined,
  SyncOutlined
} from '@ant-design/icons';
import type { TableProps } from 'antd';
import styles from './AfterSale.module.scss';

const { Title, Text, Paragraph } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { TabPane } = Tabs;
const { Step } = Steps;
const { TextArea } = Input;

// 售后类型
type AfterSaleType = 'refund' | 'return' | 'exchange' | 'repair';

// 售后状态
type AfterSaleStatus = 
  | 'pending' 
  | 'processing' 
  | 'approved' 
  | 'rejected' 
  | 'completed' 
  | 'cancelled';

// 售后数据接口
interface AfterSaleData {
  key: string;
  id: string;
  orderId: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    avatar?: string;
  };
  type: AfterSaleType;
  reason: string;
  description: string;
  amount: number;
  status: AfterSaleStatus;
  createdAt: string;
  updatedAt: string;
  images?: string[];
  timeline: {
    time: string;
    status: string;
    operator: string;
    comment?: string;
  }[];
  returnTrackingNumber?: string;
  productInfo: {
    name: string;
    sku: string;
    price: number;
    quantity: number;
    image: string;
  };
}

// 模拟售后数据
const generateMockData = (): AfterSaleData[] => {
  const types: AfterSaleType[] = ['refund', 'return', 'exchange', 'repair'];
  const statuses: AfterSaleStatus[] = ['pending', 'processing', 'approved', 'rejected', 'completed', 'cancelled'];
  const reasons = [
    '商品质量问题',
    '商品与描述不符',
    '收到商品损坏',
    '商品缺少配件',
    '买家不喜欢/不想要了',
    '商品尺寸不合适',
    '商品功能故障',
    '收到错误商品'
  ];
  
  return Array.from({ length: 50 }, (_, i) => {
    const type = types[Math.floor(Math.random() * types.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const createdAt = moment().subtract(Math.floor(Math.random() * 30), 'days').format('YYYY-MM-DD HH:mm:ss');
    const updatedAt = moment(createdAt).add(Math.floor(Math.random() * 5), 'days').format('YYYY-MM-DD HH:mm:ss');
    
    // 生成时间线
    const timeline = [];
    timeline.push({
      time: createdAt,
      status: '申请提交',
      operator: `客户${i + 1}`,
      comment: '客户提交了售后申请'
    });
    
    if (status !== 'pending') {
      timeline.push({
        time: moment(createdAt).add(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
        status: '客服审核',
        operator: '客服专员',
        comment: '客服正在处理您的申请'
      });
    }
    
    if (['approved', 'rejected', 'completed', 'cancelled'].includes(status)) {
      timeline.push({
        time: moment(createdAt).add(2, 'days').format('YYYY-MM-DD HH:mm:ss'),
        status: status === 'rejected' ? '申请被拒绝' : '申请通过',
        operator: '客服主管',
        comment: status === 'rejected' ? '很抱歉，您的申请未能通过审核' : '您的申请已通过审核'
      });
    }
    
    if (['completed'].includes(status)) {
      timeline.push({
        time: updatedAt,
        status: '退款完成',
        operator: '系统',
        comment: '退款已完成，资金已返还至您的账户'
      });
    }
    
    return {
      key: i.toString(),
      id: `AS-${2023000 + i}`,
      orderId: `ORD-${2023000 + Math.floor(Math.random() * 1000)}`,
      customer: {
        name: `客户${i + 1}`,
        email: `customer${i + 1}@example.com`,
        phone: `1${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
        avatar: Math.random() > 0.7 ? `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg` : undefined
      },
      type,
      reason: reasons[Math.floor(Math.random() * reasons.length)],
      description: `客户反馈：${reasons[Math.floor(Math.random() * reasons.length)]}，希望能够${type === 'refund' ? '退款' : type === 'return' ? '退货退款' : type === 'exchange' ? '换货' : '维修'}。`,
      amount: Math.floor(Math.random() * 10000) / 100 + 100,
      status,
      createdAt,
      updatedAt,
      images: Math.random() > 0.5 ? Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, j) => `https://picsum.photos/200/300?random=${i * 10 + j}`) : undefined,
      timeline,
      returnTrackingNumber: (type === 'return' || type === 'exchange') && status !== 'pending' ? `SF${Math.floor(Math.random() * 10000000000)}` : undefined,
      productInfo: {
        name: `测试商品${i + 1}`,
        sku: `SKU${100000 + i}`,
        price: Math.floor(Math.random() * 10000) / 100 + 50,
        quantity: Math.floor(Math.random() * 3) + 1,
        image: `https://picsum.photos/200/200?random=${i}`
      }
    };
  });
};

const AfterSale: React.FC = () => {
  const [data, setData] = useState<AfterSaleData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredData, setFilteredData] = useState<AfterSaleData[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [dateRange, setDateRange] = useState<[moment.Moment, moment.Moment] | null>(null);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [detailVisible, setDetailVisible] = useState<boolean>(false);
  const [currentRecord, setCurrentRecord] = useState<AfterSaleData | null>(null);
  const [replyVisible, setReplyVisible] = useState<boolean>(false);
  const [trackingVisible, setTrackingVisible] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [trackingForm] = Form.useForm();

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
          item.orderId.toLowerCase().includes(searchText.toLowerCase()) ||
          item.customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.customer.phone.includes(searchText)
      );
    }
    
    // 日期范围筛选
    if (dateRange && dateRange[0] && dateRange[1]) {
      result = result.filter(item => {
        const createdDate = moment(item.createdAt);
        return createdDate.isBetween(dateRange[0], dateRange[1], 'day', '[]');
      });
    }
    
    // 标签页筛选
    if (activeTab !== 'all') {
      if (activeTab === 'rejected') {
        result = result.filter(item => ['rejected', 'cancelled'].includes(item.status));
      } else {
        result = result.filter(item => item.status === activeTab);
      }
    }
    
    // 类型筛选
    if (typeFilter.length > 0) {
      result = result.filter(item => typeFilter.includes(item.type));
    }
    
    setFilteredData(result);
  }, [searchText, dateRange, activeTab, typeFilter, data]);

  // 获取售后类型标签
  const getTypeTag = (type: AfterSaleType) => {
    const typeConfig = {
      refund: { color: 'gold', text: '仅退款', icon: <DollarOutlined /> },
      return: { color: 'blue', text: '退货退款', icon: <RollbackOutlined /> },
      exchange: { color: 'purple', text: '换货', icon: <SolutionOutlined /> },
      repair: { color: 'cyan', text: '维修', icon: <ShopOutlined /> },
    };
    
    const config = typeConfig[type];
    return (
      <Tag icon={config.icon} color={config.color}>
        {config.text}
      </Tag>
    );
  };

  // 获取售后状态标签
  const getStatusTag = (status: AfterSaleStatus) => {
    const statusConfig = {
      pending: { color: 'default', text: '待处理', icon: <ExclamationCircleOutlined /> },
      processing: { color: 'blue', text: '处理中', icon: <SolutionOutlined /> },
      approved: { color: 'cyan', text: '已批准', icon: <CheckCircleOutlined /> },
      rejected: { color: 'red', text: '已拒绝', icon: <CloseCircleOutlined /> },
      completed: { color: 'green', text: '已完成', icon: <CheckCircleOutlined /> },
      cancelled: { color: 'gray', text: '已取消', icon: <CloseCircleOutlined /> },
    };
    
    const config = statusConfig[status];
    return (
      <Tag icon={config.icon} color={config.color}>
        {config.text}
      </Tag>
    );
  };

  // 处理售后状态更新
  const handleStatusChange = (id: string, newStatus: AfterSaleStatus) => {
    // 实际应用中这里应该调用API
    message.success(`售后单 ${id} 状态已更新为 ${newStatus}`);
    
    // 更新本地数据
    const newData = data.map(item => {
      if (item.id === id) {
        const updatedItem = { 
          ...item, 
          status: newStatus,
          updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
          timeline: [
            ...item.timeline,
            {
              time: moment().format('YYYY-MM-DD HH:mm:ss'),
              status: newStatus === 'approved' ? '申请通过' : 
                     newStatus === 'rejected' ? '申请被拒绝' : 
                     newStatus === 'completed' ? '退款完成' : 
                     newStatus === 'cancelled' ? '申请取消' : '状态更新',
              operator: '管理员',
              comment: `售后单状态更新为${
                newStatus === 'approved' ? '已批准' : 
                newStatus === 'rejected' ? '已拒绝' : 
                newStatus === 'completed' ? '已完成' : 
                newStatus === 'cancelled' ? '已取消' : '处理中'
              }`
            }
          ]
        };
        return updatedItem;
      }
      return item;
    });
    
    setData(newData);
    
    // 如果当前正在查看详情，也更新当前记录
    if (currentRecord && currentRecord.id === id) {
      const updatedRecord = newData.find(item => item.id === id);
      if (updatedRecord) {
        setCurrentRecord(updatedRecord);
      }
    }
  };

  // 查看售后详情
  const viewAfterSaleDetails = (record: AfterSaleData) => {
    setCurrentRecord(record);
    setDetailVisible(true);
  };

  // 回复客户
  const handleReply = () => {
    setReplyVisible(true);
  };

  // 提交回复
  const submitReply = (values: any) => {
    if (!currentRecord) return;
    
    message.success('回复已发送给客户');
    
    // 更新本地数据
    const newData = data.map(item => {
      if (item.id === currentRecord.id) {
        const updatedItem = { 
          ...item,
          status: item.status === 'pending' ? 'processing' : item.status,
          timeline: [
            ...item.timeline,
            {
              time: moment().format('YYYY-MM-DD HH:mm:ss'),
              status: '客服回复',
              operator: '客服专员',
              comment: values.reply
            }
          ]
        };
        return updatedItem;
      }
      return item;
    });
    
    setData(newData);
    
    // 更新当前记录
    const updatedRecord = newData.find(item => item.id === currentRecord.id);
    if (updatedRecord) {
      setCurrentRecord(updatedRecord);
    }
    
    setReplyVisible(false);
    form.resetFields();
  };

  // 添加物流信息
  const handleAddTracking = () => {
    setTrackingVisible(true);
  };

  // 提交物流信息
  const submitTracking = (values: any) => {
    if (!currentRecord) return;
    
    message.success('物流信息已更新');
    
    // 更新本地数据
    const newData = data.map(item => {
      if (item.id === currentRecord.id) {
        const updatedItem = { 
          ...item,
          returnTrackingNumber: values.trackingNumber,
          timeline: [
            ...item.timeline,
            {
              time: moment().format('YYYY-MM-DD HH:mm:ss'),
              status: '物流更新',
              operator: '客服专员',
              comment: `更新物流单号: ${values.trackingNumber}`
            }
          ]
        };
        return updatedItem;
      }
      return item;
    });
    
    setData(newData);
    
    // 更新当前记录
    const updatedRecord = newData.find(item => item.id === currentRecord.id);
    if (updatedRecord) {
      setCurrentRecord(updatedRecord);
    }
    
    setTrackingVisible(false);
    trackingForm.resetFields();
  };

  // 表格列定义
  const columns: TableProps<AfterSaleData>['columns'] = [
    {
      title: '售后单号',
      dataIndex: 'id',
      key: 'id',
      render: (id, record) => <a onClick={() => viewAfterSaleDetails(record)}>{id}</a>,
    },
    {
      title: '关联订单',
      dataIndex: 'orderId',
      key: 'orderId',
      render: (orderId) => <a>{orderId}</a>,
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
        </div>
      ),
    },
    {
      title: '申请时间',
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
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type) => getTypeTag(type),
      filters: [
        { text: '仅退款', value: 'refund' },
        { text: '退货退款', value: 'return' },
        { text: '换货', value: 'exchange' },
        { text: '维修', value: 'repair' },
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: '退款金额',
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a, b) => a.amount - b.amount,
      render: (amount) => <span>¥{amount.toFixed(2)}</span>,
    },
    {
      title: '原因',
      dataIndex: 'reason',
      key: 'reason',
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusTag(status),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            onClick={() => viewAfterSaleDetails(record)}
          />
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="1" onClick={() => viewAfterSaleDetails(record)}>
                  查看详情
                </Menu.Item>
                <Menu.Divider />
                {record.status === 'pending' && (
                  <>
                    <Menu.Item key="2" onClick={() => handleStatusChange(record.id, 'approved')}>
                      批准申请
                    </Menu.Item>
                    <Menu.Item key="3" onClick={() => handleStatusChange(record.id, 'rejected')}>
                      拒绝申请
                    </Menu.Item>
                  </>
                )}
                {record.status === 'approved' && (
                  <Menu.Item key="4" onClick={() => handleStatusChange(record.id, 'completed')}>
                    标记为已完成
                  </Menu.Item>
                )}
                {['pending', 'processing', 'approved'].includes(record.status) && (
                  <Menu.Item key="5" onClick={() => handleStatusChange(record.id, 'cancelled')}>
                    取消申请
                  </Menu.Item>
                )}
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
    const processingCount = data.filter(item => item.status === 'processing').length;
    const completedCount = data.filter(item => item.status === 'completed').length;
    const totalAmount = data
      .filter(item => item.status === 'completed')
      .reduce((sum, item) => sum + item.amount, 0);
    
    return { total, pendingCount, processingCount, completedCount, totalAmount };
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

  // 获取当前售后单的处理进度
  const getAfterSaleProgress = (status: AfterSaleStatus) => {
    switch (status) {
      case 'pending':
        return 0;
      case 'processing':
        return 1;
      case 'approved':
        return 2;
      case 'rejected':
        return 3;
      case 'completed':
        return 3;
      case 'cancelled':
        return 3;
      default:
        return 0;
    }
  };

  // 获取进度条状态
  const getProgressStatus = (status: AfterSaleStatus, currentStep: number, step: number) => {
    if (status === 'rejected' && step === 3) return 'error';
    if (status === 'cancelled' && step === 3) return 'error';
    if (step < currentStep) return 'finish';
    if (step === currentStep) return 'process';
    return 'wait';
  };

  return (
    <div className={styles.afterSaleContainer}>
      <Card bordered={false} className={styles.headerCard}>
        <Row gutter={24} align="middle">
          <Col span={12}>
            <Title level={2}>退款/售后管理</Title>
            <Text type="secondary">处理客户的退款、退货、换货和维修申请</Text>
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

      <Row gutter={24} className={styles.statsRow}>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className={styles.statCard}>
            <div className={styles.statCardContent}>
              <div className={`${styles.statCardIconWrapper} ${styles.blue}`}>
                <SolutionOutlined className={styles.statCardIcon} />
              </div>
              <div className={styles.statCardInfo}>
                <div className={styles.statCardValue}>{stats.total}</div>
                <div className={styles.statCardTitle}>
                  <Badge status="processing" />总申请数
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className={styles.statCard}>
            <div className={styles.statCardContent}>
              <div className={`${styles.statCardIconWrapper} ${styles.orange}`}>
                <ExclamationCircleOutlined className={styles.statCardIcon} />
              </div>
              <div className={styles.statCardInfo}>
                <div className={styles.statCardValue}>{stats.pendingCount}</div>
                <div className={styles.statCardTitle}>
                  <Badge status="warning" />待处理
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className={styles.statCard}>
            <div className={styles.statCardContent}>
              <div className={`${styles.statCardIconWrapper} ${styles.purple}`}>
                <SyncOutlined className={styles.statCardIcon} />
              </div>
              <div className={styles.statCardInfo}>
                <div className={styles.statCardValue}>{stats.processingCount}</div>
                <div className={styles.statCardTitle}>
                  <Badge status="processing" />处理中
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className={styles.statCard}>
            <div className={styles.statCardContent}>
              <div className={`${styles.statCardIconWrapper} ${styles.green}`}>
                <DollarOutlined className={styles.statCardIcon} />
              </div>
              <div className={styles.statCardInfo}>
                <div className={styles.statCardValue}>¥{stats.totalAmount.toFixed(2)}</div>
                <div className={styles.statCardTitle}>
                  <Badge status="success" />已完成退款
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Card bordered={false} className={styles.filterCard}>
        <Row gutter={16}>
          <Col xs={24} md={12} lg={8}>
            <Input
              placeholder="搜索售后单号/订单号/客户"
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
          <Col xs={24} lg={8}>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="售后类型"
              onChange={(values) => setTypeFilter(values)}
              allowClear
            >
              <Option value="refund">仅退款</Option>
              <Option value="return">退货退款</Option>
              <Option value="exchange">换货</Option>
              <Option value="repair">维修</Option>
            </Select>
          </Col>
        </Row>
      </Card>

      <Card bordered={false} className={styles.tableCard}>
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          type="card"
          className={styles.afterSaleTabs}
        >
          <TabPane tab="全部申请" key="all">
            {/* 全部申请内容在下方表格中显示 */}
          </TabPane>
          <TabPane tab={
            <span>
              <ExclamationCircleOutlined />待处理
              <Badge count={data.filter(item => item.status === 'pending').length} offset={[5, -5]} size="small" />
            </span>
          } key="pending">
            {/* 待处理内容在下方表格中显示 */}
          </TabPane>
          <TabPane tab={
            <span>
              <SolutionOutlined />处理中
              <Badge count={data.filter(item => item.status === 'processing').length} offset={[5, -5]} size="small" />
            </span>
          } key="processing">
            {/* 处理中内容在下方表格中显示 */}
          </TabPane>
          <TabPane tab={
            <span>
              <CheckCircleOutlined />已批准
              <Badge count={data.filter(item => item.status === 'approved').length} offset={[5, -5]} size="small" />
            </span>
          } key="approved">
            {/* 已批准内容在下方表格中显示 */}
          </TabPane>
          <TabPane tab={
            <span>
              <CheckCircleOutlined />已完成
              <Badge count={data.filter(item => item.status === 'completed').length} offset={[5, -5]} size="small" />
            </span>
          } key="completed">
            {/* 已完成内容在下方表格中显示 */}
          </TabPane>
          <TabPane tab={
            <span>
              <CloseCircleOutlined />已拒绝/取消
              <Badge count={data.filter(item => ['rejected', 'cancelled'].includes(item.status)).length} offset={[5, -5]} size="small" />
            </span>
          } key="rejected">
            {/* 已拒绝内容在下方表格中显示 */}
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
            showTotal: (total) => `共 ${total} 条售后申请`,
          }}
          rowClassName={(record) => {
            if (record.status === 'pending') return styles.rowPending;
            if (record.status === 'rejected' || record.status === 'cancelled') return styles.rowRejected;
            if (record.status === 'completed') return styles.rowCompleted;
            return '';
          }}
        />
      </Card>

      {/* 售后详情弹窗 */}
      <Modal
        title={`售后详情 - ${currentRecord?.id}`}
        visible={detailVisible}
        onCancel={() => setDetailVisible(false)}
        width={800}
        footer={[
          <Button key="back" onClick={() => setDetailVisible(false)}>
            关闭
          </Button>,
          currentRecord?.status === 'pending' && (
            <Button 
              key="reject" 
              danger
              onClick={() => {
                if (currentRecord) handleStatusChange(currentRecord.id, 'rejected');
              }}
            >
              拒绝申请
            </Button>
          ),
          currentRecord?.status === 'pending' && (
            <Button 
              key="approve" 
              onClick={() => {
                if (currentRecord) handleStatusChange(currentRecord.id, 'approved');
              }}
            >
              批准申请
            </Button>
          ),
          currentRecord?.status === 'approved' && (
            <Button 
              key="complete" 
              onClick={() => {
                if (currentRecord) handleStatusChange(currentRecord.id, 'completed');
              }}
            >
              标记为已完成
            </Button>
          ),
          currentRecord?.status === 'processing' && (
            <Button 
              key="cancel" 
              onClick={() => {
                if (currentRecord) handleStatusChange(currentRecord.id, 'cancelled');
              }}
            >
              取消申请
            </Button>
          ),
        ]}
      >
        {/* ... 弹窗内容 ... */}
      </Modal>
      
      {/* ... 其他模态框 ... */}
    </div>
  );
};

export default AfterSale;