import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Modal, Select, Switch, Tabs, Upload, Button, Space, Table, TreeSelect, message } from 'antd';
import { PlusOutlined, DeleteOutlined, MinusCircleOutlined, UploadOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import type { Product, CategoryResponse, AttrGroup } from '../../../../api/apiService';
import { findCategoryById, findCategoryName } from './utils';
import type { SpecCombination } from './types';
import styles from './ProductsManage.module.scss';

const { Option } = Select;
const { TextArea } = Input;
const { TreeNode } = TreeSelect;

interface ProductFormProps {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  form: FormInstance;
  product: Product | null;
  categories: CategoryResponse[];
  attrGroups: AttrGroup[];
  fileList: UploadFile[];
  specCombinations: SpecCombination[];
  setSpecCombinations: React.Dispatch<React.SetStateAction<SpecCombination[]>>;
  onFileChange: (info: any) => void;
  onCategoryChange: (value: string) => void;
  generateSpecCombinations: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  visible,
  onCancel,
  onOk,
  form,
  product,
  categories,
  attrGroups,
  fileList,
  specCombinations,
  setSpecCombinations,
  onFileChange,
  onCategoryChange,
  generateSpecCombinations
}) => {
  const [activeTab, setActiveTab] = useState('1');
  
  // 规格组合表格列定义
  const specColumns = [
    {
      title: '规格组合',
      dataIndex: 'specs',
      key: 'specs',
      render: (specs: Record<string, string>) => (
        <div>
          {Object.entries(specs).map(([key, value]) => (
            <span key={key} className={styles.specTag}>
              {key}: {value}
            </span>
          ))}
        </div>
      ),
    },
    {
      title: 'SKU编码',
      dataIndex: 'skuCode',
      key: 'skuCode',
      render: (skuCode: string, record: SpecCombination, index: number) => (
        <Input
          value={skuCode}
          onChange={(e) => handleSpecChange(record.id, 'skuCode', e.target.value)}
        />
      ),
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      render: (price: number, record: SpecCombination) => (
        <InputNumber
          min={0}
          precision={2}
          value={price}
          onChange={(value) => handleSpecChange(record.id, 'price', value)}
        />
      ),
    },
    {
      title: '库存',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock: number, record: SpecCombination) => (
        <InputNumber
          min={0}
          value={stock}
          onChange={(value) => handleSpecChange(record.id, 'stock', value)}
        />
      ),
    },
  ];

  // 上传配置
  const uploadProps: UploadProps = {
    name: 'file',
    listType: 'picture-card',
    fileList,
    onChange: onFileChange,
    beforeUpload: (file) => {
      // 这里可以检查文件类型和大小
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('只能上传图片文件!');
        return Upload.LIST_IGNORE;
      }
      return false; // 阻止自动上传，由前端控制
    },
    customRequest: ({ file, onSuccess }) => {
      // 模拟上传成功，实际项目中应该调用真实的上传API
      setTimeout(() => {
        onSuccess?.('ok');
      }, 0);
    },
    onPreview: (file) => {
      window.open(file.url || file.thumbUrl, '_blank');
    },
  };

  // 处理规格变更
  const handleSpecChange = (id: string, field: string, value: any) => {
    const newCombinations = specCombinations.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setSpecCombinations(newCombinations);
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

  // Tab项配置
  const items = [
    {
      key: '1',
      label: '基本信息',
      children: (
        <div className={styles.formSection}>
          <div className={styles.formCard}>
            <div className={styles.sectionTitle}>核心信息</div>
            <div className={styles.formGrid}>
              <Form.Item
                label="商品名称"
                name="name"
                rules={[{ required: true, message: '请输入商品名称' }]}
              >
                <Input placeholder="请输入商品名称" />
              </Form.Item>
              
              <Form.Item
                label="商品编码"
                name="code"
                rules={[{ required: true, message: '请输入商品编码' }]}
              >
                <Input placeholder="请输入商品编码" />
              </Form.Item>
            </div>
            
            <Form.Item
              label="商品分类"
              name="categoryId"
              rules={[{ required: true, message: '请选择商品分类' }]}
            >
              <TreeSelect
                placeholder="请选择商品分类"
                onChange={onCategoryChange}
                allowClear
                treeDefaultExpandAll
                showSearch
                treeNodeFilterProp="title"
              >
                {renderCategoryTree(categories)}
              </TreeSelect>
            </Form.Item>
          </div>
          
          <div className={styles.formCard}>
            <div className={styles.sectionTitle}>价格与库存</div>
            <div className={styles.formGrid}>
              <Form.Item
                label="原价"
                name="price"
                rules={[{ required: true, message: '请输入商品原价' }]}
              >
                <InputNumber 
                  min={0} 
                  precision={2} 
                  style={{ width: '100%' }} 
                  placeholder="请输入商品原价" 
                  addonBefore="¥"
                  className={styles.priceInput}
                />
              </Form.Item>
              
              <Form.Item
                label="实际价格"
                name="realPrice"
                rules={[{ required: true, message: '请输入商品实际价格' }]}
              >
                <InputNumber 
                  min={0} 
                  precision={2} 
                  style={{ width: '100%' }} 
                  placeholder="请输入商品实际价格" 
                  addonBefore="¥"
                  className={styles.priceInput}
                />
              </Form.Item>
            </div>
            
            <div className={styles.formGrid}>
              <Form.Item
                label="总库存"
                name="totalStock"
                rules={[{ required: true, message: '请输入商品总库存' }]}
              >
                <InputNumber 
                  min={0} 
                  style={{ width: '100%' }} 
                  placeholder="请输入商品总库存" 
                  className={styles.stockInput}
                />
              </Form.Item>
              
              <Form.Item
                label="商品状态"
                name="status"
                valuePropName="checked"
              >
                <Switch 
                  checkedChildren="上架" 
                  unCheckedChildren="下架" 
                  className={styles.statusSwitch}
                />
              </Form.Item>
            </div>
          </div>
          
          <div className={styles.formCard}>
            <div className={styles.sectionTitle}>商品详情</div>
            <Form.Item
              label="商品描述"
              name="description"
            >
              <TextArea 
                rows={4} 
                placeholder="请输入商品描述" 
                className={styles.descriptionInput}
              />
            </Form.Item>
            
            <Form.Item
              label="商品图片"
              name="images"
              className={styles.imagesUpload}
            >
              <div className={styles.uploadContainer}>
                <Upload {...uploadProps}>
                  <div className={styles.uploadButton}>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>上传图片</div>
                  </div>
                </Upload>
                <div className={styles.uploadTip}>支持*.jpg, *.png格式，单张图片不超过2MB</div>
              </div>
            </Form.Item>
          </div>
        </div>
      )
    },
    {
      key: '2',
      label: '基础属性',
      children: (
        <div className={styles.formSection}>
          {attrGroups.length > 0 ? (
            attrGroups.map(group => (
              <div key={group.id} className={styles.attrGroup}>
                <h3 className={styles.groupTitle}>{group.name}</h3>
                {group.attrs.map((attr: any) => (
                  <Form.Item
                    key={attr.id}
                    label={attr.name}
                    name={`basicAttr_${attr.id}`}
                  >
                    <Input placeholder={`请输入${attr.name}`} />
                  </Form.Item>
                ))}
              </div>
            ))
          ) : (
            <div className={styles.emptyNotice}>请先选择商品分类，获取基础属性</div>
          )}
        </div>
      )
    },
    {
      key: '3',
      label: '销售属性',
      children: (
        <div className={styles.formSection}>
          <Form.List name="saleAttrs" initialValue={[{ key: '', value: '' }]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'key']}
                      rules={[{ required: true, message: '请输入属性名称' }]}
                    >
                      <Input placeholder="属性名称" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'value']}
                      rules={[{ required: true, message: '请输入属性值' }]}
                    >
                      <Input placeholder="属性值" />
                    </Form.Item>
                    {fields.length > 1 && (
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    )}
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    添加销售属性
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </div>
      )
    },
    {
      key: '4',
      label: '规格属性',
      children: (
        <div className={styles.formSection}>
          <Form.List name="specAttrs" initialValue={[{ key: '', values: [] }]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 16, width: '100%' }} align="baseline" direction="vertical">
                    <Space>
                      <Form.Item
                        {...restField}
                        name={[name, 'key']}
                        rules={[{ required: true, message: '请输入规格名称' }]}
                      >
                        <Input placeholder="规格名称" />
                      </Form.Item>
                      {fields.length > 1 && (
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      )}
                    </Space>
                    <Form.Item
                      {...restField}
                      name={[name, 'values']}
                      rules={[{ required: true, message: '请输入规格值' }]}
                    >
                      <Select
                        mode="tags"
                        style={{ width: '100%' }}
                        placeholder="输入规格值后按回车添加"
                        tokenSeparators={[',']}
                      />
                    </Form.Item>
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    添加规格属性
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          
          <div className={styles.generateSpecSection}>
            <Button type="primary" onClick={generateSpecCombinations}>
              生成规格组合
            </Button>
          </div>
          
          {specCombinations.length > 0 && (
            <Table
              columns={specColumns}
              dataSource={specCombinations}
              rowKey="id"
              pagination={false}
              scroll={{ x: 'max-content' }}
            />
          )}
        </div>
      )
    }
  ];

  return (
    <Modal
      title={product ? '编辑商品' : '添加商品'}
      open={visible}
      onCancel={onCancel}
      onOk={onOk}
      width={1000}
      className={styles.productFormModal}
      okText={product ? '保存' : '添加'}
      cancelText="取消"
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          status: true,
          price: 0,
          realPrice: 0,
          totalStock: 0,
        }}
      >
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          items={items}
        />
      </Form>
    </Modal>
  );
};

export default ProductForm; 