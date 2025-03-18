import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Select, Tag, Space, Modal, Form, Upload, InputNumber, Switch, message, Tabs, Card, Divider, TreeSelect } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, AppstoreOutlined, MinusCircleOutlined } from '@ant-design/icons';
import AdminContentCard from '../../admin/AdminContentCard';
import { getProductList, getCategoryList, type Product, type CategoryResponse, type Attr, type AttrGroup } from '../../../api/apiService';
import type { ColumnsType } from 'antd/es/table';
import styles from './ProductsManage.module.scss';

const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;
const { TreeNode } = TreeSelect;

// 销售属性和规格属性的接口
interface AttributeItem {
  key: string;
  value: string;
}

// 规格组合接口
interface SpecCombination {
  id: string;
  specs: Record<string, string>;
  price: number;
  stock: number;
  skuCode: string;
}

const ProductsManage: React.FC = () => {
  // 状态定义
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState({
    categoryCodes: '',
    productName: '',
    page: 1,
    pageSize: 10
  });
  const [total, setTotal] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [form] = Form.useForm();
  
  // 销售属性和规格属性状态
  const [saleAttrs, setSaleAttrs] = useState<AttributeItem[]>([{ key: '', value: '' }]);
  const [specAttrs, setSpecAttrs] = useState<Record<string, string[]>>({});
  const [specCombinations, setSpecCombinations] = useState<SpecCombination[]>([]);
  const [activeTab, setActiveTab] = useState('basic');
  
  // 基础属性状态
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [attrGroups, setAttrGroups] = useState<AttrGroup[]>([]);
  const [basicAttrs, setBasicAttrs] = useState<Record<number, string>>({});
  const [selectedCategoryPath, setSelectedCategoryPath] = useState<string[]>([]);

  // 获取分类列表
  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getCategoryList();
      setCategories(categoriesData);
    };
    fetchCategories();
  }, []);

  // 获取商品列表
  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  // 当规格属性变化时，重新生成规格组合
  useEffect(() => {
    generateSpecCombinations();
  }, [specAttrs]);

  // 当选择分类变化时，获取对应的属性组
  useEffect(() => {
    if (selectedCategory) {
      const findCategoryWithAttrs = (cats: CategoryResponse[], categoryId: string): CategoryResponse | null => {
        for (const cat of cats) {
          if (cat.id.toString() === categoryId) {
            return cat;
          }
          if (cat.children && cat.children.length > 0) {
            const found = findCategoryWithAttrs(cat.children, categoryId);
            if (found) return found;
          }
        }
        return null;
      };

      const category = findCategoryWithAttrs(categories, selectedCategory);
      if (category && category.attrGroups) {
        setAttrGroups(category.attrGroups);
      } else {
        setAttrGroups([]);
      }
    } else {
      setAttrGroups([]);
    }
  }, [selectedCategory, categories]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getProductList(searchParams);
      const allProducts: Product[] = [];
      
      if (response.categories && response.categories.length > 0) {
        response.categories.forEach(category => {
          if (category.products) {
            allProducts.push(...category.products);
          }
        });
      }
      
      setProducts(allProducts);
      setTotal(response.total);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      message.error('获取商品列表失败');
    } finally {
      setLoading(false);
    }
  };

  // 表格列定义
  const columns: ColumnsType<Product> = [
    {
      title: '商品图片',
      dataIndex: 'images',
      key: 'images',
      width: 80,
      fixed: 'left',
      render: (images: string[]) => (
        <img 
          src={images && images.length > 0 ? images[0] : '/placeholder.png'} 
          alt="商品图片" 
          style={{ width: 50, height: 50, objectFit: 'cover' }} 
        />
      ),
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      fixed: 'left',
      ellipsis: true,
      render: (name: string, record: Product) => (
        <a href={`/admin/mall/products/${record.id}`} target="_blank" rel="noopener noreferrer">{name}</a>
      ),
    },
    {
      title: '商品分类',
      dataIndex: 'categoryName',
      key: 'categoryName',
      width: 200,
      ellipsis: true,
      render: (categoryName: string, record: Product) => {
        if (categoryName) {
          return <Tag color="blue">{categoryName}</Tag>;
        }
        const findCategoryName = (cats: CategoryResponse[], categoryId: string): string | null => {
          for (const cat of cats) {
            if (cat.id.toString() === categoryId) {
              return cat.name;
            }
            if (cat.children && cat.children.length > 0) {
              const found = findCategoryName(cat.children, categoryId);
              if (found) return found;
            }
          }
          return null;
        };
        
        const name1 = record.category1Id ? findCategoryName(categories, record.category1Id.toString()) : '未知分类';
        const name2 = record.category2Id ? findCategoryName(categories, record.category2Id.toString()) : '未知分类';
        const name3 = record.category3Id ? findCategoryName(categories, record.category3Id.toString()) : '未知分类';
        return <Tag color="blue">{name1} - {name2} - {name3}</Tag>;
      },
    },
    {
      title: '原价',
      dataIndex: 'price',
      key: 'price',
      width: 100,
      render: (price: number) => (
        <span>¥{price.toFixed(2)}</span>
      ),
    },
    {
      title: '实际价格',
      dataIndex: 'realPrice',
      key: 'realPrice',
      width: 100,
      render: (realPrice: number) => (
        <span>¥{realPrice.toFixed(2)}</span>
      ),
    },
    {
      title: '总库存',
      dataIndex: 'totalStock',
      key: 'totalStock',
      width: 100,
      render: (totalStock: number) => (
        <span>{totalStock}</span>
      ),
    },
    {
      title: '商品状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: number) => (
        <span>{status === 1 ? '上架' : '下架'}</span>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      fixed: 'right',
      render: (_text, record) => (
        <Space size="middle">
          <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record)}>编辑</Button>
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>删除</Button>
        </Space>
      ),
    },
  ];

  // 处理编辑商品
  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    
    // 解析商品属性
    try {
      // 解析基础属性
      const basicAttrsData = product.attributes?.basicAttrs ? JSON.parse(product.attributes.basicAttrs) : {};
      // 解析销售属性
      const saleAttrsData = product.attributes?.saleAttrs ? JSON.parse(product.attributes.saleAttrs) : {};
      // 解析规格属性
      const specAttrsData = product.attributes?.specAttrs ? JSON.parse(product.attributes.specAttrs) : {};
      
      // 设置表单初始值
      const initialValues: any = {
        name: product.name,
        code: product.code,
        price: product.price,
        realPrice: product.realPrice,
        totalStock: product.totalStock,
        status: product.status === 1,
        description: product.description,
        images: product.images?.map(img => ({
          uid: img,
          name: img.split('/').pop(),
          status: 'done',
          url: img
        })) || [],
        // 设置分类
        categoryId: product.category3Id ? product.category3Id.toString() : undefined,
      };
      
      // 设置基础属性初始值
      Object.entries(basicAttrsData).forEach(([attrId, attrValue]: [string, any]) => {
        initialValues[`basicAttr_${attrId}`] = attrValue.value;
      });
      
      // 设置销售属性初始值
      const saleAttrsArray = Object.entries(saleAttrsData).map(([key, value]) => ({
        key,
        value: value as string
      }));
      initialValues.saleAttrs = saleAttrsArray.length > 0 ? saleAttrsArray : [{ key: '', value: '' }];
      
      // 设置规格属性初始值
      const specAttrsArray = Object.entries(specAttrsData).map(([key, values]) => ({
        key,
        values: values as string[]
      }));
      initialValues.specAttrs = specAttrsArray.length > 0 ? specAttrsArray : [{ key: '', values: [] }];
      
      // 设置规格属性状态
      setSpecAttrs(specAttrsData);
      
      // 设置SKU列表
      if (product.skuList && product.skuList.length > 0) {
        const combinations: SpecCombination[] = product.skuList.map((sku, index) => ({
          id: `spec_${index}`,
          specs: typeof sku.attrParams === 'string' ? JSON.parse(sku.attrParams) : {},
          price: sku.price,
          stock: sku.stock,
          skuCode: sku.skuCode
        }));
        setSpecCombinations(combinations);
      }
      
      // 设置分类和属性组
      if (product.category3Id) {
        setSelectedCategory(product.category3Id.toString());
        const category = findCategoryById(categories, product.category3Id.toString());
        if (category && category.attrGroups) {
          setAttrGroups(category.attrGroups);
        }
      }
      
      // 重置表单并设置初始值
      form.resetFields();
      form.setFieldsValue(initialValues);
    } catch (error) {
      console.error('解析商品属性失败:', error);
      message.error('解析商品属性失败');
    }
    
    setIsModalVisible(true);
  };

  // 处理删除商品
  const handleDelete = (product: Product) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除商品 "${product.name}" 吗？`,
      onOk: async () => {
        // 这里应该调用删除API
        message.success('商品删除成功');
        fetchProducts();
      },
    });
  };

  // 处理表单提交
  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      // 处理基础属性
      const basicAttrsData = attrGroups.reduce((acc, group) => {
        group.attrs.forEach(attr => {
          if (values[`basicAttr_${attr.id}`]) {
            acc[attr.id] = {
              name: attr.name,
              value: values[`basicAttr_${attr.id}`]
            };
          }
        });
        return acc;
      }, {} as Record<string, { name: string; value: string }>);
      
      // 处理销售属性
      const saleAttrsData = values.saleAttrs?.reduce((acc: Record<string, string>, curr: { key: string; value: string }) => {
        if (curr.key && curr.value) {
          acc[curr.key] = curr.value;
        }
        return acc;
      }, {}) || {};
      
      // 处理规格属性
      const specAttrsData = values.specAttrs?.reduce((acc: Record<string, string[]>, curr: { key: string; values: string[] }) => {
        if (curr.key && curr.values && curr.values.length > 0) {
          acc[curr.key] = curr.values;
        }
        return acc;
      }, {}) || {};
      
      // 处理规格组合
      const skuList = specCombinations.map(combination => ({
        skuCode: combination.skuCode,
        price: combination.price,
        stock: combination.stock,
        attrParams: JSON.stringify(combination.specs)
      }));
      
      // 处理图片
      const images = values.images?.map((img: any) => {
        if (img.url) return img.url;
        if (img.response) return img.response.url;
        return '';
      }).filter(Boolean) || [];
      
      // 构建商品数据
      const productData = {
        ...values,
        status: values.status ? 1 : 0,
        images,
        attributes: {
          basicAttrs: JSON.stringify(basicAttrsData),
          saleAttrs: JSON.stringify(saleAttrsData),
          specAttrs: JSON.stringify(specAttrsData)
        },
        skuList,
        categoryPath: selectedCategoryPath
      };
      
      console.log('提交的商品数据:', productData);
      
      // 这里应该调用添加/更新API
      message.success(currentProduct ? '商品更新成功' : '商品添加成功');
      setIsModalVisible(false);
      fetchProducts();
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  // 生成规格组合
  const generateSpecCombinations = () => {
    // 如果没有规格属性，则返回空数组
    if (Object.keys(specAttrs).length === 0) {
      setSpecCombinations([]);
      return;
    }

    // 获取所有规格属性的键和值
    const specKeys = Object.keys(specAttrs);
    const specValues = specKeys.map(key => specAttrs[key]);

    // 生成所有可能的规格组合
    const generateCombinations = (index: number, current: Record<string, string>): Record<string, string>[] => {
      if (index === specKeys.length) {
        return [current];
      }

      const key = specKeys[index];
      const values = specValues[index];
      const result: Record<string, string>[] = [];

      values.forEach(value => {
        const newCurrent = { ...current, [key]: value };
        result.push(...generateCombinations(index + 1, newCurrent));
      });

      return result;
    };

    // 生成所有组合
    const allCombinations = generateCombinations(0, {});

    // 转换为SpecCombination格式
    const combinations: SpecCombination[] = allCombinations.map((specs, index) => {
      // 查找现有的组合，如果存在则保留价格和库存
      const existingCombination = specCombinations.find(c => {
        return Object.keys(specs).every(key => c.specs[key] === specs[key]);
      });

      return {
        id: existingCombination?.id || `spec_${index}`,
        specs,
        price: existingCombination?.price || (currentProduct?.realPrice || 0),
        stock: existingCombination?.stock || 0,
        skuCode: existingCombination?.skuCode || `SKU_${Date.now()}_${index}`
      };
    });

    setSpecCombinations(combinations);
  };

  // 渲染规格组合表格
  const renderSpecCombinationsTable = () => {
    if (specCombinations.length === 0) {
      return (
        <div className={styles.emptySpec}>
          <p>请先添加规格属性并生成规格组合</p>
        </div>
      );
    }

    // 构建表格列
    const columns = [
      ...Object.keys(specCombinations[0]?.specs || {}).map(key => ({
        title: key,
        dataIndex: ['specs', key],
        key,
        width: 120,
      })),
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        width: 120,
        render: (_: any, record: SpecCombination) => (
          <Form.Item
            name={['specCombinations', record.id, 'price']}
            initialValue={record.price}
            noStyle
          >
            <InputNumber
              min={0}
              precision={2}
              style={{ width: '100%' }}
              onChange={(value) => {
                // 更新价格
                const newCombinations = specCombinations.map(c => {
                  if (c.id === record.id) {
                    return { ...c, price: value || 0 };
                  }
                  return c;
                });
                setSpecCombinations(newCombinations);
              }}
            />
          </Form.Item>
        ),
      },
      {
        title: '库存',
        dataIndex: 'stock',
        key: 'stock',
        width: 120,
        render: (_: any, record: SpecCombination) => (
          <Form.Item
            name={['specCombinations', record.id, 'stock']}
            initialValue={record.stock}
            noStyle
          >
            <InputNumber
              min={0}
              style={{ width: '100%' }}
              onChange={(value) => {
                // 更新库存
                const newCombinations = specCombinations.map(c => {
                  if (c.id === record.id) {
                    return { ...c, stock: value || 0 };
                  }
                  return c;
                });
                setSpecCombinations(newCombinations);
              }}
            />
          </Form.Item>
        ),
      },
      {
        title: 'SKU编码',
        dataIndex: 'skuCode',
        key: 'skuCode',
        width: 150,
        render: (_: any, record: SpecCombination) => (
          <Form.Item
            name={['specCombinations', record.id, 'skuCode']}
            initialValue={record.skuCode}
            noStyle
          >
            <Input
              onChange={(e) => {
                // 更新SKU编码
                const newCombinations = specCombinations.map(c => {
                  if (c.id === record.id) {
                    return { ...c, skuCode: e.target.value };
                  }
                  return c;
                });
                setSpecCombinations(newCombinations);
              }}
            />
          </Form.Item>
        ),
      },
    ];

    return (
      <div className={styles.specCombinationsTable}>
        <div className={styles.batchActions}>
          <Button
            type="primary"
            onClick={() => {
              // 批量设置价格
              Modal.confirm({
                title: '批量设置价格',
                content: (
                  <InputNumber
                    min={0}
                    precision={2}
                    style={{ width: '100%' }}
                    placeholder="请输入价格"
                    onChange={(value) => {
                      if (value) {
                        const newCombinations = specCombinations.map(c => ({
                          ...c,
                          price: value
                        }));
                        setSpecCombinations(newCombinations);
                      }
                    }}
                  />
                ),
                onOk: () => {},
              });
            }}
          >
            批量设置价格
          </Button>
          <Button
            style={{ marginLeft: 8 }}
            onClick={() => {
              // 批量设置库存
              Modal.confirm({
                title: '批量设置库存',
                content: (
                  <InputNumber
                    min={0}
                    style={{ width: '100%' }}
                    placeholder="请输入库存"
                    onChange={(value) => {
                      if (value) {
                        const newCombinations = specCombinations.map(c => ({
                          ...c,
                          stock: value
                        }));
                        setSpecCombinations(newCombinations);
                      }
                    }}
                  />
                ),
                onOk: () => {},
              });
            }}
          >
            批量设置库存
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={specCombinations}
          rowKey="id"
          pagination={false}
          size="small"
          scroll={{ x: 'max-content' }}
        />
      </div>
    );
  };

  // 查找分类
  const findCategoryById = (categories: CategoryResponse[], id: string): CategoryResponse | null => {
    for (const cat of categories) {
      if (cat.id.toString() === id) {
        return cat;
      }
      if (cat.children && cat.children.length > 0) {
        const found = findCategoryById(cat.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  // 渲染分类树
  const renderCategoryTree = (categories: CategoryResponse[]) => {
    return categories.map(category => (
      <TreeNode 
        value={category.id} 
        title={category.name} 
        key={category.id}
      >
        {category.children && renderCategoryTree(category.children)}
      </TreeNode>
    ));
  };

  // 处理搜索
  const handleSearch = () => {
    fetchProducts();
  };

  // 处理添加商品
  const handleAdd = () => {
    setCurrentProduct(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  // 处理表格变化
  const handleTableChange = (pagination: any) => {
    setSearchParams({
      ...searchParams,
      page: pagination.current,
      pageSize: pagination.pageSize
    });
  };

  // 修改分类选择处理逻辑
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    const category = findCategoryById(categories, value);
    if (category && category.attrGroups) {
      setAttrGroups(category.attrGroups);
    } else {
      setAttrGroups([]);
    }
  };

  // 优化基础属性表单
  const renderBasicAttrsForm = () => {
    return (
      <div className={styles.attrFormSection}>
        {attrGroups.map(group => (
          <Card key={group.id} title={group.name} style={{ marginBottom: 16 }}>
            {group.attrs.map(attr => {
              // 从 attr.code 解析选项
              const options = attr.type === 1 ? attr.code.split(',') : [];
              
              return (
                <Form.Item
                  key={attr.id}
                  label={attr.name}
                  name={`basicAttr_${attr.id}`}
                  rules={[{ required: attr.status === 1, message: `请输入${attr.name}` }]}
                >
                  {attr.type === 1 ? (
                    <Select placeholder={`请选择${attr.name}`}>
                      {options.map(option => (
                        <Option key={option} value={option}>{option}</Option>
                      ))}
                    </Select>
                  ) : (
                    <Input placeholder={`请输入${attr.name}`} />
                  )}
                </Form.Item>
              );
            })}
          </Card>
        ))}
      </div>
    );
  };

  // 优化规格属性表单
  const renderSpecAttrsForm = () => {
    return (
      <div className={styles.attrFormSection}>
        <Form.List name="specAttrs">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className={styles.attrRow}>
                  <Form.Item
                    {...restField}
                    name={[name, 'key']}
                    rules={[{ required: true, message: '请输入规格名' }]}
                  >
                    <Input placeholder="规格名" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'values']}
                    rules={[{ required: true, message: '请输入规格值' }]}
                  >
                    <Select
                      mode="tags"
                      placeholder="输入规格值，按回车确认"
                      tokenSeparators={[',']}
                      onChange={(values) => {
                        // 更新规格属性状态
                        const formValues = form.getFieldsValue();
                        const specAttrsData: Record<string, string[]> = {};
                        
                        formValues.specAttrs?.forEach((item: any) => {
                          if (item.key && item.values) {
                            specAttrsData[item.key] = item.values;
                          }
                        });
                        
                        setSpecAttrs(specAttrsData);
                      }}
                    />
                  </Form.Item>
                  <Button
                    type="text"
                    icon={<MinusCircleOutlined />}
                    onClick={() => {
                      remove(name);
                      // 更新规格属性状态
                      setTimeout(() => {
                        const formValues = form.getFieldsValue();
                        const specAttrsData: Record<string, string[]> = {};
                        
                        formValues.specAttrs?.forEach((item: any) => {
                          if (item.key && item.values) {
                            specAttrsData[item.key] = item.values;
                          }
                        });
                        
                        setSpecAttrs(specAttrsData);
                      }, 0);
                    }}
                    danger
                  />
                </div>
              ))}
              <Button
                type="dashed"
                onClick={() => add({ key: '', values: [] })}
                block
                icon={<PlusOutlined />}
              >
                添加规格属性
              </Button>
              <Divider />
              <Button
                type="primary"
                onClick={() => {
                  // 生成规格组合
                  const formValues = form.getFieldsValue();
                  const specAttrsData: Record<string, string[]> = {};
                  
                  formValues.specAttrs?.forEach((item: any) => {
                    if (item.key && item.values) {
                      specAttrsData[item.key] = item.values;
                    }
                  });
                  
                  setSpecAttrs(specAttrsData);
                }}
                style={{ marginBottom: 16 }}
              >
                生成规格组合
              </Button>
              {renderSpecCombinationsTable()}
            </>
          )}
        </Form.List>
      </div>
    );
  };

  // 优化销售属性表单
  const renderSaleAttrsForm = () => {
    return (
      <div className={styles.attrFormSection}>
        <Form.List name="saleAttrs">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className={styles.attrRow}>
                  <Form.Item
                    {...restField}
                    name={[name, 'key']}
                    rules={[{ required: true, message: '请输入属性名' }]}
                  >
                    <Input placeholder="属性名" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'value']}
                    rules={[{ required: true, message: '请输入属性值' }]}
                  >
                    <Input placeholder="属性值" />
                  </Form.Item>
                  <Button
                    type="text"
                    icon={<MinusCircleOutlined />}
                    onClick={() => remove(name)}
                    danger
                  />
                </div>
              ))}
              <Button
                type="dashed"
                onClick={() => add({ key: '', value: '' })}
                block
                icon={<PlusOutlined />}
              >
                添加销售属性
              </Button>
            </>
          )}
        </Form.List>
      </div>
    );
  };

  return (
    <AdminContentCard title="商品管理" icon={<AppstoreOutlined />} >
      <div className={styles.searchContainer}>
        <div className={styles.searchForm}>
          <Input
            placeholder="商品名称"
            value={searchParams.productName}
            onChange={(e) => setSearchParams({ ...searchParams, productName: e.target.value })}
            style={{ width: 200, marginRight: 16 }}
            prefix={<SearchOutlined />}
          />
          <TreeSelect
            placeholder="选择分类"
            style={{ width: 200, marginRight: 16 }}
            onChange={handleCategoryChange}
            allowClear
            treeDefaultExpandAll
            showSearch
            treeNodeFilterProp="title"
          >
            {renderCategoryTree(categories)}
          </TreeSelect>
          <Button type="primary" onClick={handleSearch}>搜索</Button>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          添加商品
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={products}
        rowKey="id"
        loading={loading}
        scroll={{ x: 'max-content' }}
        pagination={{
          current: searchParams.page,
          pageSize: searchParams.pageSize,
          total: total,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条记录`,
        }}
        onChange={handleTableChange}
      />

      {/* 添加/编辑商品表单 */}
      <Modal
        title={currentProduct ? '编辑商品' : '添加商品'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleFormSubmit}
        width={900}
        destroyOnClose
      >
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="基本信息" key="basic">
            <Form
              form={form}
              layout="vertical"
              initialValues={{ status: 1 }}
            >
              <div className={styles.formGrid}>
                <Form.Item
                  name="name"
                  label="商品名称"
                  rules={[{ required: true, message: '请输入商品名称' }]}
                >
                  <Input placeholder="请输入商品名称" />
                </Form.Item>

                <Form.Item
                  name="code"
                  label="商品编码"
                  rules={[{ required: true, message: '请输入商品编码' }]}
                >
                  <Input placeholder="请输入商品编码" />
                </Form.Item>

                <Form.Item
                  name="categoryId"
                  label="商品分类"
                  rules={[{ required: true, message: '请选择商品分类' }]}
                >
                  <TreeSelect
                    placeholder="请选择分类"
                    treeDefaultExpandAll
                    showSearch
                    treeNodeFilterProp="title"
                    onChange={(value) => {
                      setSelectedCategory(value as string);
                      // 构建分类路径
                      const buildCategoryPath = (cats: CategoryResponse[], id: string, path: string[] = []): string[] => {
                        for (const cat of cats) {
                          if (cat.id.toString() === id) {
                            return [...path, cat.id.toString()];
                          }
                          if (cat.children && cat.children.length > 0) {
                            const foundPath = buildCategoryPath(cat.children, id, [...path, cat.id.toString()]);
                            if (foundPath.length > 0) return foundPath;
                          }
                        }
                        return [];
                      };
                      
                      const categoryPath = buildCategoryPath(categories, value as string);
                      setSelectedCategoryPath(categoryPath);
                    }}
                  >
                    {renderCategoryTree(categories)}
                  </TreeSelect>
                </Form.Item>

                <Form.Item
                  name="brand"
                  label="品牌"
                >
                  <Input placeholder="请输入品牌" />
                </Form.Item>

                <Form.Item
                  name="price"
                  label="原价"
                  rules={[{ required: true, message: '请输入原价' }]}
                >
                  <InputNumber
                    min={0}
                    precision={2}
                    style={{ width: '100%' }}
                    placeholder="请输入原价"
                    addonBefore="¥"
                  />
                </Form.Item>

                <Form.Item
                  name="realPrice"
                  label="实际价格"
                  rules={[{ required: true, message: '请输入实际价格' }]}
                >
                  <InputNumber
                    min={0}
                    precision={2}
                    style={{ width: '100%' }}
                    placeholder="请输入实际价格"
                    addonBefore="¥"
                  />
                </Form.Item>

                <Form.Item
                  name="totalStock"
                  label="总库存"
                  rules={[{ required: true, message: '请输入总库存' }]}
                >
                  <InputNumber
                    min={0}
                    style={{ width: '100%' }}
                    placeholder="请输入总库存"
                  />
                </Form.Item>

                <Form.Item
                  name="status"
                  label="商品状态"
                  valuePropName="checked"
                >
                  <Switch checkedChildren="上架" unCheckedChildren="下架" />
                </Form.Item>
              </div>

              <Form.Item
                name="description"
                label="商品描述"
              >
                <TextArea rows={4} placeholder="请输入商品描述" />
              </Form.Item>

              <Form.Item
                name="images"
                label="商品图片"
              >
                <Upload
                  listType="picture-card"
                  beforeUpload={() => false}
                  maxCount={5}
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>上传</div>
                  </div>
                </Upload>
              </Form.Item>

              <Form.Item
                name="tags"
                label="商品标签"
              >
                <Select mode="tags" placeholder="请输入标签，按回车确认">
                </Select>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="基础属性" key="basicAttrs">
            {renderBasicAttrsForm()}
          </TabPane>
          <TabPane tab="销售属性" key="saleAttrs">
            {renderSaleAttrsForm()}
          </TabPane>
          <TabPane tab="规格属性" key="specAttrs">
            {renderSpecAttrsForm()}
          </TabPane>
          
        </Tabs>
      </Modal>
    </AdminContentCard>
  );
};

export default ProductsManage;
    
    
