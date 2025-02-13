import React from 'react';
import { Card, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FireOutlined } from '@ant-design/icons';
import styles from './ProductCard.module.scss';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  tags: string[];
  sold: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      cover={<img alt={product.name} src={product.image} />}
      onClick={() => navigate(`/mall/product/${product.id}`)}
      className={styles.productCard}
    >
      <Card.Meta
        title={product.name}
        description={
          <div className={styles.productInfo}>
            <div className={styles.price}>
              <span className={styles.currency}>¥</span>
              <span className={styles.amount}>{product.price}</span>
              {product.originalPrice && (
                <span className={styles.originalPrice}>
                  ¥{product.originalPrice}
                </span>
              )}
            </div>
            <div className={styles.tags}>
              {product.tags.map(tag => (
                <Tag key={tag} color={tag === '热销' ? 'red' : 'blue'}>
                  {tag === '热销' && <FireOutlined />} {tag}
                </Tag>
              ))}
            </div>
            <div className={styles.sold}>
              已售 {product.sold}
            </div>
          </div>
        }
      />
    </Card>
  );
};

export default ProductCard;
