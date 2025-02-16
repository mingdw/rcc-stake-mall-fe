import React from 'react';
import { Card, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FireOutlined } from '@ant-design/icons';
import styles from './ProductCard.module.scss';
import { Product } from '../api/mockDatas';

interface ProductCardProps {
  product: Product;
  showExchangeButton?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product,
  showExchangeButton = false
}) => {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      cover={
        <div className={styles.imageWrapper}>
          <img 
            alt={product.name} 
            src={product.images[0]}
          />
        </div>
      }
      onClick={() => navigate(`/mall/product/${product.id}`)}
      className={styles.productCard}
    >
      <div className={styles.content}>
        <h3 className={styles.title}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.priceStatisticsRow}>
          <div className={styles.priceInfo}>
            <span className={styles.currency}>¥</span>
            <span className={styles.currentPrice}>{product.price}</span>
            {product.originalPrice && (
              <span className={styles.originalPrice}>
                ¥{product.originalPrice}
              </span>
            )}
          </div>
          <div className={styles.statistics}>
            <span>库存: {product.stock}</span>
            <span className={styles.divider}></span>
            <span>已售: {product.sold}</span>
          </div>
        </div>
        <div className={styles.tags}>
          {product.tags.map(tag => (
            <Tag 
              key={tag} 
              color={tag === '热销' ? 'red' : 'blue'}
              className={styles.tag}
            >
              {tag === '热销' && <FireOutlined />} {tag}
            </Tag>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
