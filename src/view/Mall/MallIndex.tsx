import React, { useState, useMemo, useRef, useCallback } from 'react';
import { Layout, Input, Menu, Card, Row, Col, Button, Pagination, Empty, Tooltip, Tag, Typography } from 'antd';
import {
  ShoppingCartOutlined,
  SearchOutlined,
  RightOutlined,
  BarsOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
  FireOutlined,
  SwapOutlined,
} from '@ant-design/icons';
import stylesCss from './MallIndex.module.scss';
import { Header } from 'antd/es/layout/layout';
import { categories, products } from '../../api/mockDatas'; // 导入数据
const { Search } = Input;
const { SubMenu } = Menu;
const { Text, Paragraph } = Typography;

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;      // 一级目录（必须）
  subCategory?: string;  // 二级目录（可选）
  thirdCategory?: string;// 三级目录（可选，但如果有则必须有二级目录）
  tags: string[];
  stock: number;
  sold: number;
  description: string;
  originalPrice?: number;
}


// 添加所有需要的类型定义
type SortDirection = 'asc' | 'desc';
type SortField = 'price' | 'sold' | 'stock';
type SortType = 'default' | `${SortField}${'Asc' | 'Desc'}`; // 使用模板字面量类型

interface SortState {
  field: SortField | null;
  direction: SortDirection;
}

interface CategoryTitleProps {
  category: {
    key: string;
    icon: React.ReactNode;
    title: string;
  };
  total: number;
  onViewMore?: () => void;
  sortType?: SortType;
  onSortChange?: (type: SortType) => void;
}

// 组件外部的接口定义
interface CategoryTags {
  scenes: string[];
  styles: string[];
}

