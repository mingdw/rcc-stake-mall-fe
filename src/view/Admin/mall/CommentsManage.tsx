import React, { useState, useEffect } from 'react';
import { Table, Card, Space, Tag, Button, Modal, Rate, Input, DatePicker, Image, Typography, message } from 'antd';
import { SearchOutlined, EyeOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

// 导入样式文件
import styles from './CommentsManage.module.scss';

const { RangePicker } = DatePicker;
const { Text } = Typography;

interface CommentItem {
  id: string;
  productName: string;
  userName: string;
  rating: number;
  content: string;
  images?: string[];
  createTime: string;
  status: 'normal' | 'hidden';
  orderNo: string;
}

// Sample mock data
const mockData: CommentItem[] = [
  {
    id: '1',
    productName: 'NFT数字藏品 - 山水画',
    userName: 'user123',
    rating: 5,
    content: '非常满意这个藏品，质量很高，值得收藏！',
    images: [
      'https://picsum.photos/id/1/100/100',
      'https://picsum.photos/id/2/100/100',
    ],
    createTime: '2023-06-15 10:30:22',
    status: 'normal',
    orderNo: 'RCC20230615001',
  },
  {
    id: '2',
    productName: '数字礼品卡 - 100元',
    userName: 'crypto_fan',
    rating: 3,
    content: '礼品卡使用过程有点复杂，但客服很耐心地解答了我的问题。',
    createTime: '2023-06-14 15:45:33',
    status: 'normal',
    orderNo: 'RCC20230614002',
  },
  {
    id: '3',
    productName: '虚拟会员卡 - 高级版',
    userName: 'blockchain_lover',
    rating: 2,
    content: '会员权益不如预期，希望能改进。',
    createTime: '2023-06-13 09:15:47',
    status: 'hidden',
    orderNo: 'RCC20230613003',
  },
];

const CommentsManage: React.FC = () => {
  const [searchForm, setSearchForm] = useState({
    keyword: '',
    dateRange: null as dayjs.Dayjs[] | null,
    rating: undefined as number | undefined,
  });
  
  const [loading, setLoading] = useState(false);
  const [commentData, setCommentData] = useState<CommentItem[]>([]);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [currentComment, setCurrentComment] = useState<CommentItem | null>(null);

  // Fetch data on component mount
  useEffect(() => {
    fetchComments();
  }, []);

  // Fetch comments data
  const fetchComments = () => {
    setLoading(true);
    // Mock API call with timeout
    setTimeout(() => {
      setCommentData(mockData);
      setLoading(false);
    }, 500);
  };

  // 表格列定义
  const columns = [
    {
      title: '订单号',
      dataIndex: 'orderNo',
      width: 180,
    },
    {
      title: '商品名称',
      dataIndex: 'productName',
      width: 200,
      ellipsis: true,
    },
    {
      title: '用户',
      dataIndex: 'userName',
      width: 120,
    },
    {
      title: '评分',
      dataIndex: 'rating',
      width: 120,
      render: (rating: number) => <Rate disabled defaultValue={rating} />,
    },
    {
      title: '评价内容',
      dataIndex: 'content',
      ellipsis: true,
      render: (content: string) => (
        <Text ellipsis={{ tooltip: content }}>{content}</Text>
      ),
    },
    {
      title: '评价时间',
      dataIndex: 'createTime',
      width: 180,
      sorter: (a: CommentItem, b: CommentItem) => 
        dayjs(a.createTime).unix() - dayjs(b.createTime).unix(),
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={status === 'normal' ? 'green' : 'red'}>
          {status === 'normal' ? '显示' : '隐藏'}
        </Tag>
      ),
    },
    {
      title: '操作',
      width: 220,
      fixed: 'right' as const,
      render: (_: any, record: CommentItem) => (
        <Space size="middle" className={styles.actionButtons}>
          <Button 
            type="link" 
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          >
            查看
          </Button>
          <Button 
            type="link"
            onClick={() => handleStatusChange(record)}
          >
            {record.status === 'normal' ? '隐藏' : '显示'}
          </Button>
          <Button 
            type="link" 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  // 查看评论详情
  const handleView = (record: CommentItem) => {
    setCurrentComment(record);
    setViewModalVisible(true);
  };

  // 处理评论状态变更
  const handleStatusChange = (record: CommentItem) => {
    Modal.confirm({
      title: '确认操作',
      icon: <ExclamationCircleOutlined />,
      content: `确定要${record.status === 'normal' ? '隐藏' : '显示'}该评论吗？`,
      onOk() {
        // 模拟API调用
        message.success(`已${record.status === 'normal' ? '隐藏' : '显示'}该评论`);
        // Update local state
        setCommentData(prev => 
          prev.map(item => 
            item.id === record.id 
              ? { ...item, status: item.status === 'normal' ? 'hidden' : 'normal' } 
              : item
          )
        );
      },
    });
  };

  // 处理评论删除
  const handleDelete = (record: CommentItem) => {
    Modal.confirm({
      title: '确认删除',
      icon: <ExclamationCircleOutlined />,
      content: '确定要删除该评论吗？此操作不可恢复！',
      okType: 'danger',
      onOk() {
        // 模拟API调用
        message.success('评论已删除');
        // Update local state
        setCommentData(prev => prev.filter(item => item.id !== record.id));
      },
    });
  };

  // 处理搜索
  const handleSearch = () => {
    setLoading(true);
    // 模拟搜索API调用
    setTimeout(() => {
      const { keyword, rating, dateRange } = searchForm;
      
      // Filter the mock data based on search criteria
      const filtered = mockData.filter(item => {
        // Keyword filter
        const keywordMatch = !keyword || 
          item.productName.includes(keyword) || 
          item.userName.includes(keyword) || 
          item.content.includes(keyword) ||
          item.orderNo.includes(keyword);
        
        // Rating filter
        const ratingMatch = !rating || item.rating === rating;
        
        // Date range filter
        let dateMatch = true;
        if (dateRange && dateRange.length === 2) {
          const commentDate = dayjs(item.createTime);
          dateMatch = commentDate.isAfter(dateRange[0].startOf('day')) && 
                     commentDate.isBefore(dateRange[1].endOf('day'));
        }
        
        return keywordMatch && ratingMatch && dateMatch;
      });
      
      setCommentData(filtered);
      setLoading(false);
    }, 500);
  };

  // Reset search form
  const handleReset = () => {
    setSearchForm({
      keyword: '',
      dateRange: null,
      rating: undefined,
    });
    fetchComments();
  };

  return (
    <div className={styles.commentsManage}>
      <Card title="评价管理" className={styles.contentCard}>
        {/* 搜索区域 */}
        <div className={styles.searchArea}>
          <Space wrap>
            <Input
              placeholder="搜索商品名称/用户名/评价内容/订单号"
              className={styles.searchInput}
              value={searchForm.keyword}
              onChange={e => setSearchForm(prev => ({ ...prev, keyword: e.target.value }))}
              allowClear
            />
            <RangePicker
              onChange={(dates) => setSearchForm(prev => ({ ...prev, dateRange: dates as dayjs.Dayjs[] | null }))}
              placeholder={['开始日期', '结束日期']}
            />
            <Rate
              value={searchForm.rating}
              onChange={value => setSearchForm(prev => ({ ...prev, rating: value }))}
              className={styles.ratingFilter}
            />
            <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
              搜索
            </Button>
            <Button onClick={handleReset}>重置</Button>
          </Space>
        </div>

        {/* 表格区域 */}
        <Table
          columns={columns}
          rowKey="id"
          dataSource={commentData}
          loading={loading}
          className={styles.commentsTable}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条评价`,
            defaultPageSize: 10,
            pageSizeOptions: ['10', '20', '50'],
          }}
          scroll={{ x: 'max-content' }}
          bordered={false}
          size="middle"
        />
      </Card>

      {/* 评论详情弹窗 */}
      {currentComment && (
        <Modal
          title={
            <div className={styles.modalTitle}>
              <span>评价详情</span>
              <Tag color={currentComment.status === 'normal' ? 'success' : 'error'} className={styles.statusTag}>
                {currentComment.status === 'normal' ? '已显示' : '已隐藏'}
              </Tag>
            </div>
          }
          open={viewModalVisible}
          onCancel={() => setViewModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setViewModalVisible(false)}>
              关闭
            </Button>,
            <Button 
              key="changeStatus" 
              type="primary"
              onClick={() => {
                handleStatusChange(currentComment);
                setViewModalVisible(false);
              }}
            >
              {currentComment.status === 'normal' ? '隐藏评价' : '显示评价'}
            </Button>
          ]}
          width={800}
          centered
          className={styles.detailModal}
        >
          <div className={styles.commentDetail}>
            <div className={styles.basicInfo}>
              <div className={styles.userInfo}>
                <div className={styles.userAvatar}>
                  {currentComment.userName.slice(0, 1).toUpperCase()}
                </div>
                <div className={styles.userMeta}>
                  <div className={styles.userName}>{currentComment.userName}</div>
                  <div className={styles.orderInfo}>{currentComment.orderNo}</div>
                </div>
              </div>
              <div className={styles.ratingInfo}>
                <Rate disabled value={currentComment.rating} />
                <span className={styles.commentTime}>{currentComment.createTime}</span>
              </div>
            </div>

            <div className={styles.productInfo}>
              <div className={styles.sectionTitle}>商品信息</div>
              <div className={styles.productCard}>
                <div className={styles.productName}>{currentComment.productName}</div>
              </div>
            </div>

            <div className={styles.commentSection}>
              <div className={styles.sectionTitle}>评价内容</div>
              <div className={styles.commentContent}>{currentComment.content}</div>
              
              {currentComment.images && currentComment.images.length > 0 && (
                <div className={styles.commentImages}>
                  {currentComment.images.map((img, index) => (
                    <div key={index} className={styles.imageWrapper}>
                      <Image
                        src={img}
                        width={150}
                        height={150}
                        className={styles.commentImage}
                        preview={{
                          mask: <EyeOutlined />,
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CommentsManage;
    

