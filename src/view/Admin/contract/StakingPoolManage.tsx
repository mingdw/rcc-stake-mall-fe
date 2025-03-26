import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Button, 
  Input, 
  Select, 
  Space, 
  Modal, 
  Form, 
  InputNumber, 
  Switch, 
  message, 
  Card, 
  Tooltip, 
  Popconfirm,
  Tag
} from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  QuestionCircleOutlined,
  ExclamationCircleOutlined,
  WalletOutlined
} from '@ant-design/icons';
import AdminContentCard from '../AdminContentCard';
import { 
  getStakingPools, 
  createStakingPool, 
  updateStakingPool, 
  deleteStakingPool 
} from '../../../api/apiService';
import type { ColumnsType } from 'antd/es/table';
import styles from './StakingPoolManage.module.scss';

const { Option } = Select;
const { TextArea } = Input;

// 质押池接口定义
interface StakingPool {
  id: string;
  name: string;
  symbol: string;
  apr: number;
  minStakeAmount: number;
  maxStakeAmount: number;
  lockPeriod: number;
  totalStaked: number;
  remainingCapacity: number;
  maxCapacity: number;
  status: 'active' | 'paused' | 'completed';
  description: string;
  riskLevel: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

const StakingPoolManage: React.FC = () => {
  // 状态定义
  const [stakingPools, setStakingPools] = useState<StakingPool[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentPool, setCurrentPool] = useState<StakingPool | null>(null);
  const [form] = Form.useForm();
  
  // 搜索状态
  const [searchName, setSearchName] = useState<string>('');
  const [searchStatus, setSearchStatus] = useState<string>('');
  
  // 模拟数据
  const mockPoolsData: StakingPool[] = [
    {
      id: '1',
      name: 'ETH 2.0 质押池',
      symbol: 'ETH',
      apr: 5.8,
      minStakeAmount: 0.1,
      maxStakeAmount: 32,
      lockPeriod: 30,
      totalStaked: 1024,
      remainingCapacity: 976,
      maxCapacity: 2000,
      status: 'active',
      description: 'ETH 2.0质押池，参与ETH网络验证并获得奖励',
      riskLevel: 'low',
      createdAt: '2023-05-01T00:00:00Z',
      updatedAt: '2023-06-15T00:00:00Z'
    },
    {
      id: '2',
      name: 'BTC 收益池',
      symbol: 'BTC',
      apr: 3.2,
      minStakeAmount: 0.01,
      maxStakeAmount: 1,
      lockPeriod: 60,
      totalStaked: 15,
      remainingCapacity: 35,
      maxCapacity: 50,
      status: 'active',
      description: 'BTC收益池，通过DeFi策略为BTC持有者提供被动收入',
      riskLevel: 'medium',
      createdAt: '2023-06-10T00:00:00Z',
      updatedAt: '2023-06-15T00:00:00Z'
    },
    {
      id: '3',
      name: 'DOT 验证者池',
      symbol: 'DOT',
      apr: 12.5,
      minStakeAmount: 50,
      maxStakeAmount: 1000,
      lockPeriod: 14,
      totalStaked: 25000,
      remainingCapacity: 75000,
      maxCapacity: 100000,
      status: 'paused',
      description: 'Polkadot验证者池，参与网络共识并获得奖励',
      riskLevel: 'medium',
      createdAt: '2023-04-15T00:00:00Z',
      updatedAt: '2023-06-01T00:00:00Z'
    },
    {
      id: '4',
      name: '高收益LP池',
      symbol: 'LP',
      apr: 20.5,
      minStakeAmount: 100,
      maxStakeAmount: 10000,
      lockPeriod: 90,
      totalStaked: 250000,
      remainingCapacity: 0,
      maxCapacity: 250000,
      status: 'completed',
      description: '高收益流动性提供者池，参与DEX流动性挖矿',
      riskLevel: 'high',
      createdAt: '2023-03-01T00:00:00Z',
      updatedAt: '2023-05-30T00:00:00Z'
    }
  ];
  
  // 获取质押池列表
  useEffect(() => {
    fetchStakingPools();
  }, []);
  
  const fetchStakingPools = async () => {
    setLoading(true);
    try {
      // 调用API获取质押池列表
      const response = await getStakingPools();
      
      // 如果API返回成功，使用真实数据
      if (response && Array.isArray(response)) {
        setStakingPools(response as StakingPool[]);
      } else {
        // 如果API未返回预期数据，使用模拟数据
        setStakingPools(mockPoolsData);
      }
    } catch (error) {
      console.error('获取质押池列表失败:', error);
      message.error('获取质押池列表失败');
      
      // 使用模拟数据
      setStakingPools(mockPoolsData);
    } finally {
      setLoading(false);
    }
  };
  
  // 筛选质押池
  const filteredPools = stakingPools.filter(pool => {
    return (
      pool.name.toLowerCase().includes(searchName.toLowerCase()) &&
      (searchStatus === '' || pool.status === searchStatus)
    );
  });
  
  // 表格列定义
  const columns: ColumnsType<StakingPool> = [
    {
      title: '质押池名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: StakingPool) => (
        <span>
          <strong>{text}</strong>
          <br />
          <small>{record.symbol}</small>
        </span>
      ),
    },
    {
      title: '年化收益率',
      dataIndex: 'apr',
      key: 'apr',
      render: (apr: number) => `${apr}%`,
      sorter: (a, b) => a.apr - b.apr,
    },
    {
      title: '锁定期(天)',
      dataIndex: 'lockPeriod',
      key: 'lockPeriod',
      sorter: (a, b) => a.lockPeriod - b.lockPeriod,
    },
    {
      title: '最小/最大质押量',
      key: 'stakeRange',
      render: (_, record) => (
        <span>
          {record.minStakeAmount} ~ {record.maxStakeAmount} {record.symbol}
        </span>
      ),
    },
    {
      title: '总质押量/容量',
      key: 'capacity',
      render: (_, record) => (
        <Tooltip title={`已质押: ${record.totalStaked} ${record.symbol}, 总容量: ${record.maxCapacity} ${record.symbol}`}>
          <div>
            <div>{record.totalStaked}/{record.maxCapacity} {record.symbol}</div>
            <div className={styles.capacityBar}>
              <div 
                className={styles.capacityFill} 
                style={{ width: `${(record.totalStaked / record.maxCapacity) * 100}%` }}
              />
            </div>
          </div>
        </Tooltip>
      ),
    },
    {
      title: '风险等级',
      dataIndex: 'riskLevel',
      key: 'riskLevel',
      render: (riskLevel: string) => {
        const color = 
          riskLevel === 'low' ? 'green' : 
          riskLevel === 'medium' ? 'orange' : 'red';
          
        return <Tag color={color}>{riskLevel.toUpperCase()}</Tag>;
      },
      filters: [
        { text: '低风险', value: 'low' },
        { text: '中风险', value: 'medium' },
        { text: '高风险', value: 'high' },
      ],
      onFilter: (value, record) => record.riskLevel === value,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = '';
        let text = '';
        
        switch (status) {
          case 'active':
            color = 'green';
            text = '活跃';
            break;
          case 'paused':
            color = 'orange';
            text = '暂停';
            break;
          case 'completed':
            color = 'gray';
            text = '已结束';
            break;
          default:
            color = 'blue';
            text = status;
        }
        
        return <Tag color={color}>{text}</Tag>;
      },
      filters: [
        { text: '活跃', value: 'active' },
        { text: '暂停', value: 'paused' },
        { text: '已结束', value: 'completed' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除该质押池吗?"
            okText="确定"
            cancelText="取消"
            onConfirm={() => handleDelete(record)}
            icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
          >
            <Button 
              danger 
              icon={<DeleteOutlined />}
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  
  // 处理编辑
  const handleEdit = (pool: StakingPool) => {
    setCurrentPool(pool);
    form.setFieldsValue({
      name: pool.name,
      symbol: pool.symbol,
      apr: pool.apr,
      minStakeAmount: pool.minStakeAmount,
      maxStakeAmount: pool.maxStakeAmount,
      lockPeriod: pool.lockPeriod,
      maxCapacity: pool.maxCapacity,
      status: pool.status,
      description: pool.description,
      riskLevel: pool.riskLevel,
    });
    setIsModalVisible(true);
  };
  
  // 处理添加
  const handleAdd = () => {
    setCurrentPool(null);
    form.resetFields();
    form.setFieldsValue({
      status: 'active',
      riskLevel: 'medium',
    });
    setIsModalVisible(true);
  };
  
  // 处理删除
  const handleDelete = async (pool: StakingPool) => {
    try {
      await deleteStakingPool(pool.id);
      message.success(`已删除质押池: ${pool.name}`);
      setStakingPools(prevPools => prevPools.filter(p => p.id !== pool.id));
    } catch (error) {
      console.error('删除质押池失败:', error);
      message.error('删除质押池失败');
    }
  };
  
  // 表单提交
  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      if (currentPool) {
        // 更新质押池
        try {
          await updateStakingPool(currentPool.id, {
            ...values,
            updatedAt: new Date().toISOString(),
          });
          
          const updatedPool = {
            ...currentPool,
            ...values,
            updatedAt: new Date().toISOString(),
          };
          
          setStakingPools(prevPools => 
            prevPools.map(pool => 
              pool.id === currentPool.id ? updatedPool : pool
            )
          );
          
          message.success('质押池更新成功');
        } catch (error) {
          console.error('更新质押池失败:', error);
          message.error('更新质押池失败');
        }
      } else {
        // 添加新质押池
        try {
          const newPoolData = {
            ...values,
            totalStaked: 0,
            remainingCapacity: values.maxCapacity,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          
          const response = await createStakingPool(newPoolData);
          
          if (response && response.id) {
            // 如果API返回了创建的池ID
            const newPool: StakingPool = {
              ...newPoolData,
              id: response.id,
              totalStaked: 0,
              remainingCapacity: values.maxCapacity,
              status: values.status as 'active' | 'paused' | 'completed',
              riskLevel: values.riskLevel as 'low' | 'medium' | 'high',
            };
            
            setStakingPools(prevPools => [...prevPools, newPool]);
          } else {
            // 如果API没有返回ID，使用临时ID
            const newPool: StakingPool = {
              ...newPoolData,
              id: `${Date.now()}`,
              totalStaked: 0,
              remainingCapacity: values.maxCapacity,
              status: values.status as 'active' | 'paused' | 'completed',
              riskLevel: values.riskLevel as 'low' | 'medium' | 'high',
            };
            
            setStakingPools(prevPools => [...prevPools, newPool]);
          }
          
          message.success('质押池创建成功');
        } catch (error) {
          console.error('创建质押池失败:', error);
          message.error('创建质押池失败');
        }
      }
      
      setIsModalVisible(false);
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };
  
  return (
    <AdminContentCard title="质押池管理" icon={<WalletOutlined />}>
      <div className={styles.searchContainer}>
        <div className={styles.searchForm}>
          <Input
            placeholder="质押池名称"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            style={{ width: 200, marginRight: 16 }}
            prefix={<SearchOutlined />}
          />
          <Select
            placeholder="状态"
            value={searchStatus}
            onChange={(value) => setSearchStatus(value)}
            style={{ width: 120, marginRight: 16 }}
            allowClear
          >
            <Option value="active">活跃</Option>
            <Option value="paused">暂停</Option>
            <Option value="completed">已结束</Option>
          </Select>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={handleAdd}
        >
          添加质押池
        </Button>
      </div>
      
      <Card className={styles.statsCard}>
        <div className={styles.statItem}>
          <div className={styles.statTitle}>总质押池数量</div>
          <div className={styles.statValue}>{stakingPools.length}</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statTitle}>活跃质押池</div>
          <div className={styles.statValue}>
            {stakingPools.filter(pool => pool.status === 'active').length}
          </div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statTitle}>平均年化收益率</div>
          <div className={styles.statValue}>
            {stakingPools.length > 0 
              ? (stakingPools.reduce((sum, pool) => sum + pool.apr, 0) / stakingPools.length).toFixed(2) 
              : 0}%
          </div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statTitle}>总质押量</div>
          <div className={styles.statValue}>
            {stakingPools.reduce((sum, pool) => sum + pool.totalStaked, 0).toLocaleString()}
          </div>
        </div>
      </Card>
      
      <Table
        columns={columns}
        dataSource={filteredPools}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
      
      <Modal
        title={currentPool ? '编辑质押池' : '添加质押池'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleFormSubmit}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <div className={styles.formGrid}>
            <Form.Item
              name="name"
              label="质押池名称"
              rules={[{ required: true, message: '请输入质押池名称' }]}
            >
              <Input placeholder="请输入质押池名称" />
            </Form.Item>
            
            <Form.Item
              name="symbol"
              label="币种符号"
              rules={[{ required: true, message: '请输入币种符号' }]}
            >
              <Input placeholder="请输入币种符号" />
            </Form.Item>
            
            <Form.Item
              name="apr"
              label="年化收益率(%)"
              rules={[{ required: true, message: '请输入年化收益率' }]}
            >
              <InputNumber
                min={0}
                max={100}
                step={0.1}
                precision={2}
                style={{ width: '100%' }}
                placeholder="请输入年化收益率"
              />
            </Form.Item>
            
            <Form.Item
              name="lockPeriod"
              label="锁定期(天)"
              rules={[{ required: true, message: '请输入锁定期' }]}
            >
              <InputNumber
                min={1}
                style={{ width: '100%' }}
                placeholder="请输入锁定期"
              />
            </Form.Item>
            
            <Form.Item
              name="minStakeAmount"
              label="最小质押量"
              rules={[{ required: true, message: '请输入最小质押量' }]}
            >
              <InputNumber
                min={0}
                step={0.01}
                precision={2}
                style={{ width: '100%' }}
                placeholder="请输入最小质押量"
              />
            </Form.Item>
            
            <Form.Item
              name="maxStakeAmount"
              label="最大质押量"
              rules={[{ required: true, message: '请输入最大质押量' }]}
            >
              <InputNumber
                min={0}
                step={0.01}
                precision={2}
                style={{ width: '100%' }}
                placeholder="请输入最大质押量"
              />
            </Form.Item>
            
            <Form.Item
              name="maxCapacity"
              label="总容量"
              rules={[{ required: true, message: '请输入总容量' }]}
            >
              <InputNumber
                min={0}
                step={1}
                style={{ width: '100%' }}
                placeholder="请输入总容量"
              />
            </Form.Item>
            
            <Form.Item
              name="riskLevel"
              label="风险等级"
              rules={[{ required: true, message: '请选择风险等级' }]}
            >
              <Select placeholder="请选择风险等级">
                <Option value="low">低风险</Option>
                <Option value="medium">中风险</Option>
                <Option value="high">高风险</Option>
              </Select>
            </Form.Item>
            
            <Form.Item
              name="status"
              label="状态"
              rules={[{ required: true, message: '请选择状态' }]}
            >
              <Select placeholder="请选择状态">
                <Option value="active">活跃</Option>
                <Option value="paused">暂停</Option>
                <Option value="completed">已结束</Option>
              </Select>
            </Form.Item>
          </div>
          
          <Form.Item
            name="description"
            label="描述"
            rules={[{ required: true, message: '请输入描述' }]}
          >
            <TextArea rows={4} placeholder="请输入描述" />
          </Form.Item>
        </Form>
      </Modal>
    </AdminContentCard>
  );
};

export default StakingPoolManage; 