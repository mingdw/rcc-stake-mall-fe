import React from 'react';
import { Card, Tag, Tooltip, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ShoppingCartOutlined, FireOutlined } from '@ant-design/icons';
import styles from './ProductCard.module.scss';
import { Product } from '../api/apiService';

interface ProductCardProps {
  product: Product;
  showExchangeButton?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product,
  showExchangeButton = false,
  onClick
}) => {
  const navigate = useNavigate();

  // 处理基础属性值，最多显示4个
  const renderBasicAttrValues = () => {
    if (!product.attributes?.basicAttrs) return [];
    
    try {
      const basicAttrs = typeof product.attributes.basicAttrs === 'string' 
        ? JSON.parse(product.attributes.basicAttrs)
        : product.attributes.basicAttrs;
      const attrValues = Object.values(basicAttrs);
      return attrValues.slice(0, 4);
    } catch (error) {
      console.error('Failed to parse basicAttrs:', error);
      return [];
    }
  };

  const basicAttrValues = renderBasicAttrValues();
  const hasMoreAttrs = basicAttrValues.length > 4;

  // 获取最佳展示价格
  const getBestPrice = () => {
    if (product.skuList && product.skuList.length > 0) {
      // 找出销量最高的SKU
      const bestSellingSku = product.skuList.reduce((prev, current) => 
        (prev.saleCount > current.saleCount) ? prev : current
      );
      return bestSellingSku.price;
    }
    // 如果没有SKU，返回SPU的价格
    return product.realPrice || product.price;
  };

  // 获取原始价格
  const getOriginalPrice = () => {
    if (product.skuList && product.skuList.length > 0) {
      const bestSellingSku = product.skuList.reduce((prev, current) => 
        (prev.saleCount > current.saleCount) ? prev : current
      );
      return bestSellingSku.price > product.price ? bestSellingSku.price : product.price;
    }
    return product.realPrice > product.price ? product.realPrice : null;
  };

  const displayPrice = getBestPrice();
  const originalPrice = getOriginalPrice();

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick(e);
    } else {
      navigate(`/mall/product/${product.id}`);
    }
  };

  return (
    <Card
      hoverable
      className={styles.productCard}
      onClick={handleClick}
      cover={
        <div className={styles.imageWrapper}>
          <img 
            alt={product.name} 
            src={product.images[0]} 
            onError={(e) => {
              (e.target as HTMLImageElement).src = '../../../public/vite.svg';
            }}
          />
          {product.totalSales > 100 && (
            <div className={styles.hotTag}>
              <FireOutlined /> 热销
            </div>
          )}
        </div>
      }
      actions={showExchangeButton ? [
        <Button 
          type="primary" 
          className={styles.exchangeButton}
          disabled={product.totalStock === 0}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/mall/product/${product.id}`);
          }}
        >
          <ShoppingCartOutlined />
          {product.totalStock === 0 ? '暂时售罄' : '立即兑换'}
        </Button>
      ] : undefined}
    >
      <div className={styles.productContent}>
        <Tooltip title={product.name}>
          <div className={styles.productTitle}>{product.name}</div>
        </Tooltip>

        <Tooltip title={product.description}>
          <div className={styles.description}>
            {product.description}
          </div>
        </Tooltip>

        <div className={styles.priceStatisticsRow}>
          <div className={styles.priceInfo}>
            <span className={styles.currency}>¥</span>
            <span className={styles.currentPrice}>{displayPrice}</span>
            {originalPrice && originalPrice > displayPrice && (
              <span className={styles.originalPrice}>
                ¥{originalPrice}
              </span>
            )}
          </div>
          <div className={styles.statistics}>
            <span>库存 {product.totalStock}</span>
            <div className={styles.divider} />
            <span>已售 {product.totalSales}</span>
          </div>
        </div>

        <div className={styles.tags}>
          {basicAttrValues.map((value, index) => (
            <Tag key={index} className={styles.tag}>
              {value as string}
            </Tag>
          ))}
          {hasMoreAttrs && (
            <Tooltip 
              title={Object.values(typeof product.attributes.basicAttrs === 'string' 
                ? JSON.parse(product.attributes.basicAttrs)
                : product.attributes.basicAttrs)
                .slice(4)
                .join(', ')}
            >
              <Tag className={`${styles.tag} ${styles.moreTag}`}>...</Tag>
            </Tooltip>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
