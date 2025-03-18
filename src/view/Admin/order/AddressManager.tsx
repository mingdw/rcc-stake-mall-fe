import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Divider, Empty, Modal, Popconfirm, Space, Spin, Tag, Typography } from 'antd';
import { DeleteOutlined, EditOutlined, EnvironmentOutlined, PhoneOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { getUserAddressList, deleteAddress, UserAddress } from '../../../api/apiService';
import AdminContentCard from '../AdminContentCard';
import AddressForm from '../../mall/AddressForm';
import styles from './AddressManager.module.scss';
import { authManager } from '../../../utils/authManager';

const { Text } = Typography;

// 定义地址类
const AddressManager: React.FC = () => {
  const queryClient = useQueryClient();
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [addressFormVisible, setAddressFormVisible] = useState(false);
  const [editingAddress, setEditingAddress] = useState<UserAddress | null>(null);
  const [viewDetailsVisible, setViewDetailsVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<UserAddress | null>(null);

  // 获取地址列表
  const { data: addresses, isLoading } = useQuery<UserAddress[]>({
    queryKey: ['userAddresses'],
    queryFn: async () => {
      const response = await getUserAddressList({
        userId: authManager.userInfo?.id,
        userCode: authManager.userInfo?.userCode
      });
      return response || [];
    }
  });

  // 删除地址的mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userAddresses'] });
    }
  });

  const sortedAddresses = addresses?.sort((a, b) => (b.isDefault - a.isDefault)) || [];

  // 初始化选中默认地址
  useEffect(() => {
    if (sortedAddresses.length > 0 && !selectedAddressId) {
      const defaultAddress = sortedAddresses.find(addr => addr.isDefault === 1);
      setSelectedAddressId(defaultAddress ? defaultAddress.id : sortedAddresses[0].id);
    }
  }, [sortedAddresses, selectedAddressId]);

  const handleSelectAddress = (id: number) => {
    setSelectedAddressId(id);
    setSelectedAddress(addresses?.find(addr => addr.id === id) || null);
    setViewDetailsVisible(true);
  };

  const handleAddAddress = () => {
    setEditingAddress(null);
    setAddressFormVisible(true);
  };

  const handleEditAddress = (addr: UserAddress) => {
    setEditingAddress(addr);
    setAddressFormVisible(true);
  };

  const handleDeleteAddress = (id: number) => {
    deleteMutation.mutate(id);
  };

  return (
    <AdminContentCard
      title="我的收货地址"
      icon={<EnvironmentOutlined />}
      reqKey="address"
    >
      <div className={styles.cardHeader}>
        <Text type="secondary">管理您的收货地址信息，可添加多个收货地址并设置默认地址</Text>
      </div>

      {isLoading ? (
        <div className={styles.loadingContainer}>
          <Spin size="large" />
        </div>
      ) : sortedAddresses.length === 0 ? (
        <div className={styles.emptyContainer}>
          <Empty 
            description="暂无收货地址，请添加新的收货地址" 
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={handleAddAddress}
          >
            添加收货地址
          </Button>
        </div>
      ) : (
        <div className={styles.addressGroup}>
          {sortedAddresses.map(addr => (
            <div 
              key={addr.id}
              className={`${styles.addressItem} ${selectedAddressId === addr.id ? styles.selected : ''}`}
              onClick={() => handleSelectAddress(addr.id)}
              data-default={addr.isDefault === 1}
            >
              <div className={styles.addressRow}>
                {addr.isDefault === 1 && (
                  <span className={styles.defaultTag}>默认地址</span>
                )}
                <div className={styles.addressInfo}>
                  <div className={styles.namePhone}>
                    <span className={styles.name}>
                      <UserOutlined /> {addr.reciverName}
                    </span>
                    <span className={styles.phone}>
                      <PhoneOutlined /> {addr.reciverPhone}
                      </span>
                  </div>
                  <div className={styles.addressDetail}>
                    <EnvironmentOutlined /> 
                    <span>
                      {addr.provinceName} {addr.cityName} {addr.districtName} {addr.streetName || ''} {addr.houseAddress}
                    </span>
                  </div>
                </div>
                <div className={styles.addressActions}>
                  <Button 
                    type="link" 
                    icon={<EditOutlined />}
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
                      icon={<DeleteOutlined />}
                      onClick={(e) => e.stopPropagation()}
                    >
                      删除
                    </Button>
                  </Popconfirm>
                </div>
              </div>
            </div>
          ))}
          
          <div className={styles.addressGroupFooter}>
              <Button 
                type="link" 
                icon={<PlusOutlined />} 
                onClick={handleAddAddress}
              >
                添加新收货地址
              </Button>
           
          </div>
        </div>
      )}

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
        initialValues={editingAddress || null}
        title={editingAddress ? '编辑收货地址' : '添加收货地址'}
      />

      {/* 地址详情弹窗 */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <EnvironmentOutlined style={{ color: '#1890ff', marginRight: 8 }} />
            <span>地址详情</span>
          </div>
        }
        open={viewDetailsVisible}
        onCancel={() => setViewDetailsVisible(false)}
        footer={[
          <Button key="back" onClick={() => setViewDetailsVisible(false)}>
            关闭
          </Button>,
          <Button 
            key="edit" 
            type="primary" 
            icon={<EditOutlined />}
            onClick={() => {
              setViewDetailsVisible(false);
              if (selectedAddress) {
                handleEditAddress(selectedAddress);
              }
            }}
          >
            编辑
          </Button>,
        ]}
        width={600}
        centered
        bodyStyle={{ padding: '24px' }}
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
    </AdminContentCard>
  );
};

export default AddressManager; 