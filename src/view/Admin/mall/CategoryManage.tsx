import React, { useEffect, useState } from 'react';
import { 
  Tree, 
  Card, 
  Button, 
  Space, 
  Table, 
  Modal, 
  Form, 
  Input, 
  InputNumber, 
  Select, 
  message,
  Tabs,
  Tooltip,
  Popconfirm,
  Empty
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined,
  UpOutlined,
  DownOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import { 
  getCategoryList, 
  addCategory, 
  updateCategory, 
  deleteCategory,
  modifyCategoryGroup,
  deleteCategoryGroup,
  modifyCategoryGroupAttr,
  deleteCategoryGroupAttr,
  CategoryGroupModifyRequest,
  CategoryGroupAttrModifyRequest
} from '../../../api/apiService';
import type { CategoryResponse, AttrGroup, Attr } from '../../../api/apiService';
import styles from './CategoryManage.module.scss';
import type { AlignType } from 'rc-table/lib/interface';

const { TabPane } = Tabs;

const CategoryManage: React.FC = () => {
  // 状态管理
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [treeData, setTreeData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryResponse | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalType, setModalType] = useState<'add' | 'edit'>('add');
  const [parentCategory, setParentCategory] = useState<CategoryResponse | null>(null);
  const [form] = Form.useForm();
  const [attrGroupForm] = Form.useForm();
  const [attrForm] = Form.useForm();
  const [attrGroupModalVisible, setAttrGroupModalVisible] = useState<boolean>(false);
  const [attrModalVisible, setAttrModalVisible] = useState<boolean>(false);
  const [selectedAttrGroup, setSelectedAttrGroup] = useState<AttrGroup | null>(null);
  const [activeTab, setActiveTab] = useState<string>('basic');
  const [expandedRowKeys, setExpandedRowKeys] = useState<number[]>([]);

  // 获取分类数据
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategoryList();
      setCategories(data);
      const formattedData = formatTreeData(data);
      setTreeData(formattedData);
    } catch (error) {
      console.error('获取分类列表失败:', error);
      message.error('获取分类列表失败');
    } finally {
      setLoading(false);
    }
  };

  // 格式化树形数据
  const formatTreeData = (data: CategoryResponse[]): any[] => {
    return data.map(item => ({
      title: item.name,
      key: item.id.toString(),
      data: item,
      children: item.children ? formatTreeData(item.children) : []
    }));
  };

  // 初始化加载
  useEffect(() => {
    fetchCategories();
  }, []);

  // 选择分类
  const onSelectCategory = (selectedKeys: React.Key[], info: any) => {
    if (selectedKeys.length > 0) {
      setSelectedCategory(info.node.data);
    } else {
      setSelectedCategory(null);
    }
  };

  // 添加分类
  const handleAddCategory = (parentNode?: CategoryResponse) => {
    setModalType('add');
    setParentCategory(parentNode || null);
    form.resetFields();
    
    if (parentNode) {
      form.setFieldsValue({
        parentId: parentNode.id,
        level: parentNode.level + 1
      });
    } else {
      form.setFieldsValue({
        parentId: 0,
        level: 1
      });
    }
    
    setModalVisible(true);
  };

  // 编辑分类
  const handleEditCategory = (category: CategoryResponse) => {
    setModalType('edit');
    setSelectedCategory(category);
    form.setFieldsValue({
      id: category.id,
      name: category.name,
      code: category.code,
      level: category.level,
      sort: category.sort,
      parentId: category.parentId,
      icon: category.icon || ''
    });
    setModalVisible(true);
  };

  // 删除分类
  const handleDeleteCategory = async (category: CategoryResponse) => {
    try {
      const success = await deleteCategory(category.id);
      if (success) {
        message.success(`删除分类 ${category.name} 成功`);
        await fetchCategories();
      }
    } catch (error) {
      console.error('删除分类失败:', error);
    }
  };

  // 保存分类
  const handleSaveCategory = async () => {
    try {
      const values = await form.validateFields();
      let result;
      
      if (modalType === 'add') {
        result = await addCategory({
          name: values.name,
          code: values.code,
          level: values.level,
          sort: values.sort,
          parentId: values.parentId,
          icon: values.icon
        });
        if (result) {
          message.success(`添加分类 ${values.name} 成功`);
        }
      } else {
        console.log("update id:"+values.id);
        result = await updateCategory(values.id, {
          id: values.id,
          name: values.name,
          code: values.code,
          level: values.level,
          sort: values.sort,
          parentId: values.parentId,
          icon: values.icon
        });
        if (result) {
          message.success(`更新分类 ${values.name} 成功`);
        }
      }
      
      if (result) {
        setModalVisible(false);
        await fetchCategories();
      }
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  // 添加属性组
  const handleAddAttrGroup = () => {
    if (!selectedCategory) {
      message.warning('请先选择一个分类');
      return;
    }
    
    attrGroupForm.resetFields();
    setSelectedAttrGroup(null);
    setAttrGroupModalVisible(true);
  };

  // 编辑属性组
  const handleEditAttrGroup = (attrGroup: AttrGroup) => {
    setSelectedAttrGroup(attrGroup);
    attrGroupForm.setFieldsValue({
      id: attrGroup.id,
      name: attrGroup.name,
      code: attrGroup.code,
      status: attrGroup.status,
      type: attrGroup.type,
      sort: attrGroup.sort,
      description: attrGroup.description
    });
    setAttrGroupModalVisible(true);
  };

  // 保存属性组
  const handleSaveAttrGroup = async () => {
    try {
      const values = await attrGroupForm.validateFields();
      if (!selectedCategory) {
        message.error('未选择分类');
        return;
      }

      const request: CategoryGroupModifyRequest = {
        id: values.id,
        categoryId: selectedCategory.id,
        categoryCode: selectedCategory.code,
        name: values.name,
        code: values.code,
        type: values.type,
        status: values.status,
        sort: values.sort,
        description: values.description
      };

      const success = await modifyCategoryGroup(request);
      if (success) {
        message.success(`保存属性组 ${values.name} 成功`);
        setAttrGroupModalVisible(false);
        await fetchCategories();
        const updatedCategories = await getCategoryList();
        const updatedCategory = updatedCategories.find(cat => cat.id === selectedCategory.id);
        if (updatedCategory) {
          setSelectedCategory(updatedCategory);
        }
      } else {
        message.error('保存属性组失败');
      }
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  // 添加属性
  const handleAddAttr = (attrGroup: AttrGroup) => {
    setSelectedAttrGroup(attrGroup);
    attrForm.resetFields();
    setAttrModalVisible(true);
  };

  // 编辑属性
  const handleEditAttr = (attr: Attr, attrGroup: AttrGroup) => {
    setSelectedAttrGroup(attrGroup);
    attrForm.setFieldsValue({
      id: attr.id,
      name: attr.name,
      code: attr.code,
      sort: attr.sort,
      status: attr.status,
      type: attr.type
    });
    setAttrModalVisible(true);
  };

  // 保存属性
  const handleSaveAttr = async () => {
    try {
      const values = await attrForm.validateFields();
      if (!selectedAttrGroup) {
        message.error('未选择属性组');
        return;
      }

      const request: CategoryGroupAttrModifyRequest = {
        id: values.id,
        attrGroupId: selectedAttrGroup.id,
        attrGroupCode: selectedAttrGroup.code,
        attrCode: values.code,
        attrName: values.name,
        attrType: values.type,
        status: values.status,
        sort: values.sort,
        description: values.description
      };

      const success = await modifyCategoryGroupAttr(request);
      if (success) {
        message.success(`保存属性 ${values.name} 成功`);
        setAttrModalVisible(false);
        await fetchCategories();
        const updatedCategories = await getCategoryList();
        const updatedCategory = updatedCategories.find(cat => cat.id === selectedCategory?.id);
        if (updatedCategory) {
          setSelectedCategory(updatedCategory);
        }
      } else {
        message.error('保存属性失败');
      }
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  // 删除属性组
  const handleDeleteAttrGroup = async (attrGroup: AttrGroup) => {
    try {
      const success = await deleteCategoryGroup(attrGroup.id);
      if (success) {
        message.success(`删除属性组 ${attrGroup.name} 成功`);
        await fetchCategories();
        const updatedCategories = await getCategoryList();
        const updatedCategory = updatedCategories.find(cat => cat.id === selectedCategory?.id);
        if (updatedCategory) {
          setSelectedCategory(updatedCategory);
        }
      } else {
        message.error('删除属性组失败');
      }
    } catch (error) {
      console.error('删除属性组失败:', error);
    }
  };

  // 删除属性
  const handleDeleteAttr = async (attr: Attr) => {
    try {
      const success = await deleteCategoryGroupAttr(attr.id);
      if (success) {
        message.success(`删除属性 ${attr.name} 成功`);
        await fetchCategories();
        const updatedCategories = await getCategoryList();
        const updatedCategory = updatedCategories.find(cat => cat.id === selectedCategory?.id);
        if (updatedCategory) {
          setSelectedCategory(updatedCategory);
        }
      } else {
        message.error('删除属性失败');
      }
    } catch (error) {
      console.error('删除属性失败:', error);
    }
  };

  // 处理展开/折叠
  const handleExpand = (id: number) => {
    setExpandedRowKeys(prev => {
      if (prev.includes(id)) {
        return prev.filter(key => key !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // 属性组表格列
  const attrGroupColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 0,
      hidden: true,
      align: 'left' as AlignType,
      sorter: (a: AttrGroup, b: AttrGroup) => a.id - b.id
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      align: 'left' as AlignType
    },
    {
      title: '编码',
      dataIndex: 'code',
      key: 'code',
      align: 'left' as AlignType
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align: 'left' as AlignType,
      render: (status: number) => (
        <span className={status === 1 ? `${styles.statusTag} ${styles.active}` : `${styles.statusTag} ${styles.inactive}`}>
          {status === 1 ? '启用' : '禁用'}
        </span>
      )
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      align: 'left' as AlignType,
      render: (type: number) => {
        const typeMap = {
          1: '基本属性',
          2: '销售属性',
          3: '规格属性'
        };
        return <span>{typeMap[type as keyof typeof typeMap] || '未知'}</span>;
      }
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
      align: 'left' as AlignType,
      sorter: (a: AttrGroup, b: AttrGroup) => a.sort - b.sort,
      defaultSortOrder: 'ascend' as const
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      align: 'left' as AlignType,
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'action',
      width: 250,
      align: 'left' as AlignType,
      render: (_: any, record: AttrGroup) => (
        <Space size="small">
          <Tooltip title="展开/折叠属性">
            <Button 
              type="text" 
              icon={expandedRowKeys.includes(record.id) ? <UpOutlined /> : <DownOutlined />} 
              onClick={() => handleExpand(record.id)}
            />
          </Tooltip>
          <Tooltip title="添加属性">
            <Button 
              type="text" 
              icon={<PlusOutlined />} 
              onClick={() => handleAddAttr(record)} 
            />
          </Tooltip>
          <Tooltip title="编辑">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              onClick={() => handleEditAttrGroup(record)} 
            />
          </Tooltip>
          <Tooltip title="删除">
            <Popconfirm
              title="确定要删除这个属性组吗?"
              onConfirm={() => handleDeleteAttrGroup(record)}
              okText="确定"
              cancelText="取消"
            >
              <Button type="text" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      )
    }
  ];

  // 属性表格列
  const attrColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 0,
      hidden: true,
      align: 'left' as AlignType,
      sorter: (a: Attr, b: Attr) => a.id - b.id
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center' as AlignType
    },
    {
      title: '编码',
      dataIndex: 'code',
      key: 'code',
      align: 'left' as AlignType
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align: 'left' as AlignType,
      render: (status: number) => (
        <span className={status === 1 ? `${styles.statusTag} ${styles.active}` : `${styles.statusTag} ${styles.inactive}`}>
          {status === 1 ? '启用' : '禁用'}
        </span>
      )
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      align: 'left' as AlignType,
      render: (type: number) => {
        const typeMap = {
          1: '输入框',
          2: '单选',
          3: '多选',
          4: '下拉框'
        };
        return <span>{typeMap[type as keyof typeof typeMap] || '未知'}</span>;
      }
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
      align: 'left' as AlignType,
      sorter: (a: Attr, b: Attr) => a.sort - b.sort,
      defaultSortOrder: 'ascend' as const
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      align: 'left' as AlignType,
      render: (_: any, record: Attr) => {
        // 找到当前属性所属的属性组
        const currentAttrGroup = selectedCategory?.attrGroups?.find(group => 
          group.attrs?.some(attr => attr.id === record.id)
        );
        
        return (
          <Space size="small">
            <Tooltip title="编辑">
              <Button 
                type="text" 
                icon={<EditOutlined />} 
                onClick={() => handleEditAttr(record, currentAttrGroup!)} 
              />
            </Tooltip>
            <Tooltip title="删除">
              <Popconfirm
                title="确定要删除这个属性吗?"
                onConfirm={() => handleDeleteAttr(record)}
                okText="确定"
                cancelText="取消"
              >
                <Button type="text" danger icon={<DeleteOutlined />} />
              </Popconfirm>
            </Tooltip>
          </Space>
        );
      }
    }
  ];

  const tabItems = [
    {
      key: 'basic',
      label: '基本信息',
      children: (
        <div className={styles.basicInfo}>
          <div className={styles.infoItem}>
            <span className={styles.label}>ID:</span>
            <span className={styles.value}>{selectedCategory?.id}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>名称:</span>
            <span className={styles.value}>{selectedCategory?.name}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>编码:</span>
            <span className={styles.value}>{selectedCategory?.code}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>层级:</span>
            <span className={styles.value}>{selectedCategory?.level}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>排序:</span>
            <span className={styles.value}>{selectedCategory?.sort}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>父级ID:</span>
            <span className={styles.value}>{selectedCategory?.parentId}</span>
          </div>
          {selectedCategory?.icon && (
            <div className={`${styles.infoItem} ${styles.fullWidth}`}>
              <span className={styles.label}>图标:</span>
              <img 
                src={selectedCategory.icon} 
                alt="分类图标" 
                className={styles.iconPreview}
              />
            </div>
          )}
        </div>
      )
    },
    {
      key: 'attrGroups',
      label: '属性组管理',
      children: (
        <div className={styles.tableWrapper}>
          <Table 
            columns={attrGroupColumns}
            dataSource={selectedCategory?.attrGroups || []}
            rowKey="id"
            className={styles.attrGroupTable}
            expandable={{
              expandedRowRender: (record) => (
                <div className={styles.nestedTable}>
                  <div className={styles.tableHeader}>
                    <h4 className={styles.title}>属性列表</h4>
                  </div>
                  <Table 
                    columns={attrColumns}
                    dataSource={record.attrs || []}
                    rowKey="id"
                    size="small"
                    pagination={false}
                    className={styles.attrTable}
                  />
                </div>
              ),
              expandIcon: () => null,
              expandRowByClick: false,
              expandedRowKeys: expandedRowKeys,
              onExpand: (expanded, record) => {
                if (expanded) {
                  setExpandedRowKeys(prev => [...prev, record.id]);
                } else {
                  setExpandedRowKeys(prev => prev.filter(key => key !== record.id));
                }
              }
            }}
          />
        </div>
      )
    }
  ];

  return (
    <div className={styles.categoryManage}>
      <div className={styles.container}>
        {/* 左侧分类树 */}
        <Card 
          title="商品分类" 
          className={styles.categoryTree}
          extra={
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              size="small"
              onClick={() => handleAddCategory()}
            >
              添加一级分类
            </Button>
          }
        >
          <div className={styles.treeContainer}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>加载中...</div>
            ) : (
              <Tree
                showLine
                defaultExpandAll
                onSelect={onSelectCategory}
                treeData={treeData}
                titleRender={(node) => (
                  <div className={styles.treeNodeContent}>
                    <span className={styles.nodeTitle}>{node.title}</span>
                    <Space size="small" className={styles.nodeActions}>
                      <Button 
                        type="text" 
                        size="small" 
                        icon={<PlusOutlined />} 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddCategory(node.data);
                        }}
                      />
                      <Button 
                        type="text" 
                        size="small" 
                        icon={<EditOutlined />} 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditCategory(node.data);
                        }}
                      />
                      <Popconfirm
                        title="确定要删除这个分类吗?"
                        onConfirm={(e) => {
                          e?.stopPropagation();
                          handleDeleteCategory(node.data);
                        }}
                        onCancel={(e) => e?.stopPropagation()}
                        okText="确定"
                        cancelText="取消"
                      >
                        <Button 
                          type="text" 
                          size="small" 
                          danger 
                          icon={<DeleteOutlined />} 
                          onClick={(e) => e.stopPropagation()}
                        />
                      </Popconfirm>
                    </Space>
                  </div>
                )}
              />
            )}
          </div>
        </Card>

        {/* 右侧详情 */}
        <Card 
          title={selectedCategory ? `分类详情: ${selectedCategory.name}` : '分类详情'} 
          className={styles.detailPanel}
          extra={
            selectedCategory && (
              <Space>
                <Button 
                  type="primary" 
                  icon={<EditOutlined />}
                  onClick={() => handleEditCategory(selectedCategory)}
                >
                  编辑分类
                </Button>
                <Popconfirm
                  title="确定要删除这个分类吗?"
                  onConfirm={() => handleDeleteCategory(selectedCategory)}
                  okText="确定"
                  cancelText="取消"
                >
                  <Button danger icon={<DeleteOutlined />}>删除分类</Button>
                </Popconfirm>
              </Space>
            )
          }
        >
          {selectedCategory ? (
            <div className={styles.fadeIn}>
              <Tabs 
                activeKey={activeTab} 
                onChange={setActiveTab}
                items={tabItems}
                tabBarExtraContent={
                  activeTab === 'attrGroups' ? (
                    <Button 
                      type="primary" 
                      size="small"
                      icon={<PlusOutlined />}
                      onClick={handleAddAttrGroup}
                    >
                      添加属性组
                    </Button>
                  ) : null
                }
              />
            </div>
          ) : (
            <Empty 
              image={Empty.PRESENTED_IMAGE_SIMPLE} 
              description="请从左侧选择一个分类查看详情" 
            />
          )}
        </Card>
      </div>

      {/* 分类表单弹窗 */}
      <Modal
        title={modalType === 'add' ? '添加分类' : '编辑分类'}
        open={modalVisible}
        onOk={handleSaveCategory}
        onCancel={() => setModalVisible(false)}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
        >
          {modalType === 'edit' && (
            <Form.Item name="id" label="ID" hidden>
              <Input />
            </Form.Item>
          )}
          
          <div className={`${styles.formItem} ${styles.inline}`}>
            <Form.Item name="parentId" label="父级ID">
              <InputNumber disabled style={{ width: '100%' }} />
            </Form.Item>
            
            <Form.Item name="level" label="层级">
              <InputNumber disabled style={{ width: '100%' }} />
            </Form.Item>
          </div>
          
          <Form.Item
            name="name"
            label="分类名称"
            rules={[{ required: true, message: '请输入分类名称' }]}
            className={styles.formItem}
          >
            <Input placeholder="请输入分类名称" />
          </Form.Item>
          
          <Form.Item
            name="code"
            label="分类编码"
            rules={[{ required: true, message: '请输入分类编码' }]}
            className={styles.formItem}
          >
            <Input placeholder="请输入分类编码" />
          </Form.Item>
          
          <Form.Item
            name="sort"
            label="排序"
            rules={[{ required: true, message: '请输入排序值' }]}
            className={styles.formItem}
          >
            <InputNumber min={0} style={{ width: '100%' }} placeholder="数字越小越靠前" />
          </Form.Item>
          
          <Form.Item
            name="icon"
            label="图标URL"
            className={styles.formItem}
          >
            <Input placeholder="请输入图标URL" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 属性组表单弹窗 */}
      <Modal
        title={selectedAttrGroup ? '编辑属性组' : '添加属性组'}
        open={attrGroupModalVisible}
        onOk={handleSaveAttrGroup}
        onCancel={() => setAttrGroupModalVisible(false)}
        width={600}
      >
        <Form
          form={attrGroupForm}
          layout="vertical"
        >
          {selectedAttrGroup && (
            <Form.Item name="id" label="ID" hidden>
              <Input />
            </Form.Item>
          )}
          
          <Form.Item
            name="name"
            label="属性组名称"
            rules={[{ required: true, message: '请输入属性组名称' }]}
            className={styles.formItem}
          >
            <Input placeholder="请输入属性组名称" />
          </Form.Item>
          
          <Form.Item
            name="code"
            label="属性组编码"
            rules={[{ required: true, message: '请输入属性组编码' }]}
            className={styles.formItem}
          >
            <Input placeholder="请输入属性组编码" />
          </Form.Item>
          
          <Form.Item
            name="type"
            label="属性组类型"
            rules={[{ required: true, message: '请选择属性组类型' }]}
            className={styles.formItem}
          >
            <Select placeholder="请选择属性组类型">
              <Select.Option value={1}>基本属性</Select.Option>
              <Select.Option value={2}>销售属性</Select.Option>
              <Select.Option value={3}>规格属性</Select.Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
            className={styles.formItem}
          >
            <Select placeholder="请选择状态">
              <Select.Option value={1}>启用</Select.Option>
              <Select.Option value={0}>禁用</Select.Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="sort"
            label="排序"
            rules={[{ required: true, message: '请输入排序值' }]}
            className={styles.formItem}
          >
            <InputNumber min={0} style={{ width: '100%' }} placeholder="数字越小越靠前" />
          </Form.Item>
          
          <Form.Item
            name="description"
            label="描述"
            className={styles.formItem}
          >
            <Input.TextArea 
              placeholder="请输入属性组描述" 
              rows={4}
              maxLength={200}
              showCount
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* 属性表单弹窗 */}
      <Modal
        title="属性管理"
        open={attrModalVisible}
        onOk={handleSaveAttr}
        onCancel={() => setAttrModalVisible(false)}
        width={600}
      >
        <Form
          form={attrForm}
          layout="vertical"
        >
          <Form.Item name="id" label="ID" hidden>
            <Input />
          </Form.Item>
          
          <Form.Item
            label="所属属性组"
            className={styles.formItem}
          >
            <Input 
              value={selectedAttrGroup?.name} 
              disabled 
              placeholder="属性组名称" 
            />
          </Form.Item>
          
          <Form.Item
            name="name"
            label="属性名称"
            rules={[{ required: true, message: '请输入属性名称' }]}
            className={styles.formItem}
          >
            <Input placeholder="请输入属性名称" />
          </Form.Item>
          
          <Form.Item
            name="code"
            label="属性编码"
            rules={[{ required: true, message: '请输入属性编码' }]}
            className={styles.formItem}
          >
            <Input placeholder="请输入属性编码" />
          </Form.Item>
          
          <Form.Item
            name="type"
            label="属性类型"
            rules={[{ required: true, message: '请选择属性类型' }]}
            className={styles.formItem}
          >
            <Select placeholder="请选择属性类型">
              <Select.Option value={1}>输入框</Select.Option>
              <Select.Option value={2}>单选</Select.Option>
              <Select.Option value={3}>多选</Select.Option>
              <Select.Option value={4}>下拉框</Select.Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
            className={styles.formItem}
          >
            <Select placeholder="请选择状态">
              <Select.Option value={1}>启用</Select.Option>
              <Select.Option value={0}>禁用</Select.Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="sort"
            label="排序"
            rules={[{ required: true, message: '请输入排序值' }]}
            className={styles.formItem}
          >
            <InputNumber min={0} style={{ width: '100%' }} placeholder="数字越小越靠前" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryManage;
    
