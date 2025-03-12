import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Card, Typography, Button, Form, Input, Radio, Space, Divider, message, Spin, Empty, Tag } from 'antd';
import { EnvironmentOutlined, PlusOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { getProductDetail, submitOrder, deleteAddress, getUserAddressList } from '../../api/apiService';
import styles from './OrderConfirm.module.scss';
import { useAuth } from '../../context/AuthContext';
import AddressForm from './AddressForm';
import type { UserAddress, UserAddressListResponse } from '../../api/apiService';

const { Title, Text } = Typography;

const OrderConfirm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { authData } = useAuth();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [addressFormVisible, setAddressFormVisible] = useState(false);
  const [editingAddress, setEditingAddress] = useState<UserAddress | null>(null);
  
  // 从路由状态获取数量和选中的SKU
  const { quantity = 1, selectedSku = null } = location.state || {};

  // 获取商品详情
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      if (!id) return null;
      return await getProductDetail({ 
        productId: Number(id), 
        productCode: '' 
      });
    },
  });

  // 添加 console.log 来调试
  console.log('authData:', authData);

  // 获取用户地址列表
  const { data: userAddressList, isLoading: addressLoading, refetch: refetchAddresses } = useQuery<
    UserAddress[],  // 修改返回类型为 UserAddress 数组
    Error
  >({
    queryKey: ['userAddresses'],
    queryFn: async () => {
      const response = await getUserAddressList({
        userId: -1
      });
      console.log('Raw API response:', response); // 打印原始响应
      return response; // API 直接返回地址数组
    },
    staleTime: 1000 * 60 * 5,
  });

  // 使用 useEffect 处理数据变化
  useEffect(() => {
    if (userAddressList && userAddressList.length > 0) {
      setAddresses(userAddressList);
      // 如果有默认地址，自动选中默认地址，否则选择第一个地址
      const defaultAddress = userAddressList.find(
        (addr: UserAddress) => addr.isDefault === 1
      );
      setSelectedAddress(defaultAddress ? defaultAddress.id : userAddressList[0].id);
    }
  }, [userAddressList]);

  // 对地址列表进行排序，默认地址排在最前面
  const sortedAddresses = [...addresses].sort((a, b) => {
    if (a.isDefault === 1 && b.isDefault !== 1) return -1;
    if (a.isDefault !== 1 && b.isDefault === 1) return 1;
    return 0;
  });

  // 编辑地址
  const handleEditAddress = (address: UserAddress) => {
    setEditingAddress(address);
    setAddressFormVisible(true);
  };

  // 删除地址
  const handleDeleteAddress = async (addressId: number) => {
    try {
      await deleteAddress(addressId);
      message.success('删除地址成功');
      refetchAddresses();
    } catch (error) {
      message.error('删除地址失败');
    }
  };

  // 计算订单总价
  const calculateTotal = () => {
    if (!product) return 0;
    const price = selectedSku ? selectedSku.price : product.productSpu.realPrice;
    return price * quantity;
  };

  // 提交订单
  const handleSubmit = async () => {
    try {
      await form.validateFields();
      
      if (!authData.address) {
        message.error('请先连接钱包');
        return;
      }
      
      if (!selectedAddress) {
        message.error('请选择收货地址');
        return;
      }
      
      setSubmitting(true);
      
      // 构建订单数据
      const orderData = {
        productId: Number(id),
        skuId: selectedSku ? selectedSku.id : null,
        quantity,
        addressId: selectedAddress.toString(),
        remark: form.getFieldValue('remark') || '',
        paymentMethod: form.getFieldValue('paymentMethod') || 'wallet'
      };
      
      // 调用API提交订单
      const result = await submitOrder(orderData);
      
      if (result.success) {
        message.success('兑换成功！');
        // 跳转到订单详情或成功页面
        navigate('/mall/order/success', { 
          state: { 
            orderId: result.orderId,
            product: product
          } 
        });
      } else {
        message.error(result.message || '兑换失败，请重试');
      }
    } catch (error) {
      console.error('提交订单失败:', error);
      message.error('提交订单失败，请检查表单信息');
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spin size="large" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.errorContainer}>
        <Text type="danger">商品信息加载失败，请返回重试</Text>
        <Button type="primary" onClick={() => navigate(-1)}>返回</Button>
      </div>
    );
  }

  return (
    <div className={styles.exchangeContainer}>
      <Title level={4} className={styles.pageTitle}>确认兑换</Title>
      
      {/* 收货地址卡片 */}
      <Card 
        className={styles.addressCard} 
        title={
          <div className={styles.cardTitle}>
            <EnvironmentOutlined /> 收货地址
          </div>
        }
        extra={
          <Button 
            type="link" 
            onClick={() => {
              setEditingAddress(null);
              setAddressFormVisible(true);
            }}
            icon={<PlusOutlined />}
          >
            添加新地址
          </Button>
        }
        loading={addressLoading}
      >
        <div className={styles.addressGroup}>
          {sortedAddresses.map(addr => (
            <div 
              key={addr.id}
              className={`${styles.addressItem} ${selectedAddress === addr.id ? styles.selected : ''}`}
              onClick={() => setSelectedAddress(addr.id)}
              data-default={addr.isDefault === 1}
            >
              <div className={styles.addressContent}>
                <div className={styles.addressInfo}>
                  {addr.isDefault === 1 && (
                    <span className={styles.defaultTag}>默认地址</span>
                  )}
                  <span className={styles.name}>{addr.reciverName}</span>
                  <span className={styles.phone}>{addr.reciverPhone}</span>
                  <span className={styles.addressDetail}>
                    {addr.provinceName} {addr.cityName} {addr.districtName} {addr.streetName} {addr.houseAddress}
                  </span>
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
                  <Button 
                    type="link" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteAddress(addr.id);
                    }}
                  >
                    删除
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
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
          refetchAddresses();
        }}
        initialValues={editingAddress}
        title={editingAddress ? '编辑收货地址' : '添加收货地址'}
      />
      
      {/* 商品信息 */}
      <Card className={styles.productCard} title="商品信息">
        <div className={styles.productItem}>
          <img 
            src={product.productSpu.images[0]} 
            alt={product.productSpu.name} 
            className={styles.productImage} 
          />
          <div className={styles.productInfo}>
            <div className={styles.productName}>{product.productSpu.name}</div>
            {selectedSku && (
              <div className={styles.productSpecs}>
                规格：{selectedSku.specs}
              </div>
            )}
            <div className={styles.productPrice}>
              <span className={styles.price}>¥{selectedSku ? selectedSku.price.toFixed(2) : product.productSpu.realPrice.toFixed(2)}</span>
              <span className={styles.quantity}>x {quantity}</span>
            </div>
          </div>
        </div>
      </Card>
      
      {/* 订单信息 */}
      <Card className={styles.orderCard} title="订单信息">
        <Form form={form} layout="vertical">
          <Form.Item name="remark" label="订单备注">
            <Input.TextArea 
              placeholder="请输入备注信息（选填）" 
              rows={3} 
              maxLength={100} 
              showCount 
            />
          </Form.Item>
          
          <Form.Item name="paymentMethod" label="支付方式" initialValue="wallet">
            <Radio.Group className={styles.paymentGroup}>
              <Radio.Button value="wallet" className={styles.paymentOption}>
                <div className={styles.paymentContent}>
                  <img src="/wallet-icon.svg" alt="钱包支付" className={styles.paymentIcon} />
                  <div>
                    <div className={styles.paymentTitle}>钱包支付</div>
                    <div className={styles.paymentDesc}>使用Web3钱包支付</div>
                  </div>
                </div>
              </Radio.Button>
              <Radio.Button value="balance" className={styles.paymentOption}>
                <div className={styles.paymentContent}>
                  <img src="/balance-icon.svg" alt="余额支付" className={styles.paymentIcon} />
                  <div>
                    <div className={styles.paymentTitle}>余额支付</div>
                    <div className={styles.paymentDesc}>使用账户余额支付</div>
                  </div>
                </div>
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Form>
        
        <Divider />
        
        <div className={styles.orderSummary}>
          <div className={styles.summaryItem}>
            <span>商品总额</span>
            <span>¥{calculateTotal().toFixed(2)}</span>
          </div>
          <div className={styles.summaryItem}>
            <span>运费</span>
            <span>免运费</span>
          </div>
          <div className={styles.totalItem}>
            <span>应付总额：</span>
            <span className={styles.totalPrice}>{calculateTotal().toFixed(2)}</span>
          </div>
        </div>
      </Card>
      
      {/* 底部操作栏 */}
      <div className={styles.bottomBar}>
        <div className={styles.totalSection}>
          <span className={styles.totalLabel}>应付总额：</span>
          <span className={styles.totalAmount}>{calculateTotal().toFixed(2)}</span>
        </div>
        <Button 
          type="primary" 
          size="large" 
          className={styles.submitButton}
          onClick={handleSubmit}
          loading={submitting}
          disabled={!authData.address}
        >
          提交订单
        </Button>
      </div>
    </div>
  );
};

export default OrderConfirm;