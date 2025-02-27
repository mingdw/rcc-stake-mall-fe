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
  message,
  Tabs,
  Rate,
  List,
  Space,
  Avatar,
  Spin
} from 'antd';
import {
  ShoppingCartOutlined,
  HeartOutlined,
  HeartFilled,
  ShareAltOutlined,
  HomeOutlined,
  RightOutlined,
  LeftOutlined,
  SafetyOutlined,
  CheckCircleOutlined,
  FireOutlined
} from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { 
  CategoryResponse, 
  getProductDetail, 
  getCategoryList,
  getProductList,
  type ProductDetail,
  type Product,
} from '../../api/apiService';

import styles from './ProductDetail.module.scss';
import type { TabsProps } from 'antd';
import ProductCard from '../../components/ProductCard';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isCollected, setIsCollected] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [showZoom, setShowZoom] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  // 获取商品详情
  const { 
    data: product,
    isLoading: productLoading,
    error: productError
  } = useQuery<ProductDetail | null>({
    queryKey: ['product', id],
    queryFn: () => getProductDetail({ productId: Number(id), productCode: '' }),
    enabled: !!id,
  });

  // 获取分类列表
  const { data: categories = [] } = useQuery<CategoryResponse[]>({
    queryKey: ['categories'],
    queryFn: () => getCategoryList(),
  });

  // 查找分类信息
  const categoryInfo = useMemo(() => {
    if (!product || !categories.length) return {
      category1: null,
      category2: null,
      category3: null
    };

    const category1 = categories.find(c => c.id === product.category1Id);
    const category2 = category1?.children?.find(c => c.id === product.category2Id);
    const category3 = category2?.children?.find(c => c.id === product.category3Id);

    return {
      category1,
      category2,
      category3
    };
  }, [product, categories]);

  // 获取相关商品
  const { data: relatedProducts = [] } = useQuery<Product[]>({
    queryKey: ['relatedProducts', product?.category3Code],
    queryFn: () => getProductList({
      page: 1,
      pageSize: 4,
      categoryCodes: product?.category1Code || '',
      productName: '',
    }).then(res => {
      // 从返回的分类中找到对应的商品列表
      const categoryProducts = res.categories.find(
        cat => cat.categoryCode === product?.category1Code
      );
      return categoryProducts?.products || [];
    }),
    enabled: !!product?.category3Code,  
  });

  // 获取同类商品总数
  const categoryProductsCount = useMemo(() => {
    if (!product) return 0;
    return relatedProducts.length;
  }, [relatedProducts]);

  // 处理加载状态
  if (productLoading) {
    return <Spin size="large" className={styles.loading} />;
  }

  // 处理错误状态
  useEffect(() => {
    if (productError) {
      message.error('商品不存在或已下架');
      navigate('/mall');
    }
  }, [productError, navigate]);

  // 如果没有商品数据，返回null
  if (!product) return null;

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
            <h3>基本参数</h3>
            <ul className={styles.parameterList}>
              {product?.basicAttrs && Object.entries(product.basicAttrs).map(([key, value]) => (
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
            <h3>销售属性</h3>
            <table className={styles.specTable}>
              <tbody>
                {product?.saleAttrs && Object.entries(product.saleAttrs).map(([key, value]) => (
                  <tr key={key}>
                    <td className={styles.specLabel}>{key}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className={styles.specSection}>
            <h3>规格参数</h3>
            <table className={styles.specTable}>
              <tbody>
                {product?.specAttrs && Object.entries(product.specAttrs).map(([key, value]) => (
                  <tr key={key}>
                    <td className={styles.specLabel}>{key}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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

  const handleAddToCart = () => {
    message.success('已加入购物车');
  };

  const handleBuyNow = () => {
    navigate(`/mall/exchange/${product.id}`);
  };

  const handleCategoryClick = (categoryCode: string) => {
    navigate(`/mall?category=${categoryCode}`);
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

  // 使用商品的images数组
  const productImages = product?.images || [];

  // 规格展示部分的更新
  const renderSpecifications = () => {
    if (!product?.saleAttrs) return null;
    
    return (
      <div className={styles.specifications}>
        {Object.entries(product.saleAttrs).map(([key, value]) => (
          <div key={key} className={styles.specItem}>
            <span className={styles.specLabel}>{key}：</span>
            <span className={styles.specValue}>{value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {/* 面包屑导航 */}
      <Breadcrumb className={styles.breadcrumb}>
        <Breadcrumb.Item onClick={() => navigate('/mall')}>
          <HomeOutlined /> 商城首页
        </Breadcrumb.Item>
        {categoryInfo.category1 && (
          <Breadcrumb.Item 
            onClick={() => handleCategoryClick(categoryInfo.category1?.code || '')}
            className={styles.breadcrumbLink}
          >
            {categoryInfo.category1.name}
          </Breadcrumb.Item>
        )}
        {categoryInfo.category2 && (
          <Breadcrumb.Item 
            onClick={() => handleCategoryClick(categoryInfo.category2?.code || '')}
            className={styles.breadcrumbLink}
          >
            {categoryInfo.category2.name}
          </Breadcrumb.Item>
        )}
        {categoryInfo.category3 && (
          <Breadcrumb.Item 
            onClick={() => handleCategoryClick(categoryInfo.category3?.code || '')}
            className={styles.breadcrumbLink}
          >
            {categoryInfo.category3.name}
          </Breadcrumb.Item>
        )}
        <Breadcrumb.Item>{product?.name}</Breadcrumb.Item>
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
                    src={productImages[currentImage]}
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
                        backgroundImage: `url(${productImages[currentImage]})`,
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
                  {productImages.map((image, index) => (
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
                  {product?.realPrice && (
                    <span className={styles.originalPrice}>
                      ¥{product.realPrice}
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

              {renderSpecifications()}

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

      {/* 同类商品推荐 */}
      <Card
        title={
          <div className={styles.recommendTitle}>
            <div className={styles.titleLeft}>
              <span className={styles.mainTitle}>同类商品推荐</span>
              <span className={styles.subTitle}>
                共 {categoryProductsCount} 件商品
              </span>
            </div>
            <Button 
              type="link" 
              onClick={() => navigate(`/mall?category=${product?.category3Code}`)}
              className={styles.moreButton}
            >
              查看更多 <RightOutlined />
            </Button>
          </div>
        }
        className={styles.recommendCard}
        bodyStyle={{ padding: '24px' }}
      >
        <List
          grid={{
            gutter: 24,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 4,
            xxl: 4,
          }}
          dataSource={relatedProducts}
          renderItem={(item: Product) => (
            <List.Item>
              <ProductCard product={item} />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default ProductDetail;
