import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Select, Tag, Space, Modal, Form, message, TreeSelect } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, AppstoreOutlined } from '@ant-design/icons';
import AdminContentCard from '../../AdminContentCard';
import { getProductList, getCategoryList } from '../../../../api/apiService';
import type { Product, CategoryResponse, ProductListRequest, AttrGroup } from '../../../../api/apiService';
import type { UploadFile } from 'antd/es/upload/interface';
import type { ColumnsType } from 'antd/es/table';
import { SpecCombination } from './types';
import { findCategoryById, findCategoryName, generateSpecCombinations, processProductImages, extractImageUrls, parseProductAttributes } from './utils';
import styles from './ProductsManage.module.scss';
import ProductForm from './ProductForm';

const { TreeNode } = TreeSelect;

const ProductsManage: React.FC = () => {
  // 状态定义
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<ProductListRequest>({
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
  const [specAttrs, setSpecAttrs] = useState<Record<string, string[]>>({});
  const [specCombinations, setSpecCombinations] = useState<SpecCombination[]>([]);
  
  // 基础属性状态
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [attrGroups, setAttrGroups] = useState<AttrGroup[]>([]);
  const [selectedCategoryPath, setSelectedCategoryPath] = useState<string[]>([]);

  // 添加文件列表状态
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // 获取分类列表
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategoryList();
        setCategories(categoriesData);
      } catch (error) {
        console.error('获取分类列表失败:', error);
        message.error('获取分类列表失败');
      }
    };
    fetchCategories();
  }, []);

  // 获取商品列表
  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

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
      console.error('获取商品列表失败:', error);
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
        <a href={`/mall/product/${record.id}`} target="_blank" rel="noopener noreferrer">{name}</a>
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
        
        const name1 = record.category1Id ? findCategoryName(categories, record.category1Id) : '未知分类';
        const name2 = record.category2Id ? findCategoryName(categories, record.category2Id) : '未知分类';
        const name3 = record.category3Id ? findCategoryName(categories, record.category3Id) : '未知分类';
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
        <Tag color={status === 1 ? 'green' : 'red'}>
          {status === 1 ? '上架' : '下架'}
        </Tag>
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
    
    // 处理图片数据
    const imageFileList = processProductImages(product.images);
    setFileList(imageFileList);
    
    try {
      // 解析商品属性
      const { basicAttrsData, saleAttrsData, specAttrsData } = parseProductAttributes(product);
      
      // 设置表单初始值
      const initialValues: any = {
        name: product.name,
        code: product.code,
        price: product.price,
        realPrice: product.realPrice,
        totalStock: product.totalStock,
        status: product.status === 1,
        description: product.description,
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
        const category = findCategoryById(categories, product.category3Id);
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
        group.attrs.forEach((attr: any) => {
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
      const images = extractImageUrls(fileList);
      
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

  // 处理规格组合生成
  const handleGenerateSpecCombinations = () => {
    const combinations = generateSpecCombinations(
      specAttrs, 
      specCombinations, 
      currentProduct?.realPrice || 0
    );
    setSpecCombinations(combinations);
  };

  // 渲染分类树
  const renderCategoryTree = (categories: CategoryResponse[]) => {
    return categories.map(category => (
      <TreeNode 
        value={category.id.toString()} 
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
    setFileList([]);
    setSpecCombinations([]);
    setSpecAttrs({});
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
    const numValue = parseInt(value, 10);
    const category = findCategoryById(categories, numValue);
    if (category && category.attrGroups) {
      setAttrGroups(category.attrGroups);
    } else {
      setAttrGroups([]);
    }
  };

  // 处理图片变化
  const handleImageChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList);
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
            onChange={(value) => setSearchParams({ ...searchParams, categoryCodes: value as string })}
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

      {isModalVisible && (
        <ProductForm
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          onOk={handleFormSubmit}
          form={form}
          product={currentProduct}
          categories={categories}
          attrGroups={attrGroups}
          fileList={fileList}
          specCombinations={specCombinations}
          setSpecCombinations={setSpecCombinations}
          onFileChange={handleImageChange}
          onCategoryChange={handleCategoryChange}
          generateSpecCombinations={handleGenerateSpecCombinations}
        />
      )}
    </AdminContentCard>
  );
};

export default ProductsManage; 