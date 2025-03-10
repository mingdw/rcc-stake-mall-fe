import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { Layout, Input, Menu, Card, Row, Col, Button, Pagination, Empty, Tag, Spin } from 'antd';
import {
  RightOutlined,
  BarsOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
  
} from '@ant-design/icons';
import stylesCss from './MallIndex.module.scss';
import { Header } from 'antd/es/layout/layout';

import { AttrGroup, CategoryProduct, CategoryResponse, getCategoryList, getProductList, Product, ProductListRequest, Attr } from "../../api/apiService";

import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { Key } from 'antd/es/table/interface';
import { message } from 'antd';
import ProductCard from '../../components/ProductCard';
const { Search } = Input;

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
    code: string;
    name: string;
    icon?: React.ReactNode;
  };
  total: number;
  onViewMore?: () => void;
  searchText?: string; // 添加搜索文本属性
}

// 修改常量定义
const PAGE_SIZE = 8; // 每页8个商品
const ITEMS_PER_ROW = 4; // 每行4个商品
const MAX_ITEMS_PER_CATEGORY = 8; // 每个分类最多显示8个商品（2行）

const MallIndex: React.FC = () => {
  const [showAllCategories, setShowAllCategories] = useState(true); // 默认为 true
  const [selectedScenes, setSelectedScenes] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cachedCategories, setCachedCategories] = useState<CategoryResponse[]>([]);
  const [cachedProducts, setCachedProducts] = useState<{ [key: string]: Product[] }>({});

  const navigate = useNavigate();
  const location = useLocation();
  const [activeKey, setActiveKey] = useState<string>('all'); // 添加选中状态
  const [sortType, setSortType] = useState<string>('default');
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  // 修改初始化加载逻辑
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        
        // 并行获取分类和商品数据
        const [categoryData, productData] = await Promise.all([
          getCategoryList(),
          getProductList({
            categoryCodes: '',
            productName: '',
            page: 1,
            pageSize: 999 // 获取所有商品
          })
        ]);

        // 处理分类数据
        const categoriesArray = Array.isArray(categoryData) ? categoryData : [];
        setCategories(categoriesArray);
        setCachedCategories(categoriesArray);

        // 处理商品数据
        if (productData?.categories) {
          const allProducts = productData.categories
            .filter(cat => cat.products !== null)
            .flatMap(cat => cat.products || []);

          // 按一级分类组织商品数据
          const productsByCategory = allProducts.reduce((acc, product) => {
            const category1Code = product.category1Code || '';
            if (!acc[category1Code]) {
              acc[category1Code] = [];
            }
            acc[category1Code].push(product);
            return acc;
          }, {} as { [key: string]: Product[] });

          setProducts(allProducts);
          setTotal(productData.total || 0);
          setCachedProducts({
            '': allProducts, // 所有商品
            ...productsByCategory // 按一级分类缓存的商品
          });
        }
      } catch (err) {
        console.error('Failed to fetch initial data:', err);
        message.error('获取数据失败');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []); // 只在组件挂载时执行一次

  // 修改商品点击处理函数
  const handleProductClick = useCallback((product: Product) => {
    // 获取当前商品所属的一级分类商品列表
    const categoryProducts = cachedProducts[product.category1Code] || [];
    
    navigate(`/mall/product/${product.id}`, {
      state: {
        categories: cachedCategories,
        categoryProducts: categoryProducts,
        currentProduct: product
      }
    });
  }, [navigate, cachedCategories, cachedProducts]);

  // 修改 ProductCard 组件的使用
  const renderProductCard = (product: Product, index: number) => (
    <ProductCard 
      key={product.id}
      product={product}
      showExchangeButton={true}
      onClick={() => handleProductClick(product)}
    />
  );

  // 修改 fetchProducts 函数，更新 total 的设置
  const fetchProducts = useCallback(async (params: Partial<ProductListRequest> = {}) => {
    try {
      setLoading(true);
      
      const requestParams: ProductListRequest = {
        categoryCodes: params.categoryCodes || selectedCategory || '',
        productName: params.productName || searchText || '',
        page: params.page || currentPage,
        pageSize: PAGE_SIZE,
      };

      const data = await getProductList(requestParams);
      
      if (data.categories && Array.isArray(data.categories)) {
        const allProducts = data.categories
          .filter((cat: CategoryProduct) => cat.products !== null)
          .flatMap((cat: CategoryProduct) => cat.products || []);
        
        setProducts(allProducts);
        // 更新 total 为实际的商品数量
        setTotal(allProducts.length);
      } else {
        setProducts([]);
        setTotal(0);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
      message.error('获取商品列表失败，请稍后重试');
      setProducts([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [currentPage, selectedCategory, searchText]);

  // 初始加载
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // 简化分页处理函数
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchProducts({ 
      page,
      pageSize: PAGE_SIZE,
      categoryCodes: selectedCategory,
      productName: searchText
    });
  };

  // 修改搜索处理函数
  const handleSearch = (value: string) => {
    const trimmedValue = value.trim();
    setSearchText(trimmedValue);
    setCurrentPage(1);
    setShowSearchResults(true);
    
    fetchProducts({
      productName: trimmedValue,
      categoryCodes: selectedCategory,
      page: 1,
      pageSize: PAGE_SIZE
    });
  };

  // 处理分类选择
  const handleCategorySelect = (categoryCodes: string) => {
    setSelectedCategory(categoryCodes);
    setCurrentPage(1); // 重置页码
    fetchProducts({
      categoryCodes,
      page: 1,
      productName: searchText // 保持当前搜索条件
    });
  };

  const categoryRefs = useRef<{ [key: string]: React.RefObject<HTMLDivElement> }>({});

useEffect(() => {
  categoryRefs.current = (categories || []).reduce((acc, category) => ({
    ...acc,
    [category.code]: React.createRef<HTMLDivElement>()
  }), {});
}, [categories]);

  // 添加滚动到分类的处理函数
  const scrollToCategory = useCallback((categoryCode: string) => {
    const categoryRef = categoryRefs.current[categoryCode];
    if (categoryRef?.current) {
      categoryRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  // 修改 URL 参数监听
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryFromUrl = searchParams.get('category');
    const shouldScroll = searchParams.get('scroll') === 'true';

    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
      setShowAllCategories(false);

      // 查找并设置一级分类为选中状态
      const firstLevelKey = getFirstLevelKey(categoryFromUrl);
      setActiveKey(firstLevelKey);

      // 展开对应的分类菜单
      const expandKeys: string[] = [];
      categories.forEach(cat => {
        if (cat.code === categoryFromUrl) {
          expandKeys.push(cat.code);
        }
        cat.children?.forEach(subCat => {
          if (subCat.code === categoryFromUrl) {
            expandKeys.push(cat.code, subCat.code);
          }
          subCat.children?.forEach(thirdCat => {
            if (thirdCat.code === categoryFromUrl) {
              expandKeys.push(cat.code, subCat.code, thirdCat.code);
            }
          });
        });
      });
      setExpandedKeys(expandKeys);

      // 如果需要滚动，等待组件渲染完成后滚动到对应位置
      if (shouldScroll) {
        // 使用 setTimeout 确保在 DOM 更新后执行滚动
        setTimeout(() => {
          scrollToCategory(categoryFromUrl);
          // 清除 scroll 参数
          const newSearchParams = new URLSearchParams(location.search);
          newSearchParams.delete('scroll');
          navigate({
            pathname: location.pathname,
            search: newSearchParams.toString()
          }, { replace: true });
        }, 100);
      }
    }
  }, [location.search, categories, navigate, scrollToCategory]);

  // 处理分类选择
  const onSelect = (selectedKeys: Key[], info: any) => {
    const selectedKey = selectedKeys[0] as string;
    setSelectedCategory(selectedKey);
    
    // 更新 URL 参数
    navigate(`/mall?category=${selectedKey}`);
  };

  // 按分类组织商品
  const groupedProducts = useMemo(() => {
    return categories.reduce((acc, category) => {
      // 处理一级分类
      acc[category.code] = products.filter(product => {
        // 匹配当前一级分类及其所有子分类的商品
        return product.category1Code === category.code || 
               category.children?.some(subCat => 
                 product.category2Code === subCat.code ||
                 subCat.children?.some(thirdCat => 
                   product.category3Code === thirdCat.code
                 )
               );
      });

      return acc;
    }, {} as { [key: string]: Product[] });
  }, [categories, products]);

  // 优化 filteredTagProducts 函数，简化匹配逻辑
  const filteredTagProducts = useMemo(() => {
    // 获取当前需要过滤的商品列表
    let productsToFilter = showSearchResults ? searchResults : products;

    // 如果选择了分类，先按分类筛选
    if (selectedCategory && !showSearchResults) {
      productsToFilter = productsToFilter.filter(product => {
        // 如果是一级分类
        if (categories.some(cat => cat.code === selectedCategory)) {
          return product.category1Code === selectedCategory;
        }
        
        // 如果是二级分类
        for (const category of categories) {
          const secondLevel = category.children?.find(sub => sub.code === selectedCategory);
          if (secondLevel) {
            return product.category2Code === selectedCategory;
          }
          
          // 如果是三级分类
          for (const subCategory of category.children || []) {
            const thirdLevel = subCategory.children?.find(third => third.code === selectedCategory);
            if (thirdLevel) {
              return product.category3Code === selectedCategory;
            }
          }
        }
        return false;
      });
    }

    // 应用标签过滤 - 使用基础属性进行过滤
    return productsToFilter.filter(product => {
      // 如果没有选择任何标签，返回所有商品
      if (selectedScenes.length === 0 && selectedStyles.length === 0) {
        return true;
      }
      
      // 获取商品的基础属性
      let basicAttrsObj = {};
      
      // 处理 basicAttrs
      if (product.attributes?.basicAttrs) {
        // 如果 basicAttrs 是字符串，尝试解析为对象
        if (typeof product.attributes.basicAttrs === 'string') {
          try {
            basicAttrsObj = JSON.parse(product.attributes?.basicAttrs);
          } catch (e) {
            console.error('解析商品基础属性失败:', e, product.attributes?.basicAttrs);
          }
        } else if (typeof product.attributes?.basicAttrs === 'object') {
          // 如果已经是对象，直接使用
          basicAttrsObj = product.attributes?.basicAttrs;
        }
      }
      
      // 如果没有基础属性，检查 attributes
      if (Object.keys(basicAttrsObj).length === 0 && product.attributes) {
        if (typeof product.attributes === 'string') {
          try {
            basicAttrsObj = JSON.parse(product.attributes);
          } catch (e) {
            console.error('解析商品属性失败:', e, product.attributes);
          }
        } else if (typeof product.attributes === 'object') {
          basicAttrsObj = product.attributes;
        }
      }
      
      // 如果没有任何属性，则不匹配任何标签
      if (Object.keys(basicAttrsObj).length === 0) {
        return false;
      }
      
      // 获取所有属性值组成的数组，用于匹配
      const allValues = Object.values(basicAttrsObj).flatMap(value => {
        if (Array.isArray(value)) {
          return value.map(v => String(v).toLowerCase());
        }
        return [String(value).toLowerCase()];
      });
      
      // 检查是否满足选中的场景标签
      const matchesScenes = selectedScenes.length === 0 || 
        selectedScenes.some(scene => 
          allValues.some(value => value.includes(scene.toLowerCase()))
        );
      
      // 检查是否满足选中的风格标签
      const matchesStyles = selectedStyles.length === 0 || 
        selectedStyles.some(style => 
          allValues.some(value => value.includes(style.toLowerCase()))
        );
      
      return matchesScenes && matchesStyles;
    });
  }, [
    selectedScenes, 
    selectedStyles, 
    showSearchResults, 
    searchResults, 
    products,
    selectedCategory,
    categories
  ]);

  // 获取标签函数
  const getTagsByCategory = useCallback((categoryKey: string | null): AttrGroup[] => {
    // 如果是全部商品或没有选择分类，返回所有一级分类目录的标签组
    if (!categoryKey || categoryKey === 'all') {
      const mergedGroups = new Map<string, AttrGroup>();
      
      categories.forEach(category => {
        if (category.attrGroups && Array.isArray(category.attrGroups)) {
          category.attrGroups.forEach(group => {
            if (!mergedGroups.has(group.code)) {
              mergedGroups.set(group.code, { ...group });
            } else {
              const existingGroup = mergedGroups.get(group.code)!;
              const mergedAttrs = [...existingGroup.attrs];
              group.attrs.forEach(attr => {
                if (!mergedAttrs.some(existing => existing.code === attr.code)) {
                  mergedAttrs.push(attr);
                }
              });
              mergedGroups.set(group.code, {
                ...existingGroup,
                attrs: mergedAttrs.sort((a, b) => a.sort - b.sort)
              });
            }
          });
        }
      });

      return Array.from(mergedGroups.values())
        .sort((a, b) => a.sort - b.sort)
        .map(group => ({
          ...group,
          attrs: group.attrs || [] // 确保 attrs 始终是数组
        }));
    }

    // 查找分类及其父级分类
    const findCategoryWithParents = (key: string): {
      firstLevel: CategoryResponse | null;
      secondLevel: CategoryResponse | null;
      thirdLevel: CategoryResponse | null;
    } => {
      for (const category of categories) {
        // 检查是否为一级分类
        if (category.code === key) {
          return {
            firstLevel: category,
            secondLevel: null,
            thirdLevel: null
          };
        }
        
        // 检查二级分类
        for (const subCategory of category.children || []) {
          if (subCategory.code === key) {
            return {
              firstLevel: category,
              secondLevel: subCategory,
              thirdLevel: null
            };
          }
          
          // 检查三级分类
          for (const thirdCategory of subCategory.children || []) {
            if (thirdCategory.code === key) {
              return {
                firstLevel: category,
                secondLevel: subCategory,
                thirdLevel: thirdCategory
              };
            }
          }
        }
      }
      return {
        firstLevel: null,
        secondLevel: null,
        thirdLevel: null
      };
    };

    const { firstLevel, secondLevel, thirdLevel } = findCategoryWithParents(categoryKey);
    
    // 合并相关层级的属性组
    const mergedGroups = new Map<string, AttrGroup>();
    
    // 添加属性组的辅助函数
    const addAttrGroups = (category: CategoryResponse | null) => {
      if (category?.attrGroups) {
        category.attrGroups.forEach(group => {
          if (!mergedGroups.has(group.code)) {
            mergedGroups.set(group.code, { ...group });
          } else {
            const existingGroup = mergedGroups.get(group.code)!;
            const mergedAttrs = [...existingGroup.attrs];
            group.attrs.forEach(attr => {
              if (!mergedAttrs.some(existing => existing.code === attr.code)) {
                mergedAttrs.push(attr);
              }
            });
            mergedGroups.set(group.code, {
              ...existingGroup,
              attrs: mergedAttrs.sort((a, b) => a.sort - b.sort)
            });
          }
        });
      }
    };

    // 按层级添加属性组
    if (firstLevel) {
      addAttrGroups(firstLevel);
    }
    if (secondLevel) {
      addAttrGroups(secondLevel);
    }
    if (thirdLevel) {
      addAttrGroups(thirdLevel);
    }

    return Array.from(mergedGroups.values())
      .sort((a, b) => a.sort - b.sort)
      .map(group => ({
        ...group,
        attrs: group.attrs || [] // 确保 attrs 始终是数组
      }));
  }, [categories]);

  const handleAllCategoriesClick = () => {
    setShowAllCategories(!showAllCategories);
  };

  // 修改 handleSceneSelect 和 handleStyleSelect 函数，确保筛选后更新商品列表
  const handleSceneSelect = useCallback((code: string) => {
    setSelectedScenes(prev => {
      const newSelectedScenes = prev.includes(code)
        ? prev.filter(s => s !== code)
        : [...prev, code];
      
      // 更新筛选后的商品列表
      return newSelectedScenes;
    });
  }, []);

  const handleStyleSelect = useCallback((code: string) => {
    setSelectedStyles(prev => {
      const newSelectedStyles = prev.includes(code)
        ? prev.filter(s => s !== code)
        : [...prev, code];
      
      // 更新筛选后的商品列表
      return newSelectedStyles;
    });
  }, []);

  // 清空标签
  const handleClearScenes = useCallback(() => {
    setSelectedScenes([]);
  }, []);

  const handleClearStyles = useCallback(() => {
    setSelectedStyles([]);
  }, []);

  // 处理搜索框变化
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    
    if (!value.trim()) {
      setShowSearchResults(false);
      setSearchResults([]);
    }
  };

  // 添加类型定义
  const getCurrentCategory = (): CategoryResponse | undefined => {
    if (selectedCategory) {
      return (
        categories.find(c => c.code === selectedCategory) ||
        categories.flatMap(c => c.children || []).find(c => c.code === selectedCategory) ||
        categories.flatMap(c => c.children || []).flatMap(c => c.children || []).find(c => c.code === selectedCategory)
      );
    }
    return undefined;
  };

  // 处理查看更多点击
  const handleViewMore = (categoryCode: string) => {
    setSelectedCategory(categoryCode);
    setShowAllCategories(false);
    setActiveKey(categoryCode);
    setCurrentPage(1);
    
    fetchProducts({
      categoryCodes: categoryCode,
      page: 1,
      pageSize: PAGE_SIZE
    });
  };

  // 简化菜单点击处理
  const handleMenuClick = ({ key }: { key: string }) => {
    const firstLevelKey = getFirstLevelKey(key);
    
    // 清空搜索状态
    setSearchText('');
    setShowSearchResults(false);
    setSearchResults([]);
    
    // 设置导航状态
    setActiveKey(firstLevelKey || key);
    const isAllProducts = key === 'all';
    
    setShowAllCategories(isAllProducts);
    setSelectedCategory(isAllProducts ? '' : key);
    setCurrentPage(1);
    
    // 重置标签选择
    setSelectedScenes([]);
    setSelectedStyles([]);

    // 获取选中分类的商品
    fetchProducts({
      categoryCodes: isAllProducts ? '' : key,
      page: 1,
      pageSize: PAGE_SIZE
    });
  };

  // 处理返回全部商品
  const handleBackToAll = () => {
    setShowSearchResults(false);
    setSearchText('');
    setShowAllCategories(true);
    setSelectedCategory('');
    setActiveKey('all');
    fetchProducts({
      categoryCodes: '',
      page: 1,
      pageSize: PAGE_SIZE
    });
  };

  // 修改 CategoryCardTitle 组件，使用筛选后的商品数量
  const CategoryCardTitle: React.FC<CategoryTitleProps> = ({ 
    category, 
    total, 
    onViewMore,
    searchText 
  }) => (
    <div className={stylesCss.categoryTitle}>
      <div className={stylesCss.titleLeft}>
        <span className={stylesCss.mainTitle}>
          {category.name}
          {searchText && (
            <span className={stylesCss.searchText}>
              搜索"{searchText}"
            </span>
          )}
        </span>
        <span className={stylesCss.subTitle}>共 {total} 件商品</span>
      </div>
      {onViewMore && total > MAX_ITEMS_PER_CATEGORY && (
        <Button 
          type="link" 
          onClick={onViewMore}
          className={stylesCss.moreButton}
        >
          查看更多 <RightOutlined />
        </Button>
      )}
    </div>
  );

  // 修改 renderProductList 函数中的商品数量显示
  const renderProductList = () => {
    if (showSearchResults) {
      const currentCategory = getCurrentCategory();
      return (
        <Card
          className={stylesCss.categoryCard}
          title={
            <CategoryCardTitle
              category={{
                code: currentCategory?.code || 'search',
                name: currentCategory?.name || '全部商品',
                icon: currentCategory?.icon
              }}
              total={filteredTagProducts.length} // 使用筛选后的商品数量
              searchText={searchText}
            />
          }
        >
          {renderProductContent(filteredTagProducts)}
        </Card>
      );
    } else if (showAllCategories) {
      // 全部商品视图 - 只展示有商品的分类
      return (
        <>
          {categories
            .filter(category => {
              // 检查该分类下是否有商品
              const categoryProducts = groupedProducts[category.code];
              return categoryProducts && categoryProducts.length > 0;
            })
            .map(category => {
              // 获取当前分类的商品
              const categoryProducts = groupedProducts[category.code] || [];
              // 获取实际显示的商品数量（最多显示8个）
              const displayProducts = categoryProducts.slice(0, MAX_ITEMS_PER_CATEGORY);
              
              return (
                <Card
                  key={category.code}
                  ref={categoryRefs.current[category.code]}
                  className={stylesCss.categoryCard}
                  title={
                    <CategoryCardTitle
                      category={category}
                      total={categoryProducts.length} // 使用实际的商品总数
                      onViewMore={() => handleViewMore(category.code)}
                    />
                  }
                >
                  <Row gutter={[16, 16]}>
                    {displayProducts.map((product, index) => (
                      <Col span={24 / ITEMS_PER_ROW} key={`${category.code}-${product.id}-${index}`}>
                        {renderProductCard(product, index)}
                      </Col>
                    ))}
                  </Row>
                </Card>
              );
            })}
        </>
      );
    } else {
      const currentCategory = getCurrentCategory();
      return (
        <Card
          className={stylesCss.categoryCard}
          title={
            <CategoryCardTitle
              category={{
                code: currentCategory?.code || '',
                name: currentCategory?.name || '商品列表',
                icon: currentCategory?.icon
              }}
              total={filteredTagProducts.length} // 使用筛选后的商品数量
            />
          }
        >
          {renderProductContent(filteredTagProducts)}
        </Card>
      );
    }
  };

  // 修改 renderProductContent 函数，使用筛选后的商品数量
  const renderProductContent = (productsToRender = filteredTagProducts) => {
    if (productsToRender.length > 0) {
      // 计算当前页应显示的商品
      const startIndex = (currentPage - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      const currentPageProducts = productsToRender.slice(startIndex, endIndex);
      
      return (
        <>
          <Row gutter={[16, 16]}>
            {currentPageProducts.map((product, index) => (
              <Col span={24 / ITEMS_PER_ROW} key={`${product.id}-${index}`}>
                {renderProductCard(product, index)}
              </Col>
            ))}
          </Row>
          {productsToRender.length > PAGE_SIZE && (
            <div className={stylesCss.pagination}>
              <Pagination
                current={currentPage}
                total={productsToRender.length} // 使用筛选后的商品数量
                pageSize={PAGE_SIZE}
                onChange={handlePageChange}
                showTotal={(total) => `共 ${total} 条`}
              />
            </div>
          )}
        </>
      );
    } else {
      return (
        <div className={stylesCss.emptyState}>
          <Empty 
            description={
              <div className={stylesCss.emptyContent}>
                <p>{showSearchResults ? '未找到相关商品' : '该分类下暂无商品'}</p>
                <Button 
                  type="primary"
                  onClick={handleBackToAll}
                >
                  查看全部商品
                </Button>
              </div>
            }
          />
        </div>
      );
    }
  };

  // 修改 TagFilter 组件，添加对 null/undefined 的检查
  const TagFilter: React.FC<{
    tagGroup: AttrGroup;
    selectedTags: string[];
    onTagSelect: (tag: string) => void;
    onClear: () => void;
  }> = ({ tagGroup, selectedTags, onTagSelect, onClear }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [needsExpansion, setNeedsExpansion] = useState(false);

    // 确保 tagGroup.attrs 存在
    const attrs = tagGroup.attrs || [];

    // 检测是否需要展开按钮
    useEffect(() => {
      if (contentRef.current) {
        const needsToExpand = contentRef.current.scrollHeight > contentRef.current.clientHeight;
        setNeedsExpansion(needsToExpand);
        // 如果有选中的标签且需要展开，则自动展开
        if (selectedTags.length > 0 && needsToExpand) {
          setIsExpanded(true);
        }
      }
    }, [attrs, selectedTags]);

    return (
      <div className={stylesCss.tagFilterSection}>
        <div className={stylesCss.tagFilterHeader}>
          <span className={stylesCss.tagFilterTitle}>{tagGroup.name}</span>
        </div>
        <div 
          ref={contentRef}
          className={`${stylesCss.tagFilterContent} ${isExpanded ? stylesCss.expanded : ''}`}
        >
          <div className={stylesCss.tagList}>
            {attrs.map((tag: Attr) => (
              <Tag
                key={tag.code}
                className={`${stylesCss.filterTag} ${selectedTags.includes(tag.code) ? stylesCss.active : ''}`}
                onClick={() => onTagSelect(tag.code)}
              >
                {tag.name}
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
          {needsExpansion && (
            <Button 
              type="link" 
              className={stylesCss.expandButton}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? '收起' : '展开'} 
              {isExpanded ? <CaretUpOutlined /> : <CaretDownOutlined />}
            </Button>
          )}
        </div>
      </div>
    );
  };

  // 修改 renderTagFilters 函数，添加额外的检查
  const renderTagFilters = useCallback(() => {
    const currentTags = getTagsByCategory(activeKey === 'all' ? null : selectedCategory);
    
    if (!currentTags || !currentTags.length) {
      return null;
    }

    return (
      <div className={stylesCss.filterContainer}>
        <div className={stylesCss.filterHeader}>
          {currentTags.map(tagGroup => {
            // 确保 tagGroup 和 tagGroup.attrs 都存在
            if (!tagGroup || !tagGroup.attrs) {
              return null;
            }
            
            return (
              <TagFilter
                key={tagGroup.code}
                tagGroup={{
                  ...tagGroup,
                  attrs: tagGroup.attrs || [] // 确保 attrs 始终是数组
                }}
                selectedTags={tagGroup.code === 'scene' ? selectedScenes : selectedStyles}
                onTagSelect={tagGroup.code === 'scene' ? handleSceneSelect : handleStyleSelect}
                onClear={tagGroup.code === 'scene' ? handleClearScenes : handleClearStyles}
              />
            );
          })}
        </div>
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
    if (categories.find(c => c.code === key)) {
      return key;
    }
    
    // 查找二级分类所属的一级分类
    for (const category of categories) {
      if (category.children?.some(sub => sub.code === key)) {
        return category.code;
      }
      // 查找三级分类所属的一级分类
      for (const subCategory of category.children || []) {
        if (subCategory.children?.some(third => third.code === key)) {
          return category.code;
        }
      }
    }
    return key; // 如果找不到对应的一级分类，返回原key
  };

  // 添加样式类
  const styles = {
    // ... existing styles ...
    viewMoreContainer: {
      textAlign: 'center',
      marginTop: '16px',
    },
    viewMoreButton: {
      fontSize: '14px',
    },
  };

  return (
    <Layout>
      <Header className={stylesCss.header}>
        <Row align="middle">
          <Col span={17}>
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
              {(categories || []).map(category => (
                <Menu.SubMenu 
                  key={category.code} 
                  icon={category.icon} 
                  title={category.name}
                  onTitleClick={({ key }) => handleMenuClick({ key })} // 添加一级菜单标题点击处理
               >
                  {category.children?.map(subCategory => (
                    <Menu.SubMenu 
                      key={subCategory.code} 
                      title={subCategory.name}
                      onTitleClick={({ key }) => handleMenuClick({ key })} // 添加二级菜单标题点击处理
                    >
                      {subCategory.children?.map(item => (
                        <Menu.Item key={item.code}>
                          {item.name}
                        </Menu.Item>
                      ))}
                    </Menu.SubMenu>
                  ))}
                </Menu.SubMenu>
              ))}
            </Menu>
          </Col>
          <Col span={6}>
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
        {loading ? (
          <div className={stylesCss.loading}>
            <Spin size="large" />
          </div>
        ) : (
          renderProductList()
        )}
      </div>
    </Layout>
   
  )
};

export default MallIndex;