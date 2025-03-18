import React, { useEffect, useState } from 'react';
import { 
  Table, 
  Button, 
  Space, 
  Modal, 
  Form, 
  Input, 
  Select, 
  InputNumber, 
  message, 
  Tooltip, 
  Popconfirm,
  Empty,
  Tag,
  Row,
  Col,
  Tabs
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  SearchOutlined,
  ReloadOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import { getCategoryList } from '../../../api/apiService';
import type { CategoryResponse, AttrGroup, Attr } from '../../../api/apiService';
import AdminContentCard from '../AdminContentCard';
import styles from './AttributesManage.module.scss';
import { ColumnType } from 'antd/es/table';

const { TabPane } = Tabs;

const AttributesManage: React.FC = () => {
  // 状态管理
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [attrGroupForm] = Form.useForm();
  const [attrForm] = Form.useForm();
  const [attrGroupModalVisible, setAttrGroupModalVisible] = useState<boolean>(false);
  const [attrModalVisible, setAttrModalVisible] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryResponse | null>(null);
  const [selectedAttrGroup, setSelectedAttrGroup] = useState<AttrGroup | null>(null);
  const [searchText, setSearchText] = useState<string>('');
  const [editMode, setEditMode] = useState<'add' | 'edit'>('add');
  const [activeTab, setActiveTab] = useState<string>('groups');

  // 获取分类及属性组数据
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategoryList();
      setCategories(data);
    } catch (error) {
      console.error('获取分类列表失败:', error);
      message.error('获取分类列表失败');
    } finally {
      setLoading(false);
    }
  };

  // 初始化数据
  useEffect(() => {
    fetchCategories();
  }, []);

  // 获取所有属性组
  const getAllAttrGroups = (): { attrGroup: AttrGroup; category: CategoryResponse }[] => {
    const allGroups: { attrGroup: AttrGroup; category: CategoryResponse }[] = [];
    
    const processCategory = (category: CategoryResponse) => {
      if (category.attrGroups && category.attrGroups.length > 0) {
        category.attrGroups.forEach(group => {
          allGroups.push({ attrGroup: group, category });
        });
      }
      
      if (category.children && category.children.length > 0) {
        category.children.forEach(processCategory);
      }
    };
    
    categories.forEach(processCategory);
    return allGroups;
  };

  // 过滤属性组
  const getFilteredAttrGroups = () => {
    const allGroups = getAllAttrGroups();
    
    if (!searchText) {
      return allGroups;
    }
    
    return allGroups.filter(({ attrGroup, category }) => 
      attrGroup.name.toLowerCase().includes(searchText.toLowerCase()) || 
      attrGroup.code.toLowerCase().includes(searchText.toLowerCase()) ||
      category.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  // 获取所有属性
  const getAllAttributes = (): { attr: Attr; attrGroup: AttrGroup; category: CategoryResponse }[] => {
    const allAttrs: { attr: Attr; attrGroup: AttrGroup; category: CategoryResponse }[] = [];
    
    getAllAttrGroups().forEach(({ attrGroup, category }) => {
      if (attrGroup.attrs && attrGroup.attrs.length > 0) {
        attrGroup.attrs.forEach(attr => {
          allAttrs.push({ attr, attrGroup, category });
        });
      }
    });
    
    return allAttrs;
  };

  // 过滤属性
  const getFilteredAttributes = () => {
    const allAttrs = getAllAttributes();
    
    if (!searchText) {
      return allAttrs;
    }
    
    return allAttrs.filter(({ attr, attrGroup, category }) => 
      attr.name.toLowerCase().includes(searchText.toLowerCase()) || 
      attr.code.toLowerCase().includes(searchText.toLowerCase()) ||
      attrGroup.name.toLowerCase().includes(searchText.toLowerCase()) ||
      category.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  // 添加属性组
  const handleAddAttrGroup = (category?: CategoryResponse) => {
    setEditMode('add');
    setSelectedCategory(category || null);
    attrGroupForm.resetFields();
    
    if (category) {
      attrGroupForm.setFieldsValue({
        categoryId: category.id,
        categoryName: category.name
      });
    }
    
    attrGroupForm.setFieldsValue({
      status: 1,
      type: 1,
      sort: 1
    });
    
    setAttrGroupModalVisible(true);
  };

  // 编辑属性组
  const handleEditAttrGroup = (attrGroup: AttrGroup, category: CategoryResponse) => {
    setEditMode('edit');
    setSelectedCategory(category);
    setSelectedAttrGroup(attrGroup);
    attrGroupForm.setFieldsValue({
      id: attrGroup.id,
      name: attrGroup.name,
      code: attrGroup.code,
      status: attrGroup.status,
      type: attrGroup.type,
      sort: attrGroup.sort,
      categoryId: category.id,
      categoryName: category.name
    });
    setAttrGroupModalVisible(true);
  };

  // 保存属性组
  const handleSaveAttrGroup = async () => {
    try {
      const values = await attrGroupForm.validateFields();
      // 这里应该调用API保存属性组
      message.success(`${editMode === 'add' ? '添加' : '更新'}属性组 ${values.name} 成功`);
      setAttrGroupModalVisible(false);
      await fetchCategories();
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  // 删除属性组
  const handleDeleteAttrGroup = async (attrGroup: AttrGroup) => {
    try {
      // 这里应该调用API删除属性组
      message.success(`删除属性组 ${attrGroup.name} 成功`);
      await fetchCategories();
    } catch (error) {
      console.error('删除属性组失败:', error);
      message.error('删除属性组失败');
    }
  };

  // 添加属性
  const handleAddAttr = (attrGroup: AttrGroup, category: CategoryResponse) => {
    setEditMode('add');
    setSelectedCategory(category);
    setSelectedAttrGroup(attrGroup);
    attrForm.resetFields();
    attrForm.setFieldsValue({
      status: 1,
      type: 1,
      sort: 1,
      attrGroupId: attrGroup.id,
      attrGroupName: attrGroup.name,
      categoryId: category.id,
      categoryName: category.name
    });
    setAttrModalVisible(true);
  };

  // 编辑属性
  const handleEditAttr = (attr: Attr, attrGroup: AttrGroup, category: CategoryResponse) => {
    setEditMode('edit');
    setSelectedCategory(category);
    setSelectedAttrGroup(attrGroup);
    attrForm.setFieldsValue({
      id: attr.id,
      name: attr.name,
      code: attr.code,
      sort: attr.sort,
      status: attr.status,
      type: attr.type,
      attrGroupId: attrGroup.id,
      attrGroupName: attrGroup.name,
      categoryId: category.id,
      categoryName: category.name
    });
    setAttrModalVisible(true);
  };

  // 保存属性
  const handleSaveAttr = async () => {
    try {
      const values = await attrForm.validateFields();
      // 这里应该调用API保存属性
      message.success(`${editMode === 'add' ? '添加' : '更新'}属性 ${values.name} 成功`);
      setAttrModalVisible(false);
      await fetchCategories();
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  // 删除属性
  const handleDeleteAttr = async (attr: Attr) => {
    try {
      // 这里应该调用API删除属性
      message.success(`删除属性 ${attr.name} 成功`);
      await fetchCategories();
    } catch (error) {
      console.error('删除属性失败:', error);
      message.error('删除属性失败');
    }
  };

  // 属性组表格列
  const attrGroupColumns = [
    {
      title: 'ID',
      dataIndex: ['attrGroup', 'id'],
      key: 'id',
      width: 80
    },
    {
      title: '所属分类',
      dataIndex: ['category', 'name'],
      key: 'categoryName'
    },
    {
      title: '名称',
      dataIndex: ['attrGroup', 'name'],
      key: 'name'
    },
    {
      title: '编码',
      dataIndex: ['attrGroup', 'code'],
      key: 'code'
    },
    {
      title: '状态',
      dataIndex: ['attrGroup', 'status'],
      key: 'status',
      render: (status: number) => (
        <Tag color={status === 1 ? 'green' : 'red'}>
          {status === 1 ? '启用' : '禁用'}
        </Tag>
      )
    },
    {
      title: '类型',
      dataIndex: ['attrGroup', 'type'],
      key: 'type',
      render: (type: number) => {
        const typeMap = {
          1: { text: '基本属性', color: 'blue' },
          2: { text: '销售属性', color: 'orange' },
          3: { text: '规格属性', color: 'purple' }
        };
        return (
          <Tag color={typeMap[type as keyof typeof typeMap]?.color || 'default'}>
            {typeMap[type as keyof typeof typeMap]?.text || '未知'}
          </Tag>
        );
      }
    },
    {
      title: '属性数量',
      key: 'attrCount',
      render: (_: any, record: { attrGroup: AttrGroup }) => (
        <span>{record.attrGroup.attrs?.length || 0}</span>
      )
    },
    {
      title: '排序',
      dataIndex: ['attrGroup', 'sort'],
      key: 'sort'
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: { attrGroup: AttrGroup; category: CategoryResponse }) => (
        <Space size="small">
          <Tooltip title="编辑">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              onClick={() => handleEditAttrGroup(record.attrGroup, record.category)} 
            />
          </Tooltip>
          <Tooltip title="添加属性">
            <Button 
              type="text" 
              icon={<PlusOutlined />} 
              onClick={() => handleAddAttr(record.attrGroup, record.category)} 
            />
          </Tooltip>
          <Tooltip title="删除">
            <Popconfirm
              title="确定要删除这个属性组吗?"
              description="删除后将无法恢复，且组内所有属性也将被删除。"
              onConfirm={() => handleDeleteAttrGroup(record.attrGroup)}
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
      dataIndex: ['attr', 'id'],
      key: 'id',
      width: 80
    },
    {
      title: '所属分类',
      dataIndex: ['category', 'name'],
      key: 'categoryName'
    },
    {
      title: '所属属性组',
      dataIndex: ['attrGroup', 'name'],
      key: 'attrGroupName'
    },
    {
      title: '名称',
      dataIndex: ['attr', 'name'],
      key: 'name'
    },
    {
      title: '编码',
      dataIndex: ['attr', 'code'],
      key: 'code'
    },
    {
      title: '状态',
      dataIndex: ['attr', 'status'],
      key: 'status',
      render: (status: number) => (
        <Tag color={status === 1 ? 'green' : 'red'}>
          {status === 1 ? '启用' : '禁用'}
        </Tag>
      )
    },
    {
      title: '类型',
      dataIndex: ['attr', 'type'],
      key: 'type',
      render: (type: number) => {
        const typeMap = {
          1: { text: '输入框', color: 'blue' },
          2: { text: '单选', color: 'green' },
          3: { text: '多选', color: 'orange' },
          4: { text: '下拉框', color: 'purple' }
        };
        return (
          <Tag color={typeMap[type as keyof typeof typeMap]?.color || 'default'}>
            {typeMap[type as keyof typeof typeMap]?.text || '未知'}
          </Tag>
        );
      }
    },
    {
      title: '排序',
      dataIndex: ['attr', 'sort'],
      key: 'sort'
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: { attr: Attr; attrGroup: AttrGroup; category: CategoryResponse }) => (
        <Space size="small">
          <Tooltip title="编辑">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              onClick={() => handleEditAttr(record.attr, record.attrGroup, record.category)} 
            />
          </Tooltip>
          <Tooltip title="删除">
            <Popconfirm
              title="确定要删除这个属性吗?"
              onConfirm={() => handleDeleteAttr(record.attr)}
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

  // 属性组内属性表格列
  const groupAttrColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '编码',
      dataIndex: 'code',
      key: 'code'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: number) => (
        <Tag color={status === 1 ? 'green' : 'red'}>
          {status === 1 ? '启用' : '禁用'}
        </Tag>
      )
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: number) => {
        const typeMap = {
          1: { text: '输入框', color: 'blue' },
          2: { text: '单选', color: 'green' },
          3: { text: '多选', color: 'orange' },
          4: { text: '下拉框', color: 'purple' }
        };
        return (
          <Tag color={typeMap[type as keyof typeof typeMap]?.color || 'default'}>
            {typeMap[type as keyof typeof typeMap]?.text || '未知'}
          </Tag>
        );
      }
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort'
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Attr, index: number, originData: Attr[]) => (
        <Space size="small">
          <Tooltip title="编辑">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              onClick={() => {
                if (selectedAttrGroup && selectedCategory) {
                  handleEditAttr(record, selectedAttrGroup, selectedCategory);
                }
              }} 
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
      )
    }
  ];

  // 渲染内容
  const renderContent = () => {
    return (
      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab}
        className={styles.tabs}
        tabBarExtraContent={
          <Space>
            <Input 
              placeholder="搜索属性组或属性" 
              prefix={<SearchOutlined />} 
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className={styles.searchInput}
            />
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={() => handleAddAttrGroup()}
            >
              添加属性组
            </Button>
            <Button 
              icon={<ReloadOutlined />}
              onClick={fetchCategories}
            >
              刷新
            </Button>
          </Space>
        }
      >
        <TabPane tab="属性组管理" key="groups">
          <Table 
            columns={attrGroupColumns}
            dataSource={getFilteredAttrGroups()}
            rowKey={(record) => `${record.attrGroup.id}-${record.category.id}`}
            loading={loading}
            pagination={{ pageSize: 10 }}
            expandable={{
              expandedRowRender: (record) => {
                setSelectedAttrGroup(record.attrGroup);
                setSelectedCategory(record.category);
                return (
                  <div className={styles.nestedTable}>
                    <div className={styles.tableHeader}>
                      <h4 className={styles.title}>属性列表</h4>
                      <Button 
                        type="primary" 
                        size="small"
                        icon={<PlusOutlined />}
                        onClick={() => handleAddAttr(record.attrGroup, record.category)}
                      >
                        添加属性
                      </Button>
                    </div>
                    <Table 
                      columns={groupAttrColumns as ColumnType<Attr>[]}
                      dataSource={record.attrGroup.attrs || []}
                      rowKey="id"
                      size="small"
                      pagination={false}
                      locale={{
                        emptyText: (
                          <Empty 
                            image={Empty.PRESENTED_IMAGE_SIMPLE} 
                            description="暂无属性数据" 
                          />
                        )
                      }}
                    />
                  </div>
                );
              },
            }}
            className={styles.table}
            locale={{
              emptyText: (
                <Empty 
                  image={Empty.PRESENTED_IMAGE_SIMPLE} 
                  description="暂无属性组数据" 
                />
              )
            }}
          />
        </TabPane>
        <TabPane tab="属性列表" key="attributes">
          <Table 
            columns={attrColumns}
            dataSource={getFilteredAttributes()}
            rowKey={(record) => `${record.attr.id}-${record.attrGroup.id}-${record.category.id}`}
            loading={loading}
            pagination={{ pageSize: 10 }}
            className={styles.table}
            locale={{
              emptyText: (
                <Empty 
                  image={Empty.PRESENTED_IMAGE_SIMPLE} 
                  description="暂无属性数据" 
                />
              )
            }}
          />
        </TabPane>
      </Tabs>
    );
  };

  return (
    <div className={styles.attributesManage}>
      <AdminContentCard
        title="属性组管理"
        icon={<AppstoreOutlined />}
        reqKey="attributes"
      >
        {renderContent()}
      </AdminContentCard>

      {/* 属性组表单弹窗 */}
      <Modal
        title={editMode === 'add' ? "添加属性组" : "编辑属性组"}
        open={attrGroupModalVisible}
        onOk={handleSaveAttrGroup}
        onCancel={() => setAttrGroupModalVisible(false)}
        width={600}
      >
        <Form
          form={attrGroupForm}
          layout="vertical"
        >
          {editMode === 'edit' && (
            <Form.Item name="id" label="ID" hidden>
              <Input />
            </Form.Item>
          )}
          
          <Form.Item name="categoryId" hidden>
            <Input />
          </Form.Item>
          
          <Form.Item
            name="categoryName"
            label="所属分类"
          >
            <Input disabled />
          </Form.Item>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="属性组名称"
                rules={[{ required: true, message: '请输入属性组名称' }]}
              >
                <Input placeholder="请输入属性组名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="code"
                label="属性组编码"
                rules={[{ required: true, message: '请输入属性组编码' }]}
              >
                <Input placeholder="请输入属性组编码" />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="type"
                label="属性组类型"
                rules={[{ required: true, message: '请选择属性组类型' }]}
              >
                <Select placeholder="请选择属性组类型">
                  <Select.Option value={1}>基本属性</Select.Option>
                  <Select.Option value={2}>销售属性</Select.Option>
                  <Select.Option value={3}>规格属性</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="status"
                label="状态"
                rules={[{ required: true, message: '请选择状态' }]}
              >
                <Select placeholder="请选择状态">
                  <Select.Option value={1}>启用</Select.Option>
                  <Select.Option value={0}>禁用</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="sort"
                label="排序"
                rules={[{ required: true, message: '请输入排序值' }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} placeholder="数字越小越靠前" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* 属性表单弹窗 */}
      <Modal
        title={editMode === 'add' ? "添加属性" : "编辑属性"}
        open={attrModalVisible}
        onOk={handleSaveAttr}
        onCancel={() => setAttrModalVisible(false)}
        width={600}
      >
        <Form
          form={attrForm}
          layout="vertical"
        >
          {editMode === 'edit' && (
            <Form.Item name="id" label="ID" hidden>
              <Input />
            </Form.Item>
          )}
          
          <Form.Item name="categoryId" hidden>
            <Input />
          </Form.Item>
          
          <Form.Item name="attrGroupId" hidden>
            <Input />
          </Form.Item>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="categoryName"
                label="所属分类"
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="attrGroupName"
                label="所属属性组"
              >
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="属性名称"
                rules={[{ required: true, message: '请输入属性名称' }]}
              >
                <Input placeholder="请输入属性名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="code"
                label="属性编码"
                rules={[{ required: true, message: '请输入属性编码' }]}
              >
                <Input placeholder="请输入属性编码" />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="type"
                label="属性类型"
                rules={[{ required: true, message: '请选择属性类型' }]}
              >
                <Select placeholder="请选择属性类型">
                  <Select.Option value={1}>输入框</Select.Option>
                  <Select.Option value={2}>单选</Select.Option>
                  <Select.Option value={3}>多选</Select.Option>
                  <Select.Option value={4}>下拉框</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="status"
                label="状态"
                rules={[{ required: true, message: '请选择状态' }]}
              >
                <Select placeholder="请选择状态">
                  <Select.Option value={1}>启用</Select.Option>
                  <Select.Option value={0}>禁用</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="sort"
                label="排序"
                rules={[{ required: true, message: '请输入排序值' }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} placeholder="数字越小越靠前" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default AttributesManage;
