import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
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
  Spin,
  Empty
} from 'antd';
import {
  ShoppingCartOutlined,
  HeartOutlined,
  HeartFilled,
  ShareAltOutlined,
  RightOutlined,
  LeftOutlined,
  SafetyOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { 
  CategoryResponse, 
  getProductDetail, 
  getCategoryList,
  getProductList,
  type Product,
  type ProductSku
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
  const [selectedSku, setSelectedSku] = useState<ProductSku | null>(null);
  const [activeTab, setActiveTab] = useState('detail');
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const [selectedSpecs, setSelectedSpecs] = useState<Record<string, string>>({});


  const { 
    data: product, 
    isLoading: productLoading,
    error: productError,
    refetch: refetchProduct 
  } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      try {
        if (!id) return null;
        return await getProductDetail({ 
          productId: Number(id), 
          productCode: '' 
        });
      } catch (error) {
        console.error('Failed to fetch product:', error);
        return null;
      }
    },
  });

  const { data: categories = [] } = useQuery<CategoryResponse[]>({
    queryKey: ['categories'],
    queryFn: () => getCategoryList(),
  });


  const parsedAttributes = useMemo(() => {
    try {
      const parseJsonSafely = (jsonString: string | null | undefined) => {
        if (!jsonString) return {};
        try {
          return JSON.parse(jsonString);
        } catch {
          return {};
        }
      };

      return {
        basicAttrs: parseJsonSafely(product?.productSpuAttrParams?.basicAttrs),
        saleAttrs: parseJsonSafely(product?.productSpuAttrParams?.saleAttrs),
        specAttrs: parseJsonSafely(product?.productSpuAttrParams?.specAttrs)
      };
    } catch (error) {
      console.error('解析商品属性失败:', error);
      return {
        basicAttrs: {},
        saleAttrs: {},
        specAttrs: {}
      };
    }
  }, [product?.productSpuAttrParams]);

  const categoryInfo = useMemo(() => {
    if (!product || !categories.length) return {
      category1: null,
      category2: null,
      category3: null
    };

    const category1 = categories.find(c => c.id === product.productSpu.category1Id);
    const category2 = category1?.children?.find(c => c.id === product.productSpu.category2Id);
    const category3 = category2?.children?.find(c => c.id === product.productSpu.category3Id);

    return {
      category1,
      category2,
      category3
    };
  }, [product, categories]);

  const breadcrumbItems = useMemo(() => {
    if (!product || !categories) return [];

    const items = [
      {
        title: (
          <span onClick={() => navigate('/mall')} className={styles.breadcrumbLink}>
            全部商品
          </span>
        ),
      }
    ];

    if (Array.isArray(categories) && product.productSpu?.category1Id) {
      const category1 = categories.find(c => c.id === product.productSpu.category1Id);
      const category2 = category1?.children?.find(c => c.id === product.productSpu.category2Id);
      const category3 = category2?.children?.find(c => c.id === product.productSpu.category3Id);

      if (category1) {
        items.push({
          title: (
            <span onClick={() => navigate(`/mall?category=${category1.code}&scroll=true`)} 
              className={styles.breadcrumbLink}>
              {category1.name}
            </span>
          ),
        });
      }

      if (category2) {
        items.push({
          title: (
            <span onClick={() => navigate(`/mall?category=${category2.code}&scroll=true`)} 
              className={styles.breadcrumbLink}>
              {category2.name}
            </span>
          ),
        });
      }

      if (category3) {
        items.push({
          title: (
            <span onClick={() => navigate(`/mall?category=${category3.code}&scroll=true`)} 
              className={styles.breadcrumbLink}>
              {category3.name}
            </span>
          ),
        });
      }
    }

    if (product?.productSpu.name) {
      items.push({
        title: <span className={styles.currentItem}>{product.productSpu.name}</span>,
      });
    }

    return items;
  }, [categories, product, navigate]);

  const categoryProductsCount = useMemo(() => {
    return relatedProducts.length;
  }, [relatedProducts]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!product?.productSpu.category1Code) return;

      try {
        setLoadingRelated(true);
        const response = await getProductList({
          page: 1,
          pageSize: 8,
          categoryCodes: product.productSpu.category1Code,
          productName: '',
        });

        if (response?.categories) {
          const categoryProducts = response.categories.find(
            cat => cat.categoryCode === product.productSpu.category1Code
          );
          
          // 添加空值检查
          const filteredProducts = categoryProducts?.products?.filter(
            p => p.id !== product.productSpu.id
          ) || [];
          
          setRelatedProducts(filteredProducts);
        }
      } catch (error) {
        console.error('Failed to fetch related products:', error);
      } finally {
        setLoadingRelated(false);
      }
    };

    fetchRelatedProducts();
  }, [product?.productSpu.category1Code]);

  useEffect(() => {
    if (product?.productSku?.length) {
      // 获取销量最高的SKU
      const bestSellingSku = product.productSku.reduce((prev, current) => 
        (prev.saleCount > current.saleCount) ? prev : current
      );
      setSelectedSku(bestSellingSku);
    }
  }, [product]);

  useEffect(() => {
    if (productError) {
      message.error('获取商品详情失败');
    }
  }, [productError]);

  useEffect(() => {
    if (product?.productSpuAttrParams?.specAttrs) {
      try {
        const specAttrs = JSON.parse(product.productSpuAttrParams.specAttrs);
        const initialSpecs: Record<string, string> = {};
        
        Object.entries(specAttrs).forEach(([key, values]) => {
          if (Array.isArray(values) && values.length > 0) {
            initialSpecs[key] = values[0];
          }
        });
        
        setSelectedSpecs(initialSpecs);
        
        const matchingSku = product.productSku?.find(sku => {
          const skuIndexs = JSON.parse(sku.indexs || '{}');
          return Object.entries(initialSpecs).every(([key, value]) => {
            const specValues = specAttrs[key];
            return specValues[skuIndexs[key]] === value;
          });
        });
        
        if (matchingSku) {
          setSelectedSku(matchingSku);
        }
      } catch (error) {
        console.error('初始化规格选择失败:', error);
      }
    }
  }, [product?.productSpuAttrParams?.specAttrs, product?.productSku]);

  const handleSpecChange = useCallback((specKey: string, specValue: string) => {
    if (!product?.productSku || !product.productSpuAttrParams?.specAttrs) return;
    
    try {
      const specAttrs = JSON.parse(product.productSpuAttrParams.specAttrs);
      const newSelectedSpecs = {
        ...selectedSpecs,
        [specKey]: specValue
      };
      setSelectedSpecs(newSelectedSpecs);
      
      const matchingSku = product.productSku.find(sku => {
        const skuIndexs = JSON.parse(sku.indexs || '{}');
        return Object.entries(newSelectedSpecs).every(([key, value]) => {
          const specValues = specAttrs[key];
          return specValues[skuIndexs[key]] === value;
        });
      });
      
      if (matchingSku) {
        setSelectedSku(matchingSku);
        if (quantity > matchingSku.stock) {
          setQuantity(matchingSku.stock);
        }
      }
    } catch (error) {
      console.error('规格切换失败:', error);
    }
  }, [product?.productSku, product?.productSpuAttrParams?.specAttrs, selectedSpecs, quantity]);

  const handleCategoryClick = useCallback((categoryCode: string) => {
    if (!categoryCode) return;
    navigate(`/mall/category/${categoryCode}`);
  }, [navigate]);

  const handleRecommendClick = useCallback(async (productId: number) => {
    setCurrentImage(0);
    setSelectedSku(null);
    setActiveTab('detail');
    navigate(`/mall/product/${productId}`, { replace: true });
  }, [navigate]);

  useEffect(() => {
    if (!id) {
      navigate('/mall');
      return;
    }
  }, [id, navigate]);

  const formatEthAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const mockReviews = [
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

  const renderBasicAttributes = () => {
    const { basicAttrs } = parsedAttributes;
    if (!basicAttrs || Object.keys(basicAttrs).length === 0) return null;
    
    return (
      <div className={styles.basicAttrs}>
        {Object.values(basicAttrs)
          .filter((value): value is string => Boolean(value))
          .map((value, index) => (
            <Tag 
              key={index}
              className={styles.basicAttrTag}
            >
              {value}
            </Tag>
          ))}
      </div>
    );
  };

  const renderSaleAttributes = () => {
    const { specAttrs } = parsedAttributes;
    if (!specAttrs || Object.keys(specAttrs).length === 0) return null;

    return (
      <div className={styles.specifications}>
        {Object.entries(specAttrs).map(([key, values]) => {
          if (!Array.isArray(values) || values.length === 0) return null;
          return (
            <div key={key} className={styles.specGroup}>
              <span className={styles.specLabel}>{key}：</span>
              <div className={styles.specOptions}>
                {values.map((value, index) => (
                  value && (
                    <Tag
                      key={value}
                      className={`${styles.specOption} ${
                        selectedSpecs[key] === value ? styles.selected : ''
                      }`}
                      onClick={() => handleSpecChange(key, value)}
                    >
                      {value}
                    </Tag>
                  )
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderSpecsTab = () => {
    const { basicAttrs, specAttrs } = parsedAttributes;

    return (
      <div className={styles.specsContent}>
        <div className={styles.specSection}>
          <h3>基础参数</h3>
          <table className={styles.specTable}>
            <tbody>
              {Object.entries(basicAttrs).map(([key, value]) => (
                <tr key={key}>
                  <td className={styles.specLabel}>{key}</td>
                  <td>{value as string}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.specSection}>
          <h3>规格参数</h3>
          <table className={styles.specTable}>
            <tbody>
              {Object.entries(specAttrs).map(([key, values]) => (
                <tr key={key}>
                  <td className={styles.specLabel}>{key}</td>
                  <td>{Array.isArray(values) ? values.join('、') : values as string}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderDetailAttributes = () => {
    try {
      if (!product?.productSpuAttrParams?.basicAttrs) return null;
      const basicAttrs = JSON.parse(product.productSpuAttrParams.basicAttrs);
      
      return (
        <div className={styles.detailAttributes}>
          <div className={styles.attributeHeader}>
            <h3>基本参数</h3>
            <span 
              className={styles.moreLink}
              onClick={() => setActiveTab('specs')}
            >
              查看更多参数 <RightOutlined />
            </span>
          </div>
          <div className={styles.attributeList}>
            {Object.entries(basicAttrs).map(([key, value], index) => (
              <div key={index} className={styles.attributeItem}>
                <span className={styles.attrKey}>{key}</span>
                <span className={styles.attrValue}>{value as string}</span>
              </div>
            ))}
          </div>
        </div>
      );
    } catch (error) {
      console.error('解析基础属性失败:', error);
      return null;
    }
  };

  const renderDetailTab = () => (
    <div className={styles.detailContent}>
      {renderDetailAttributes()}

      <div className={styles.detailContent}>
        {product?.productSpuDetail.detail && (
          <div dangerouslySetInnerHTML={{ __html: product.productSpuDetail.detail }} />
        )}
      </div>
    </div>
  );

  const productImages = useMemo(() => {
    if (selectedSku?.images) {
      const skuImages = selectedSku.images.split(',').filter(Boolean);
      return skuImages.length > 0 ? skuImages : product?.productSpu.images || [];
    }
    return product?.productSpu.images || [];
  }, [selectedSku, product?.productSpu.images]);

  useEffect(() => {
    setCurrentImage(0);
  }, [selectedSku]);

  const renderPrice = () => (
    <div className={styles.priceBlock}>
      <div className={styles.priceRow}>
        <span className={styles.priceLabel}>价格</span>
        {selectedSku ? (
          <span className={styles.price}>
            <span className={styles.symbol}>¥</span>
            {selectedSku.price}
          </span>
        ) : (
          <span className={styles.price}>
            <span className={styles.symbol}>¥</span>
            {product?.productSpu.realPrice}
          </span>
        )}
        {selectedSku && product?.productSpu.price && selectedSku.price !== product.productSpu.price && (
          <span className={styles.originalPrice}>
            ¥{product.productSpu.price}
          </span>
        )}
        <span className={styles.stockInfo}>
          库存: {selectedSku?.stock ?? '-'}
        </span>
        <span className={styles.salesInfo}>
          已售: {selectedSku?.saleCount ?? '-'}
        </span>
      </div>
    </div>
  );

  const handleCollect = () => {
    setIsCollected(!isCollected);
    message.success(isCollected ? '已取消收藏' : '收藏成功');
  };

  const handleShare = () => {
    message.success('分享链接已复制到剪贴板');
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!showZoom) return;
    
    if (imageRef.current) {
      const { left, top, width, height } = imageRef.current.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setMousePosition({ x, y });
    }
  };

  const handleMouseEnter = () => {
    setShowZoom(true);
  };

  const handleMouseLeave = () => {
    setShowZoom(false);
  };

  const renderTitle = () => (
    <div className={styles.titleRow}>
      <h1 className={styles.title}>
        {selectedSku?.title || product?.productSpu.name}
        {selectedSku?.subTitle && (
          <span className={styles.subTitle}>{selectedSku.subTitle}</span>
        )}
      </h1>
      {renderBasicAttributes()}
    </div>
  );

  const renderProductImages = () => (
    <div className={styles.imageWrapper}>
      <div className={styles.mainImageContainer}>
        <div 
          ref={imageRef}
          className={styles.imageBox}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Image
            src={productImages[currentImage]}
            alt={selectedSku?.title || product?.productSpu.name}
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
      
      {productImages.length > 1 && (
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
            {productImages.map((image: string, index: number) => (
              <div
                key={index}
                className={`${styles.thumbnail} ${currentImage === index ? styles.active : ''}`}
                onClick={() => setCurrentImage(index)}
              >
                <Image
                  src={image}
                  alt={`缩略图${index + 1}`}
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
      )}
    </div>
  );

  const renderSummary = () => (
    <div className={styles.summary}>
      {selectedSku?.description || product?.productSpu.description}
    </div>
  );

  const renderServicePromise = () => (
    <div className={styles.servicePromise}>
      <div className={styles.promiseItem}>
        <CheckCircleOutlined />
        <span>企业认证</span>
      </div>
      <div className={styles.promiseItem}>
        <SafetyOutlined />
        <span>正品保障</span>
      </div>
    </div>
  );

  const renderPurchaseSection = () => (
    <div className={styles.purchaseSection}>
      <div className={styles.quantitySection}>
        <div className={styles.quantityRow}>
          <div className={styles.quantityLeft}>
            <span className={styles.quantityLabel}>数量</span>
            <InputNumber
              min={1}
              max={selectedSku?.stock || 0}
              value={quantity}
              onChange={(value) => {
                const newValue = value || 1;
                setQuantity(Math.min(newValue, selectedSku?.stock || 0));
              }}
              className={styles.quantityInput}
              disabled={!selectedSku || selectedSku.stock <= 0}
            />
          </div>
        </div>
      </div>
      <div className={styles.actionButtons}>
        <Space direction="horizontal" size={40}>
          <Button
            type="primary"
            size="middle"
            icon={<ShoppingCartOutlined />}
            onClick={handleBuyNow}
            disabled={!selectedSku || selectedSku.stock <= 0}
            className={styles.exchangeButton}
          >
            {!selectedSku ? '请选择规格' : 
             selectedSku.stock <= 0 ? '已售罄' : '立即兑换'}
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
  );

  const tabItems: TabsProps['items'] = [
    {
      key: 'detail',
      label: '商品详情',
      children: renderDetailTab()
    },
    {
      key: 'specs',
      label: '规格与包装',
      children: renderSpecsTab()
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
          <span className={styles.reviewCount}>({product?.reviews?.length || 0})</span>
        </span>
      ),
      children: (
        <div className={styles.reviewsContent}>
          <div className={styles.reviewsSummary}>
            <div className={styles.overallRating}>
              <div className={styles.ratingScore}>
                {(() => {
                  const reviews = product?.reviews || mockReviews;
                  if (!reviews.length) return "5.0";
                  return (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1);
                })()}
              </div>
              <div className={styles.ratingStars}>
                <Rate 
                  disabled 
                  defaultValue={Number((product?.reviews || mockReviews)
                    .reduce((acc, review) => acc + review.rating, 0) / 
                    (product?.reviews?.length || mockReviews.length) || 5)} 
                  allowHalf 
                />
                <div className={styles.ratingCount}>
                  共 <span>{product?.reviews?.length || mockReviews.length}</span> 条评价
                </div>
              </div>
            </div>
          </div>

          <List
            className={styles.reviewsList}
            itemLayout="vertical"
            dataSource={product?.reviews || mockReviews}
            renderItem={(review) => (
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
    if (!id) {
      message.error('商品ID不能为空');
      return;
    }
    if (!selectedSku) {
      message.warning('请选择商品规格');
      return;
    }
    if (selectedSku.stock <= 0) {
      message.warning('该规格商品已售罄');
      return;
    }
    navigate(`/mall/exchange/${id}`);
  };

  const renderContent = () => {
    if (!id || productLoading) {
      return <Spin size="large" className={styles.loading} />;
    }

    if (!product) {
      return <Empty description="商品不存在" />;
    }

    return (
      <div className={styles.container}>
        <Breadcrumb items={breadcrumbItems} className={styles.breadcrumb} />
        <div className={styles.mainContent}>
          <Row gutter={40}>
            <Col span={10}>
              {renderProductImages()}
            </Col>
            
            <Col span={14}>
              <div className={styles.productInfo}>
                {renderTitle()}
                {renderSummary()}
                {renderPrice()}
                {renderSaleAttributes()}
                {renderServicePromise()}
                {renderPurchaseSection()}
              </div>
            </Col>
          </Row>
        </div>

        <Card className={styles.detailsCard}>
          <Tabs 
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabItems} 
          />
        </Card>

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
                onClick={() => navigate(`/mall/category/${product?.productSpu.category1Code}`)}
                className={styles.moreButton}
              >
                查看更多 <RightOutlined />
              </Button>
            </div>
          }
          className={styles.recommendCard}
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
            loading={loadingRelated}
            renderItem={(item: Product) => (
              <List.Item>
                <ProductCard 
                  product={item}
                  showExchangeButton={false}
                  onClick={() => handleRecommendClick(item.id)}
                />
              </List.Item>
            )}
          />
        </Card>
      </div>
    );
  };

  return renderContent();
};

export default ProductDetail;
