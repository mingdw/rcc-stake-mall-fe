import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Card, Row, Col, Typography, Button, Form, Input, Radio, Space, Divider, message, Spin } from 'antd';
import { ShoppingCartOutlined, EnvironmentOutlined, UserOutlined, PhoneOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { getProductDetail, submitOrder } from '../../api/apiService';
import styles from './OrderConfirm.module.scss';
import { useAuth } from '../../context/AuthContext';

const { Title, Text } = Typography;

const OrderConfirm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { authData } = useAuth();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  
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

  // 模拟地址数据，实际应从API获取
  const addresses = [
    { id: '1', name: '张三', phone: '13800138000', address: '北京市朝阳区某某街道1号楼', isDefault: true },
    { id: '2', name: '李四', phone: '13900139000', address: '上海市浦东新区某某路2号', isDefault: false },
  ];

  useEffect(() => {
    // 设置默认选中的地址
    const defaultAddress = addresses.find(addr => addr.isDefault);
    if (defaultAddress) {
      setSelectedAddress(defaultAddress.id);
    }
  }, []);

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
        addressId: selectedAddress,
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
      
      {/* 收货地址 */}
      <Card className={styles.addressCard} title="收货地址">
        <Radio.Group 
          value={selectedAddress} 
          onChange={(e) => setSelectedAddress(e.target.value)}
          className={styles.addressGroup}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            {addresses.map(addr => (
              <Radio key={addr.id} value={addr.id} className={styles.addressItem}>
                <div className={styles.addressContent}>
                  <div className={styles.addressHeader}>
                    <span className={styles.addressName}>{addr.name}</span>
                    <span className={styles.addressPhone}>{addr.phone}</span>
                    {addr.isDefault && <span className={styles.defaultTag}>默认</span>}
                  </div>
                  <div className={styles.addressDetail}>
                    <EnvironmentOutlined className={styles.addressIcon} />
                    {addr.address}
                  </div>
                </div>
              </Radio>
            ))}
          </Space>
        </Radio.Group>
        <Button type="link" className={styles.addAddressBtn}>+ 添加新地址</Button>
      </Card>
      
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