const MallIndex: React.FC = () => {
  const [showAllCategories, setShowAllCategories] = useState(true); // 默认为 true
  const [selectedScenes, setSelectedScenes] = useState<string[]>([]); // 场景标签
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]); // 风格标签
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const categoryRefs = useRef<{ [key: string]: React.RefObject<HTMLDivElement> }>(
    categories.reduce((acc, category) => ({
      ...acc,
      [category.key]: React.createRef<HTMLDivElement>()
    }), {})
  );
  const [activeKey, setActiveKey] = useState<string>('all'); // 添加选中状态
  const [sortType, setSortType] = useState<string>('default');

  // 按分类组织商品
  const groupedProducts = useMemo(() => {
    return categories.reduce((acc, category) => {
      // 处理一级分类
      acc[category.key] = products.filter(product => {
        // 匹配当前一级分类及其所有子分类的商品
        return product.category === category.key || 
               category.children?.some(subCat => 
                 product.subCategory === subCat.key ||
                 subCat.children?.some(thirdCat => 
                   product.thirdCategory === thirdCat.key
                 )
               );
      });

      // 处理二级分类
      category.children?.forEach(subCategory => {
        acc[subCategory.key] = products.filter(product => 
          // 匹配当前二级分类及其子分类的商品
          product.subCategory === subCategory.key ||
          subCategory.children?.some(thirdCat => 
            product.thirdCategory === thirdCat.key
          )
        );

        // 处理三级分类
        subCategory.children?.forEach(thirdCategory => {
          acc[thirdCategory.key] = products.filter(product => 
            // 只匹配当前三级分类的商品
            product.thirdCategory === thirdCategory.key
          );
        });
      });

      return acc;
    }, {} as { [key: string]: Product[] });
  }, []);  // 因为 products 和 categories 是导入的常量，所以依赖项为空

  // 获取标签函数
  const getTagsByCategory = useCallback((categoryKey: string | null): CategoryTags => {
    // 如果是全部商品或没有选择分类，返回所有分类的标签
    if (!categoryKey || categoryKey === 'all') {
      const allTags = categories.reduce((acc, category) => {
        if (category.tags) {
          acc.scenes = [...new Set([...acc.scenes, ...category.tags.scenes])];
          acc.styles = [...new Set([...acc.styles, ...category.tags.styles])];
        }
        category.children?.forEach(subCategory => {
          if (subCategory.tags) {
            acc.scenes = [...new Set([...acc.scenes, ...subCategory.tags.scenes])];
            acc.styles = [...new Set([...acc.styles, ...subCategory.tags.styles])];
          }
        });
        return acc;
      }, { scenes: [], styles: [] } as CategoryTags);
      return allTags;
    }

    // 查找当前分类
    const findCategory = (key: string) => {
      for (const category of categories) {
        if (category.key === key) return category;
        for (const subCategory of category.children || []) {
          if (subCategory.key === key) return subCategory;
          for (const thirdCategory of subCategory.children || []) {
            if (thirdCategory.key === key) {
              // 如果是三级分类，返回其父级分类的标签
              return subCategory;
            }
          }
        }
      }
      return null;
    };

    const currentCategory = findCategory(categoryKey);
    if (!currentCategory || !currentCategory.tags) {
      // 如果找不到分类或该分类没有标签，返回空数组
      return { scenes: [], styles: [] };
    }

    return {
      scenes: currentCategory.tags.scenes || [],
      styles: currentCategory.tags.styles || []
    };
  }, []);

  const handleAllCategoriesClick = () => {
    setShowAllCategories(!showAllCategories);
  };

  // 处理标签选择
  const handleSceneSelect = useCallback((scene: string) => {
    setSelectedScenes(prev => 
      prev.includes(scene)
        ? prev.filter(s => s !== scene)
        : [...prev, scene]
    );
  }, []);

  const handleStyleSelect = useCallback((style: string) => {
    setSelectedStyles(prev => 
      prev.includes(style)
        ? prev.filter(s => s !== style)
        : [...prev, style]
    );
  }, []);

  // 清空标签
  const handleClearScenes = useCallback(() => {
    setSelectedScenes([]);
  }, []);

  const handleClearStyles = useCallback(() => {
    setSelectedStyles([]);
  }, []);

  // 根据选中的场景和风格筛选商品
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesScenes = selectedScenes.length === 0 || 
        selectedScenes.some(scene => product.tags.includes(scene));
      const matchesStyles = selectedStyles.length === 0 || 
        selectedStyles.some(style => product.tags.includes(style));
      return matchesScenes && matchesStyles;
    });
  }, [selectedScenes, selectedStyles]);

  // 处理搜索
  const handleSearch = (value: string) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) {
      handleBackToAll(); // 空搜索时返回全部商品
      return;
    }

    // 只按商品名称搜索
    const results = products.filter(product => 
      product.name.toLowerCase().includes(trimmedValue.toLowerCase())
    );

    setSearchResults(results);
    setShowSearchResults(true);
    setCurrentPage(1); // 重置分页
    setSortType('default'); // 重置排序
  };

  // 处理搜索框变化
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    
    if (!value.trim()) {
      setShowSearchResults(false);
      setSearchResults([]);
    }
  };

  // 获取当前分类的完整信息
  const getCurrentCategory = (key: string) => {
    // 查找一级分类
    const firstLevel = categories.find(c => c.key === key);
    if (firstLevel) return firstLevel;

    // 查找二级分类
    for (const category of categories) {
      const secondLevel = category.children?.find(c => c.key === key);
      if (secondLevel) return { ...secondLevel, icon: category.icon };
    }

    // 查找三级分类
    for (const category of categories) {
      for (const subCategory of category.children || []) {
        const thirdLevel = subCategory.children?.find(c => c.key === key);
        if (thirdLevel) return { ...thirdLevel, icon: category.icon };
      }
    }

    return null;
  };

  // 处理查看更多点击
  const handleViewMore = (categoryKey: string) => {
    setSelectedCategory(categoryKey);
    setShowAllCategories(false);
    setActiveKey(categoryKey); // 确保设置为选中状态
    categoryRefs.current[categoryKey].current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  // 修改菜单点击处理函数
  const handleMenuClick = ({ key }: { key: string }) => {
    const firstLevelKey = getFirstLevelKey(key);
    
    // 清空搜索状态
    setSearchText('');
    setShowSearchResults(false);
    setSearchResults([]);
    
    // 设置导航状态
    setActiveKey(firstLevelKey || key);
    if (key === 'all') {
      setShowAllCategories(true);
      setSelectedCategory(null);
    } else {
      setShowAllCategories(false);
      setSelectedCategory(key);
    }
    setCurrentPage(1);
    
    // 重置标签选择
    setSelectedScenes([]);
    setSelectedStyles([]);
  };

  // 处理返回全部商品
  const handleBackToAll = () => {
    // 清空搜索状态
    setSearchText('');
    setShowSearchResults(false);
    setSearchResults([]);
    
    // 设置导航状态
    setActiveKey('all');
    setShowAllCategories(true);
    setSelectedCategory(null);
    setCurrentPage(1);
  };

  // 统一的商品卡片组件
  const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
    <Card
      hoverable
      className={stylesCss.productCard}
      cover={
        <div className={stylesCss.imageWrapper}>
          <img alt={product.name} src={product.image} />
          {product.sold > 100 && (
            <div className={stylesCss.hotTag}>
              <FireOutlined /> 热销
            </div>
          )}
        </div>
      }
      actions={[
        <Button 
          type="primary" 
          className={stylesCss.exchangeButton}
          disabled={product.stock === 0}
        >
          <ShoppingCartOutlined />
          {product.stock === 0 ? '暂时售罄' : '立即兑换'}
        </Button>
      ]}
    >
      <div className={stylesCss.productContent}>
        <Tooltip title={product.name}>
          <div className={stylesCss.productTitle}>{product.name}</div>
        </Tooltip>

        <Tooltip title={product.description}>
          <div className={stylesCss.description}>
            {product.description}
          </div>
        </Tooltip>

        <div className={stylesCss.priceStatisticsRow}>
          <div className={stylesCss.priceInfo}>
            <span className={stylesCss.currency}>¥</span>
            <span className={stylesCss.currentPrice}>{product.price}</span>
            <span className={stylesCss.unit}>R</span>
            {product.originalPrice && (
              <span className={stylesCss.originalPrice}>
                ¥{product.originalPrice}R
              </span>
            )}
          </div>
          <div className={stylesCss.statistics}>
            <span>库存 {product.stock}</span>
            <div className={stylesCss.divider} />
            <span>已售 {product.sold}</span>
          </div>
        </div>

        <div className={stylesCss.tags}>
          {product.tags.slice(0, 4).map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </Card>
  );

  // 修改标题组件
  const CategoryCardTitle: React.FC<CategoryTitleProps> = ({ 
    category, 
    total, 
    onViewMore,
    sortType = 'default',
    onSortChange
  }) => {
    const [sort, setSort] = useState<SortState>(() => {
      if (sortType === 'default') {
        return { field: null, direction: 'desc' };
      }
      const field = sortType.replace(/(Asc|Desc)$/, '') as SortField;
      const direction = sortType.endsWith('Asc') ? 'asc' : 'desc';
      return { field, direction } as SortState;
    });

    const handleSortClick = (field: SortField) => {
      setSort(prevSort => {
        const newDirection: SortDirection = 
          prevSort.field === field && prevSort.direction === 'desc' ? 'asc' : 'desc';
        const newSort: SortState = { field, direction: newDirection };
        onSortChange?.(`${field}${newDirection.charAt(0).toUpperCase() + newDirection.slice(1)}` as SortType);
        return newSort;
      });
    };

    // 获取排序图标
    const getSortIcon = (field: SortField) => {
      if (sort.field !== field) {
        return <SwapOutlined className={stylesCss.sortIcon} />;
      }
      return sort.direction === 'desc' ? 
        <CaretDownOutlined className={`${stylesCss.sortIcon} ${stylesCss.active}`} /> : 
        <CaretUpOutlined className={`${stylesCss.sortIcon} ${stylesCss.active}`} />;
    };

    return (
      <div className={stylesCss.categoryHeader}>
        <div className={stylesCss.categoryTitle}>
          <span className={stylesCss.categoryIcon}>{category.icon}</span>
          <span className={stylesCss.categoryName}>
            {category.title}
            {!onSortChange && <span className={stylesCss.categoryCount}>共 {total} 件商品</span>}
          </span>
        </div>
        <div className={stylesCss.headerRight}>
          {onSortChange && (
            <>
              <div className={stylesCss.sortButtons}>
                <Button
                  className={`${stylesCss.sortButton} ${sort.field === 'price' ? stylesCss.active : ''}`}
                  onClick={() => handleSortClick('price')}
                >
                  价格 {getSortIcon('price')}
                </Button>
                <Button
                  className={`${stylesCss.sortButton} ${sort.field === 'sold' ? stylesCss.active : ''}`}
                  onClick={() => handleSortClick('sold')}
                >
                  销量 {getSortIcon('sold')}
                </Button>
                <Button
                  className={`${stylesCss.sortButton} ${sort.field === 'stock' ? stylesCss.active : ''}`}
                  onClick={() => handleSortClick('stock')}
                >
                  库存 {getSortIcon('stock')}
                </Button>
              </div>
              <div className={stylesCss.verticalDivider} />
              <span className={stylesCss.totalCount}>共 {total} 件商品</span>
            </>
          )}
          {onViewMore && (
            <Button 
              type="link" 
              onClick={() => {
                // 获取当前分类的一级目录
                const parentCategory = categories.find(cat => 
                  cat.children?.some(subCat => 
                    subCat.key === category.key || 
                    subCat.children?.some(thirdCat => thirdCat.key === category.key)
                  )
                );
                if (parentCategory) {
                  setActiveKey(parentCategory.key);
                }
                onViewMore();
              }}
              className={stylesCss.viewMoreBtn}
            >
              查看全部
              <RightOutlined />
            </Button>
          )}
        </div>
      </div>
    );
  };

  // 修改排序处理函数
  const handleSort = (products: Product[], sortType: string) => {
    if (sortType === 'default') return products;

    const match = sortType.match(/([a-z]+)(Asc|Desc)/);
    if (!match) return products;

    const [, field, direction] = match;
    const factor = direction === 'Desc' ? -1 : 1;

    return [...products].sort((a, b) => {
      // 确保字段存在且是数字类型
      const fieldA = a[field as keyof Product];
      const fieldB = b[field as keyof Product];
      
      if (typeof fieldA === 'number' && typeof fieldB === 'number') {
        return (fieldA - fieldB) * factor;
      }
      
      return 0; // 如果不是数字类型，保持原有顺序
    });
  };

  // 渲染分类商品列表
  const renderCategoryProducts = () => {
    if (!selectedCategory) return null;
    
    const currentCategory = getCurrentCategory(selectedCategory);
    if (!currentCategory) return null;

    const categoryProducts = groupedProducts[selectedCategory] || [];
    const sortedProducts = handleSort(categoryProducts, sortType);
    const pageSize = 12;
    
    return (
      <div 
        ref={categoryRefs.current[selectedCategory]}
        className={stylesCss.categoryProducts}
      >
        <Card 
          className={stylesCss.categoryCard}
          title={
            <CategoryCardTitle 
              category={currentCategory}
              total={categoryProducts.length}
              sortType={sortType as SortType}
              onSortChange={setSortType}
            />
          }
        >
          {sortedProducts.length > 0 ? (
            <>
              <Row gutter={[16, 16]}>
                {sortedProducts
                  .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                  .map(product => (
                    <Col span={6} key={product.id}>
                      <ProductCard product={product} />
                    </Col>
                  ))}
              </Row>
              <div className={stylesCss.pagination}>
                <Pagination
                  current={currentPage}
                  total={sortedProducts.length}
                  pageSize={pageSize}
                  onChange={setCurrentPage}
                />
              </div>
            </>
          ) : (
            <div className={stylesCss.emptyState}>
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <span className={stylesCss.emptyText}>
                    未找到相关商品
                  </span>
                }
              >
                <Button 
                  type="primary"
                  onClick={handleBackToAll}
                  className={stylesCss.backToAllBtn}
                >
                  查看全部商品
                </Button>
              </Empty>
            </div>
          )}
        </Card>
      </div>
    );
  };

  // 渲染搜索结果
  const renderSearchResults = () => {
    const sortedResults = handleSort(searchResults, sortType);
    const pageSize = 12;

    return (
      <div className={stylesCss.searchResults}>
        <Card 
          className={stylesCss.categoryCard}
          title={
            <CategoryCardTitle 
              category={{
                key: 'search',
                title: '搜索结果',
                icon: <SearchOutlined />
              }}
              total={searchResults.length}
              sortType={sortType as SortType}
              onSortChange={setSortType}
            />
          }
        >
          {sortedResults.length > 0 ? (
            <>
              <Row gutter={[16, 16]}>
                {sortedResults
                  .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                  .map(product => (
                    <Col span={6} key={product.id}>
                      <ProductCard product={product} />
                    </Col>
                  ))}
              </Row>
              <div className={stylesCss.pagination}>
                <Pagination
                  current={currentPage}
                  total={sortedResults.length}
                  pageSize={pageSize}
                  onChange={setCurrentPage}
                />
              </div>
            </>
          ) : (
            <div className={stylesCss.emptyState}>
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <div className={stylesCss.emptyText}>
                    <Paragraph>
                      <Text strong>未找到"{searchText}"相关商品</Text>
                    </Paragraph>
                    <Paragraph>
                      <Text type="secondary">建议您：</Text>
                    </Paragraph>
                    <ul className={stylesCss.suggestionList}>
                      <li>
                        <Text type="secondary">检查输入是否正确</Text>
                      </li>
                      <li>
                        <Text type="secondary">使用其他相关词语搜索</Text>
                      </li>
                    </ul>
                  </div>
                }
              >
                <Button 
                  type="primary"
                  onClick={handleBackToAll}
                  className={stylesCss.backToAllBtn}
                >
                  查看全部商品
                </Button>
              </Empty>
            </div>
          )}
        </Card>
      </div>
    );
  };

  // 修改 TagFilter 组件
  const TagFilter: React.FC<{
    title: string;
    tags: string[];
    selectedTags: string[];
    onTagSelect: (tag: string) => void;
    onClear: () => void;
  }> = ({ title, tags, selectedTags, onTagSelect, onClear }) => (
    <div className={stylesCss.tagFilterSection}>
      <div className={stylesCss.tagFilterTitle}>{title}</div>
      <div className={stylesCss.tagFilterContent}>
        {tags.map(tag => (
          <Tag
            key={tag}
            className={`${stylesCss.filterTag} ${selectedTags.includes(tag) ? stylesCss.active : ''}`}
            onClick={() => onTagSelect(tag)}
          >
            {tag}
          </Tag>
        ))}
        {selectedTags.length > 0 && (
          <Tag
            className={stylesCss.clearTag}
            onClick={onClear}
          >
            清空
          </Tag>
        )}
      </div>
    </div>
  );

  // 修改渲染标签过滤器的容器样式
  const renderTagFilters = useCallback(() => {
    const currentTags = getTagsByCategory(activeKey === 'all' ? null : selectedCategory);
    
    if (!currentTags.scenes.length && !currentTags.styles.length) {
      return null;
    }

    return (
      <div className={stylesCss.filterContainer}>
        {currentTags.scenes.length > 0 && (
          <TagFilter
            title="场景"
            tags={currentTags.scenes}
            selectedTags={selectedScenes}
            onTagSelect={handleSceneSelect}
            onClear={handleClearScenes}
          />
        )}
        {currentTags.styles.length > 0 && (
          <TagFilter
            title="风格"
            tags={currentTags.styles}
            selectedTags={selectedStyles}
            onTagSelect={handleStyleSelect}
            onClear={handleClearStyles}
          />
        )}
      </div>
    );
  }, [
    activeKey,
    selectedCategory,
    selectedScenes,
    selectedStyles,
    getTagsByCategory,
    handleSceneSelect,
    handleStyleSelect,
    handleClearScenes,
    handleClearStyles
  ]);

  // 添加 getFirstLevelKey 函数
  const getFirstLevelKey = (key: string) => {
    // 如果是全部商品，直接返回
    if (key === 'all') return key;
    
    // 如果是一级分类，直接返回
    if (categories.find(c => c.key === key)) {
      return key;
    }
    
    // 查找二级分类所属的一级分类
    for (const category of categories) {
      if (category.children?.some(sub => sub.key === key)) {
        return category.key;
      }
      // 查找三级分类所属的一级分类
      for (const subCategory of category.children || []) {
        if (subCategory.children?.some(third => third.key === key)) {
          return category.key;
        }
      }
    }
    return key; // 如果找不到对应的一级分类，返回原key
  };

  return (
    <Layout>
      <Header className={stylesCss.header}>
        <Row align="middle">
          <Col span={14}>
            <Menu 
              mode="horizontal" 
              className={stylesCss.menu}
              selectedKeys={[activeKey]}
              onClick={handleMenuClick}
              selectable={true}
            >
              <Menu.Item key="all" icon={<BarsOutlined />}>
                全部商品
              </Menu.Item>
              {categories.map(category => (
                <Menu.SubMenu 
                  key={category.key} 
                  icon={category.icon} 
                  title={category.title}
                  onTitleClick={({ key }) => handleMenuClick({ key })} // 添加一级菜单标题点击处理
                >
                  {category.children?.map(subCategory => (
                    <Menu.SubMenu 
                      key={subCategory.key} 
                      title={subCategory.title}
                    >
                      {subCategory.children?.map(item => (
                        <Menu.Item key={item.key}>
                          {item.title}
                        </Menu.Item>
                      ))}
                    </Menu.SubMenu>
                  ))}
                </Menu.SubMenu>
              ))}
            </Menu>
          </Col>
          <Col span={5}>
            <div className={stylesCss.searchWrapper}>
              <Search
                placeholder="请输入商品名称"
                value={searchText}
                onChange={handleSearchChange}
                onSearch={handleSearch}
                enterButton
                allowClear
                className={stylesCss.search}
              />
            </div>
          </Col>
        </Row>
      </Header>
      {renderTagFilters()}
      <div className={stylesCss.content}>
        {showSearchResults ? (
          renderSearchResults()
        ) : showAllCategories ? (
          <div className={stylesCss.allCategories}>
            <Row gutter={[16, 16]}>
              {categories.map(category => (
                <Col span={24} key={category.key}>
                  <Card 
                    className={stylesCss.categoryCard}
                    title={
                      <CategoryCardTitle 
                        category={category}
                        total={groupedProducts[category.key]?.length || 0}
                        onViewMore={() => handleViewMore(category.key)}
                      />
                    }
                  >
                    <Row gutter={[16, 16]}>
                      {groupedProducts[category.key]?.slice(0, 4).map(product => (
                        <Col span={6} key={product.id}>
                          <ProductCard product={product} />
                        </Col>
                      ))}
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        ) : (
          renderCategoryProducts()
        )}
      </div>
    </Layout>
  )
};

export default MallIndex;