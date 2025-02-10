import React, { useState } from 'react';
import { Card, Row, Col, Button, Tag, InputNumber, Modal, Descriptions, message } from 'antd';
import { ShoppingCartOutlined, GiftOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import styles from './ProductExchange.module.scss';

interface ProductDetail {
  id: number;
  name: string;
  points: number;
  price: number;
  image: string;
  stock: number;
  description: string;
  details: string;
  specifications: {
    [key: string]: string;
  };
}

const ProductExchangePage: React.FC = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  // 模拟商品数据
  const product: ProductDetail = {
    id: 1,
    name: "限量版纪念T恤",
    points: 1000,
    price: 199,
    image: "https://example.com/tshirt.jpg",
    stock: 100,
    description: "独特设计的限量版T恤",
    details: "商品详细描述...",
    specifications: {
      "尺寸": "M/L/XL",
      "材质": "纯棉",
      "颜色": "黑色/白色",
    }
  };

  // 用户积分（实际应从API获取）
  const userPoints = 3000;

  const handleExchange = () => {
    const totalPoints = product.points * quantity;
    if (totalPoints > userPoints) {
      message.error('积分不足！');
      return;
    }
    setShowConfirm(true);
  };

  const confirmExchange = () => {
    // 这里添加实际的兑换逻辑
    message.success('兑换成功！');
    setShowConfirm(false);
  };

  return (
    <div className={styles.container}>
      {/* 顶部用户积分信息 */}
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <GiftOutlined /> 我的积分：<span className={styles.points}>{userPoints}</span>
        </div>
      </div>

      {/* 商品详情 */}
      <Row gutter={24}>
        {/* 商品图片 */}
        <Col xs={24} md={12}>
          <Card bordered={false}>
            <img src={product.image} alt={product.name} className={styles.productImage} />
          </Card>
        </Col>

        {/* 商品信息和兑换操作 */}
        <Col xs={24} md={12}>
          <Card bordered={false}>
            <h1 className={styles.productName}>{product.name}</h1>
            <div className={styles.priceInfo}>
              <Tag color="blue" className={styles.pointsTag}>
                {product.points} 积分
              </Tag>
              {product.price > 0 && (
                <Tag color="green">¥{product.price}</Tag>
              )}
            </div>

            <div className={styles.description}>
              {product.description}
            </div>

            <div className={styles.exchangeArea}>
              <div className={styles.quantity}>
                <span>兑换数量：</span>
                <InputNumber
                  min={1}
                  max={product.stock}
                  value={quantity}
                  onChange={(value) => setQuantity(value || 1)}
                />
                <span className={styles.stock}>库存：{product.stock}</span>
              </div>

              <div className={styles.totalPoints}>
                所需积分：<span>{product.points * quantity}</span>
              </div>

              <Button 
                type="primary" 
                size="large"
                icon={<ShoppingCartOutlined />}
                onClick={handleExchange}
                disabled={product.stock <= 0}
                block
              >
                立即兑换
              </Button>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 商品详细信息 */}
      <Card title="商品详情" className={styles.detailsCard}>
        <Descriptions bordered column={1}>
          {Object.entries(product.specifications).map(([key, value]) => (
            <Descriptions.Item key={key} label={key}>{value}</Descriptions.Item>
          ))}
        </Descriptions>
        <div className={styles.details}>
          {product.details}
        </div>
      </Card>

      {/* 兑换确认弹窗 */}
      <Modal
        title="确认兑换"
        visible={showConfirm}
        onOk={confirmExchange}
        onCancel={() => setShowConfirm(false)}
      >
        <p>您确定要使用 {product.points * quantity} 积分兑换 {quantity} 个{product.name}吗？</p>
      </Modal>
    </div>
  );
};

export default ProductExchangePage;
