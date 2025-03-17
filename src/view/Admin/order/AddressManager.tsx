import React, { useState, useEffect } from 'react';
import { 
  Card, Button, Space, Popconfirm, Tag, Modal, 
  message, Typography, Row, Col, Empty, Spin, Divider
} from 'antd';
import { 
  EditOutlined, DeleteOutlined, 
  PlusOutlined, ReloadOutlined, 
  EnvironmentOutlined, UserOutlined, PhoneOutlined
} from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserAddressList, deleteAddress, UserAddress } from '../../../api/apiService';
import AddressForm from '../../mall/AddressForm';
import styles from './AddressManager.module.scss';
import { authManager } from '../../../utils/authManager';

const { Title, Text } = Typography;

const AddressManager: React.FC = () => {
  const [addressFormVisible, setAddressFormVisible] = useState(false);
  const [editingAddress, setEditingAddress] = useState<UserAddress | null>(null);
  const [viewDetailsVisible, setViewDetailsVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<UserAddress | null>(null);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  
  const queryClient = useQueryClient();

  // 获取当前用户地址
  const { data: addresses, isLoading, refetch } = useQuery<UserAddress[]>({
    queryKey: ['userAddresses'],
    queryFn: async () => {
      console.log("authManager.userInfo:"+JSON.stringify(authManager.userInfo));
      const response = await getUserAddressList({
        userCode: authManager.userInfo?.userCode,
        userId: authManager.userInfo?.id
      });
      return response || [];
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!authManager.address,
  });

  // 删除地址的mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteAddress(id),
    onSuccess: () => {
      message.success('地址删除成功');
      queryClient.invalidateQueries({ queryKey: ['userAddresses'] });
    },
    onError: () => {
      message.error('删除地址失败');
    }
  });

  // 处理地址删除
  const handleDeleteAddress = (id: number) => {
    deleteMutation.mutate(id);
  };

  // 处理地址编辑
  const handleEditAddress = (address: UserAddress) => {
    setEditingAddress(address);
    setAddressFormVisible(true);
  };

  // 处理查看地址详情
  const handleViewDetails = (address: UserAddress) => {
    setSelectedAddress(address);
    setViewDetailsVisible(true);
  };

  // 处理添加新地址
  const handleAddAddress = () => {
    setEditingAddress(null);
    setAddressFormVisible(true);
  };

  // 选择地址
  const handleSelectAddress = (id: number) => {
    setSelectedAddressId(id);
  };

  // 对地址列表进行排序，默认地址排在最前面
  const sortedAddresses = addresses ? [...addresses].sort((a, b) => {
    if (a.isDefault === 1 && b.isDefault !== 1) return -1;
    if (a.isDefault !== 1 && b.isDefault === 1) return 1;
    return 0;
  }) : [];

  // 初始化选中默认地址
  useEffect(() => {
    if (sortedAddresses.length > 0 && !selectedAddressId) {
      const defaultAddress = sortedAddresses.find(addr => addr.isDefault === 1);
      setSelectedAddressId(defaultAddress ? defaultAddress.id : sortedAddresses[0].id);
    }
  }, [sortedAddresses, selectedAddressId]);

  if (!authManager.address) {
    return (
      <div className={styles.noAddressContainer}>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="请先连接钱包以查看您的地址信息"
        />
      </div>
    );
  }

  return (
    <div className={styles.addressManagerContainer}>
      <Card
        title={
          <div className={styles.cardHeader}>
            <Title level={4}>
              <EnvironmentOutlined /> 我的收货地址
            </Title>
            <Text type="secondary">管理您的收货地址信息</Text>
          </div>
        }
        extra={
          <Space>
            <Button 
              icon={<PlusOutlined />} 
              type="primary"
              onClick={handleAddAddress}
            >
              添加地址
            </Button>
            <Button 
              icon={<ReloadOutlined />} 
              onClick={() => refetch()}
            >
              刷新
            </Button>
          </Space>
        }
        className={styles.addressCard}
        loading={isLoading}
      >
        {isLoading ? (
          <div className={styles.loadingContainer}>
            <Spin size="large" />
          </div>
        ) : sortedAddresses.length === 0 ? (
          <Empty description="暂无收货地址，请添加" />
        ) : (
          <div className={styles.addressGroup}>
            {sortedAddresses.map(addr => (
              <div 
                key={addr.id}
                className={`${styles.addressItem} ${selectedAddressId === addr.id ? styles.selected : ''}`}
                onClick={() => handleSelectAddress(addr.id)}
                data-default={addr.isDefault === 1}
              >
                <div className={styles.addressContent}>
                  <div className={styles.addressInfo}>
                    {addr.isDefault === 1 && (
                      <span className={styles.defaultTag}>默认地址</span>
                    )}
                    <div className={styles.addressLine}>
                      <span className={styles.name}>{addr.reciverName}</span>
                      <span className={styles.phone}>{addr.reciverPhone}</span>
                      <span className={styles.addressDetail}>
                        {addr.provinceName} {addr.cityName} {addr.districtName} {addr.streetName || ''} {addr.houseAddress}
                      </span>
                    </div>
                  </div>
                  <div className={styles.addressActions}>
                    <Button 
                      type="link" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditAddress(addr);
                      }}
                    >
                      编辑
                    </Button>
                    <Divider type="vertical" />
                    <Popconfirm
                      title="确定要删除这个地址吗？"
                      onConfirm={(e) => {
                        e?.stopPropagation();
                        handleDeleteAddress(addr.id);
                      }}
                      okText="确定"
                      cancelText="取消"
                      onCancel={(e) => e?.stopPropagation()}
                    >
                      <Button 
                        type="link" 
                        danger
                        onClick={(e) => e.stopPropagation()}
                      >
                        删除
                      </Button>
                    </Popconfirm>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* 地址表单 */}
      <AddressForm
        visible={addressFormVisible}
        onCancel={() => {
          setAddressFormVisible(false);
          setEditingAddress(null);
        }}
        onSubmit={() => {
          setAddressFormVisible(false);
          setEditingAddress(null);
          queryClient.invalidateQueries({ queryKey: ['userAddresses'] });
        }}
        initialValues={editingAddress}
        title={editingAddress ? '编辑收货地址' : '添加收货地址'}
      />

      {/* 地址详情弹窗 */}
      <Modal
        title="地址详情"
        open={viewDetailsVisible}
        onCancel={() => setViewDetailsVisible(false)}
        footer={[
          <Button key="back" onClick={() => setViewDetailsVisible(false)}>
            关闭
          </Button>,
          <Button 
            key="edit" 
            type="primary" 
            onClick={() => {
              setViewDetailsVisible(false);
              handleEditAddress(selectedAddress!);
            }}
          >
            编辑
          </Button>,
        ]}
        width={600}
      >
        {selectedAddress && (
          <div className={styles.addressDetails}>
            <div className={styles.detailRow}>
              <div className={styles.detailLabel}>
                <UserOutlined /> 收货人：
              </div>
              <div className={styles.detailValue}>
                {selectedAddress.reciverName}
                {selectedAddress.isDefault === 1 && (
                  <Tag color="blue" className={styles.defaultTag}>默认地址</Tag>
                )}
              </div>
            </div>
            
            <div className={styles.detailRow}>
              <div className={styles.detailLabel}>
                <PhoneOutlined /> 联系电话：
              </div>
              <div className={styles.detailValue}>{selectedAddress.reciverPhone}</div>
            </div>
            
            <div className={styles.detailRow}>
              <div className={styles.detailLabel}>
                <EnvironmentOutlined /> 所在地区：
              </div>
              <div className={styles.detailValue}>
                {selectedAddress.provinceName} {selectedAddress.cityName} {selectedAddress.districtName} {selectedAddress.streetName || ''}
              </div>
            </div>
            
            <div className={styles.detailRow}>
              <div className={styles.detailLabel}>详细地址：</div>
              <div className={styles.detailValue}>{selectedAddress.houseAddress}</div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AddressManager; 