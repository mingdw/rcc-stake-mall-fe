import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Space, Select, Checkbox, Row, Col } from 'antd';
import { PlusOutlined, KeyOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AdminContentCard from '../AdminContentCard';
import styles from './RoleManagement.module.scss';

interface Role {
    id: string;
    name: string;
    description: string;
    permissions: string[];
}

// 权限选项
const permissionOptions = [
    { label: '合约管理', value: 'contract_manage' },
    { label: '质押池管理', value: 'pool_manage' },
    { label: '参数设置', value: 'param_setting' },
    { label: '紧急控制', value: 'emergency_control' },
    { label: '用户管理', value: 'user_manage' },
    { label: '合约升级', value: 'contract_upgrade' },
    { label: '财务监控', value: 'finance_monitor' },
];

const RoleManagement: React.FC = () => {
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingRole, setEditingRole] = useState<Role | null>(null);
    const [form] = Form.useForm();

    // 模拟获取角色数据
    useEffect(() => {
        const fetchRoles = async () => {
            setLoading(true);
            try {
                // 模拟API调用
                setTimeout(() => {
                    const mockRoles: Role[] = [
                        {
                            id: '1',
                            name: '超级管理员',
                            description: '拥有所有权限',
                            permissions: ['contract_manage', 'pool_manage', 'param_setting', 'emergency_control', 'user_manage', 'contract_upgrade', 'finance_monitor']
                        },
                        {
                            id: '2',
                            name: '运营管理员',
                            description: '负责日常运营',
                            permissions: ['pool_manage', 'user_manage', 'finance_monitor']
                        },
                        {
                            id: '3',
                            name: '财务管理员',
                            description: '负责财务监控',
                            permissions: ['finance_monitor']
                        }
                    ];
                    setRoles(mockRoles);
                    setLoading(false);
                }, 1000);
            } catch (error) {
                message.error('获取角色列表失败');
                setLoading(false);
            }
        };

        fetchRoles();
    }, []);

    // 打开新增/编辑角色弹窗
    const showModal = (role?: Role) => {
        setEditingRole(role || null);
        form.resetFields();
        
        if (role) {
            form.setFieldsValue({
                name: role.name,
                description: role.description,
                permissions: role.permissions
            });
        }
        
        setIsModalVisible(true);
    };

    // 处理表单提交
    const handleSubmit = async (values: any) => {
        try {
            if (editingRole) {
                // 更新角色
                const updatedRole = {
                    ...editingRole,
                    ...values
                };
                
                // 模拟API调用
                setRoles(roles.map(role => 
                    role.id === editingRole.id ? updatedRole : role
                ));
                
                message.success('角色更新成功');
            } else {
                // 新增角色
                const newRole: Role = {
                    id: Date.now().toString(), // 模拟ID生成
                    ...values
                };
                
                // 模拟API调用
                setRoles([...roles, newRole]);
                
                message.success('角色创建成功');
            }
            
            setIsModalVisible(false);
        } catch (error) {
            message.error('操作失败');
        }
    };

    // 删除角色
    const handleDelete = (id: string) => {
        Modal.confirm({
            title: '确认删除',
            content: '确定要删除这个角色吗？删除后无法恢复。',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                // 模拟API调用
                setRoles(roles.filter(role => role.id !== id));
                message.success('角色已删除');
            }
        });
    };

    // 表格列定义
    const columns = [
        {
            title: '角色名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: '权限',
            dataIndex: 'permissions',
            key: 'permissions',
            render: (permissions: string[]) => (
                <div>
                    {permissions.map(perm => {
                        const option = permissionOptions.find(opt => opt.value === perm);
                        return option ? (
                            <span key={perm} style={{ marginRight: 8 }}>
                                {option.label}
                            </span>
                        ) : null;
                    })}
                </div>
            )
        },
        {
            title: '操作',
            key: 'action',
            render: (_: any, record: Role) => (
                <Space>
                    <Button 
                        type="link" 
                        icon={<EditOutlined />}
                        onClick={() => showModal(record)}
                    >
                        编辑
                    </Button>
                    <Button 
                        type="link" 
                        danger 
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record.id)}
                    >
                        删除
                    </Button>
                </Space>
            )
        }
    ];

    return (
        <AdminContentCard title="权限管理" icon={<KeyOutlined />}>
            <div className={styles.roleManagement}>
                <div className={styles.header}>
                    <Button 
                        type="primary" 
                        icon={<PlusOutlined />}
                        onClick={() => showModal()}
                    >
                        新增角色
                    </Button>
                </div>
                
                <Table 
                    columns={columns}
                    dataSource={roles}
                    loading={loading}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                />
                
                <Modal
                    title={editingRole ? '编辑角色' : '新增角色'}
                    open={isModalVisible}
                    onCancel={() => setIsModalVisible(false)}
                    footer={null}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                    >
                        <Form.Item
                            name="name"
                            label="角色名称"
                            rules={[{ required: true, message: '请输入角色名称' }]}
                        >
                            <Input placeholder="请输入角色名称" />
                        </Form.Item>
                        
                        <Form.Item
                            name="description"
                            label="角色描述"
                            rules={[{ required: true, message: '请输入角色描述' }]}
                        >
                            <Input.TextArea placeholder="请输入角色描述" rows={3} />
                        </Form.Item>
                        
                        <Form.Item
                            name="permissions"
                            label="权限设置"
                            rules={[{ required: true, message: '请选择至少一项权限' }]}
                        >
                            <Checkbox.Group style={{ width: '100%' }}>
                                <Row>
                                    {permissionOptions.map(option => (
                                        <Col span={12} key={option.value}>
                                            <Checkbox value={option.value}>{option.label}</Checkbox>
                                        </Col>
                                    ))}
                                </Row>
                            </Checkbox.Group>
                        </Form.Item>
                        
                        <Form.Item className={styles.modalFooter}>
                            <Button onClick={() => setIsModalVisible(false)} style={{ marginRight: 8 }}>
                                取消
                            </Button>
                            <Button type="primary" htmlType="submit">
                                确定
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </AdminContentCard>
    );
};

export default RoleManagement; 