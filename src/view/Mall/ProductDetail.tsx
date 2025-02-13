import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Breadcrumb,
  Card,
  Row,
  Col,
  Image,
  Tag,
  Button,
  InputNumber,
  Descriptions,
  Divider,
  message,
  Tabs,
  Carousel,
  Rate,
  List,
  Space,
  Avatar
} from 'antd';
import {
  ShoppingCartOutlined,
  HeartOutlined,
  HeartFilled,
  ShareAltOutlined,
  HomeOutlined,
  RightOutlined,
  ShoppingOutlined,
  ZoomInOutlined,
  FireOutlined,
  LeftOutlined,
  SafetyOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { products, categories } from '../../api/mockDatas';
import styles from './ProductDetail.module.scss';
import type { TabsProps } from 'antd';
import ProductCard from '../../components/ProductCardComents';

// 在文件顶部添加 Product 接口定义
interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;      // 主图
  images?: string[];  // 商品轮播图集合
  detailImages?: string[]; // 详情图片集合
  category: string;
  subCategory?: string;
  thirdCategory?: string;
  tags: string[];
  stock: number;
  sold: number;
  description: string;
  specifications?: {
    [key: string]: string;
  };
}

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isCollected, setIsCollected] = useState(false); // 添加收藏状态
  const [currentImage, setCurrentImage] = useState(0);
  const [showZoom, setShowZoom] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  // 查找商品信息并指定类型
  const product = products.find(p => p.id === Number(id)) as Product | undefined;

  // 查找商品所属分类信息
  const category = categories.find(c => c.key === product?.category);
  const subCategory = category?.children?.find(sc => sc.key === product?.subCategory);
  const thirdCategory = subCategory?.children?.find(tc => tc.key === product?.thirdCategory);

  // 获取推荐商品（同一级分类下的其他商品）
  const recommendedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 8); // 最多显示8个推荐商品
  }, [product]);

  // 辅助函数：格式化以太坊地址
  const formatEthAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // 示例评价数据
  const reviews = [
    {
      id: 1,
      user: {
        address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
        avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=1"
      },
      rating: 5,
      date: "2024-03-15",
      content: "商品质量非常好，包装也很完整，物流速度快，很满意的一次购物体验！",
      images: [
        "https://picsum.photos/400/400?random=1",
        "https://picsum.photos/400/400?random=2",
        "https://picsum.photos/400/400?random=3"
      ],
      specs: "规格：标准版 | 颜色：深空灰"
    },
    {
      id: 2,
      user: {
        address: "0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF",
        avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=2"
      },
      rating: 4,
      date: "2024-03-14",
      content: "商品不错，性价比很高，就是发货稍微有点慢。整体来说还是很满意的购物体验，会继续关注店铺的其他商品。",
      images: [],
      specs: "规格：豪华版 | 颜色：银色"
    },
    {
      id: 3,
      user: {
        address: "0x8d3B5AD5c4795c026514f8317c7a215E218DcCD6",
        avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=3"
      },
      rating: 5,
      date: "2024-03-13",
      content: "第二次购买了，一如既往的好，客服态度也很好，发货速度快，物流给力！",
      images: [
        "https://picsum.photos/400/400?random=4"
      ],
      specs: "规格：标准版 | 颜色：银色"
    }
  ];

  const tabItems: TabsProps['items'] = [
    {
      key: 'detail',
      label: '商品介绍',
      children: (
        <div className={styles.detailContent}>
          {/* 商品参数 */}
          <div className={styles.parameters}>
            <h3>规格参数</h3>
            <ul className={styles.parameterList}>
              {product?.specifications && Object.entries(product.specifications).map(([key, value]) => (
                <li key={key}>
                  <span className={styles.paramKey}>{key}：</span>
                  <span className={styles.paramValue}>{value}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* 商品详情图片 */}
          <div className={styles.detailImages}>
            {product?.detailImages?.map((image, index) => (
              <img key={index} src={image} alt={`详情图${index + 1}`} />
            ))}
          </div>
        </div>
      ),
    },
    {
      key: 'specs',
      label: '规格与包装',
      children: (
        <div className={styles.specsContent}>
          <div className={styles.specSection}>
            <h3>主体</h3>
            <table className={styles.specTable}>
              <tbody>
                <tr>
                  <td className={styles.specLabel}>品牌</td>
                  <td>示例品牌</td>
                  <td className={styles.specLabel}>型号</td>
                  <td>XX-123</td>
                </tr>
                {/* 添加更多规格行 */}
              </tbody>
            </table>
          </div>
          
          <div className={styles.packageInfo}>
            <h3>包装清单</h3>
            <p>商品 x 1、说明书 x 1、保修卡 x 1</p>
          </div>
        </div>
      ),
    },
    {
      key: 'service',
      label: '售后保障',
      children: (
        <div className={styles.serviceContent}>
          <div className={styles.serviceItem}>
            <h4><SafetyOutlined /> 厂家服务</h4>
            <p>本产品全国联保，享受三包服务</p>
          </div>
          
          <div className={styles.serviceItem}>
            <h4><CheckCircleOutlined /> 正品保证</h4>
            <p>商城向您保证所售商品均为正品行货</p>
          </div>
          
          <div className={styles.guaranteeInfo}>
            <h4>权益保障</h4>
            <ul>
              <li>商品自签收后7天内可申请无理由退换货</li>
              <li>在线支付购买商品，支持7天无理由退换货</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      key: 'reviews',
      label: (
        <span className={styles.reviewsTab}>
          商品评价
          <span className={styles.reviewCount}>({reviews.length})</span>
        </span>
      ),
      children: (
        <div className={styles.reviewsContent}>
          <div className={styles.reviewsSummary}>
            <div className={styles.overallRating}>
              <div className={styles.ratingScore}>4.8</div>
              <div className={styles.ratingStars}>
                <Rate disabled defaultValue={4.8} allowHalf />
                <div className={styles.ratingCount}>
                  共 <span>{reviews.length}</span> 条评价
                </div>
              </div>
            </div>
            <div className={styles.ratingTags}>
              <Tag color="volcano">全部 (24)</Tag>
              <Tag>好评 (20)</Tag>
              <Tag>有图 (12)</Tag>
              <Tag>追评 (5)</Tag>
            </div>
          </div>

          <List
            className={styles.reviewsList}
            itemLayout="vertical"
            dataSource={reviews}
            renderItem={review => (
              <List.Item className={styles.reviewItem}>
                <div className={styles.reviewHeader}>
                  <div className={styles.userInfo}>
                    <Avatar src={review.user.avatar} size={40} />
                    <div className={styles.userMeta}>
                      <span className={styles.userName}>
                        {formatEthAddress(review.user.address)}
                      </span>
                      <Rate disabled defaultValue={review.rating} />
                    </div>
                  </div>
                  <div className={styles.reviewDate}>{review.date}</div>
                </div>
                <div className={styles.reviewSpecs}>{review.specs}</div>
                <div className={styles.reviewContent}>{review.content}</div>
                {review.images.length > 0 && (
                  <div className={styles.reviewImages}>
                    <Image.PreviewGroup>
                      {review.images.map((image, index) => (
                        <Image
                          key={index}
                          src={image}
                          width={100}
                          height={100}
                          className={styles.reviewImage}
                        />
                      ))}
                    </Image.PreviewGroup>
                  </div>
                )}
              </List.Item>
            )}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (!product) {
      message.error('商品不存在');
      navigate('/mall');
    }
  }, [product, navigate]);

  if (!product) return null;

  const handleAddToCart = () => {
    message.success('已加入购物车');
  };

  const handleBuyNow = () => {
    navigate(`/mall/exchange/${product.id}`);
  };

  const handleCategoryClick = (categoryKey: string) => {
    navigate(`/mall?category=${categoryKey}`);
  };

  // 处理收藏点击
  const handleCollect = () => {
    setIsCollected(!isCollected);
    message.success(isCollected ? '已取消收藏' : '收藏成功');
  };

  // 处理分享点击
  const handleShare = () => {
    message.success('分享链接已复制到剪贴板');
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (imageRef.current) {
      const { left, top, width, height } = imageRef.current.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setMousePosition({ x, y });
    }
  };

  return (
    <div className={styles.container}>
      {/* 面包屑导航 */}
      <Breadcrumb className={styles.breadcrumb}>
        <Breadcrumb.Item onClick={() => navigate('/mall')} className={styles.breadcrumbItem}>
          <HomeOutlined /> 商城首页
        </Breadcrumb.Item>
        {category && (
          <Breadcrumb.Item
            onClick={() => handleCategoryClick(category.key)}
            className={styles.breadcrumbItem}
          >
            {category.title}
          </Breadcrumb.Item>
        )}
        {subCategory && (
          <Breadcrumb.Item
            onClick={() => handleCategoryClick(subCategory.key)}
            className={styles.breadcrumbItem}
          >
            {subCategory.title}
          </Breadcrumb.Item>
        )}
        {thirdCategory && (
          <Breadcrumb.Item
            onClick={() => handleCategoryClick(thirdCategory.key)}
            className={styles.breadcrumbItem}
          >
            {thirdCategory.title}
          </Breadcrumb.Item>
        )}
        <Breadcrumb.Item>{product.name}</Breadcrumb.Item>
      </Breadcrumb>

      {/* 商品主信息 */}
      <div className={styles.mainContent}>
        <Row gutter={40}>
          {/* 左侧商品图片 */}
          <Col span={10}>
            <div className={styles.imageWrapper}>
              <div 
                className={styles.mainImageContainer}
                onMouseEnter={() => setShowZoom(true)}
                onMouseLeave={() => setShowZoom(false)}
                onMouseMove={handleMouseMove}
                ref={imageRef}
              >
                <div className={styles.imageBox}>
                  <Image
                    src={product?.images?.[currentImage] || product?.image}
                    alt={`${product?.name}-main`}
                    className={styles.mainImage}
                    preview={false}
                  />
                </div>
                {showZoom && (
                  <div className={styles.zoomContainer}>
                    <div 
                      className={styles.zoomImage}
                      style={{
                        backgroundImage: `url(${product?.images?.[currentImage] || product?.image})`,
                        backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`
                      }}
                    />
                  </div>
                )}
              </div>
              
              <div className={styles.thumbnailContainer}>
                <Button 
                  className={styles.navButton} 
                  icon={<LeftOutlined />}
                  onClick={() => {
                    const container = document.querySelector(`.${styles.thumbnailScroll}`);
                    if (container) {
                      container.scrollLeft -= 80;
                    }
                  }}
                />
                <div className={styles.thumbnailScroll}>
                  {product?.images?.map((image, index) => (
                    <div
                      key={index}
                      className={`${styles.thumbnail} ${currentImage === index ? styles.active : ''}`}
                      onClick={() => setCurrentImage(index)}
                    >
                      <Image
                        src={image}
                        alt={`${product?.name}-${index}`}
                        preview={false}
                      />
                    </div>
                  ))}
                </div>
                <Button 
                  className={styles.navButton} 
                  icon={<RightOutlined />}
                  onClick={() => {
                    const container = document.querySelector(`.${styles.thumbnailScroll}`);
                    if (container) {
                      container.scrollLeft += 80;
                    }
                  }}
                />
              </div>
            </div>
          </Col>
          
          {/* 右侧商品信息 */}
          <Col span={14}>
            <div className={styles.productInfo}>
              <div className={styles.titleRow}>
                <h1 className={styles.title}>{product?.name}</h1>
                <div className={styles.tags}>
                  {product?.tags.map(tag => (
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

              <div className={styles.summary}>
                {product?.description}
              </div>

              <div className={styles.priceBlock}>
                <div className={styles.priceRow}>
                  <span className={styles.priceLabel}>积分价</span>
                  <span className={styles.price}>
                    <span className={styles.symbol}>¥</span>
                    {product?.price}
                  </span>
                  {product?.originalPrice && (
                    <span className={styles.originalPrice}>
                      ¥{product.originalPrice}
                    </span>
                  )}
                </div>
                
                <div className={styles.promotionInfo}>
                  <span className={styles.promotionLabel}>优惠</span>
                  <div className={styles.promotions}>
                    <Tag color="red">限时特惠</Tag>
                    <Tag color="orange">积分商品</Tag>
                  </div>
                </div>
              </div>

              <div className={styles.servicePromise}>
                <div className={styles.promiseItem}>
                  <CheckCircleOutlined />
                  <span>企业认证</span>
                </div>
                <div className={styles.promiseItem}>
                  <SafetyOutlined />
                  <span>正品保障</span>
                </div>
                {/* 添加更多服务承诺 */}
              </div>

              <div className={styles.specifications}>
                {/* ... existing specifications ... */}
              </div>

              <div className={styles.purchaseSection}>
                <div className={styles.quantity}>
                  <span className={styles.quantityLabel}>数量</span>
                  <InputNumber
                    min={1}
                    max={product?.stock}
                    value={quantity}
                    onChange={(value) => setQuantity(value || 1)}
                  />
                </div>

                <div className={styles.actionButtons}>
                  <Space direction="horizontal" size={40}>
                    <Button
                      type="primary"
                      size="middle"
                      icon={<ShoppingCartOutlined />}
                      onClick={() => navigate(`/mall/exchange/${product?.id}`)}
                      className={styles.exchangeButton}
                    >
                      立即兑换
                    </Button>

                    <Button
                      type="text"
                      size="middle"
                      icon={isCollected ? <HeartFilled className={styles.collected} /> : <HeartOutlined />}
                      onClick={handleCollect}
                      className={styles.iconButton}
                    />

                    <Button
                      type="text"
                      size="middle"
                      icon={<ShareAltOutlined />}
                      onClick={handleShare}
                      className={styles.iconButton}
                    />
                  </Space>

                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* 商品详细信息Tabs */}
      <Card className={styles.detailsCard}>
        <Tabs defaultActiveKey="detail" items={tabItems} />
      </Card>

      {/* 推荐商品 */}
      <Card
        title={
          <div className={styles.recommendTitle}>
            <span>推荐商品</span>
            <span className={styles.recommendCount}>
              共 {recommendedProducts.length} 件商品
            </span>
          </div>
        }
        className={styles.recommendCard}
      >
        <Row gutter={[16, 16]}>
          {recommendedProducts.map(product => (
            <Col xs={12} sm={8} md={6} key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  );
};

export default ProductDetail;
