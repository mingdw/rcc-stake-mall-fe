import React, { useEffect, useState } from 'react';
import { Layout, Spin, message } from 'antd';
import { UserOutlined, DatabaseOutlined, MoneyCollectOutlined, FileTextOutlined } from '@ant-design/icons';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './AdminLayout.module.scss';
import { authManager } from '../utils/authManager';

const { Sider, Content } = Layout;

// 定义菜单项的 props 类型
interface MenuItemProps {
    to: string; // 链接的路径
    children: React.ReactNode; // 子元素的类型
    name: string;
}
// 定义链接项的类型
interface LinkItem {
    path: string;
    label: string;
}

// 定义卡片组件的 props 类型
interface CardComponentProps {
    icon: React.ReactNode; // 图标的类型
    title: string;         // 标题的类型
    links: LinkItem[];    // 链接项的数组
}

const menuDatas = [
    {
        key: "profile",
        title: "个人中心",
        links: [
            { path: "/admin/profile/info", label: "个人信息" },
            { path: "/admin/profile/balance", label: "账户余额" },
            { path: "/admin/profile/security", label: "安全设置" },
            { path: "/admin/profile/history", label: "交易历史" },
            { path: "/admin/profile/notifications", label: "通知设置" },
        ]
    },
    {
        key: "suply",
        title: "质押管理",
        links: [
            { path: "/admin/suply", label: "概览" },
            { path: "/admin/history", label: "历史记录" },
        ]
    },
    {
        key: "order",
        title: "交易管理",
        links: [
            { path: "/admin/order", label: "概览" },
            { path: "/admin/history", label: "历史记录" },
        ]
    },
    {
        key: "contract",
        title: "合约管理",
        links: [
            { path: "/admin/contract", label: "合约管理"},
            { path: "/admin/contract/templates", label: "授权审核" },
        ]
    }
]

const AdminLayout: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState("个人信息");
    const [loading, setLoading] = useState(true);
    const [isAdminUser, setIsAdminUser] = useState(false);
    
    // 初始化用户信息
    useEffect(() => {
        const initUserData = async () => {
            setLoading(true);
            try {
                // 检查是否已有用户信息
                if (!authManager.userInfo) {
                    // 如果没有用户信息，初始化
                    await authManager.init();
                }
                
                // 获取用户信息并检查是否为管理员
                const userInfo = authManager.userInfo;
                if (userInfo) {
                    // 检查用户是否为管理员
                    setIsAdminUser(userInfo.isAdmin || false);
                } else {
                    message.error('无法获取用户信息，请重新登录');
                    // 可以选择重定向到登录页面
                    // navigate('/');
                }
            } catch (error) {
                console.error("初始化用户数据失败:", error);
                message.error('获取用户信息失败');
            } finally {
                setLoading(false);
            }
        };
        
        initUserData();
    }, [navigate]);
    
    useEffect(() => {
        navigate("/admin/profile/info");
    }, [navigate]);

    useEffect(() => {
        const menuData = menuDatas.find(item => 
            item.links.some(link => link.path === location.pathname)
        );
    
        const currentLink = menuData?.links.find(link => link.path === location.pathname);
        if (currentLink) {
            setSelectedItem(currentLink.label);
        }
    }, [location]);

    // 菜单项组件
    const MenuItem: React.FC<MenuItemProps> = ({ to, children, name }) => (
        <div className={styles.menuItem}>
            <Link 
                onClick={() => setSelectedItem(name)} 
                className={`${styles.menuLink} ${selectedItem === name ? styles.menuLinkActive : styles.menuLinkInactive}`}
                to={to}
            >
                {children}
            </Link>
        </div>
    );
    
    // 卡片组件
    const CardComponent: React.FC<CardComponentProps> = ({ icon, title, links }) => (
        <div className={styles.card}>
            <div className={styles.title}>
                <span className={styles.titleText}>{icon} {title}</span>
            </div>
            <div className={styles.cardContent}>
                {links.map((link, index) => (
                    <MenuItem key={index} to={link.path} name={link.label}>
                        {link.label}
                    </MenuItem>
                ))}
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <Spin size="large" tip="加载中..." />
            </div>
        );
    }

    return (
        <Layout className={styles.layout}>
            <Sider width={250} className={styles.left}>
                <CardComponent
                    icon={<UserOutlined />}
                    title={menuDatas.find(item => item.key === 'profile')?.title || "个人中心"}
                    links={menuDatas.find(item => item.key === 'profile')?.links || []}
                />
                <CardComponent
                    icon={<DatabaseOutlined className={styles.icon} />}
                    title={menuDatas.find(item => item.key === 'suply')?.title || "质押管理"}
                    links={menuDatas.find(item => item.key === 'suply')?.links || []}
                />
                <CardComponent
                    icon={<MoneyCollectOutlined className={styles.icon} />}
                    title={menuDatas.find(item => item.key === 'order')?.title || "交易管理"}
                    links={menuDatas.find(item => item.key === 'order')?.links || []} 
                />
                {isAdminUser && (
                    <CardComponent
                        icon={<FileTextOutlined className={styles.icon} />}
                        title={menuDatas.find(item => item.key === 'contract')?.title || "合约管理"}
                        links={menuDatas.find(item => item.key === 'contract')?.links || []}
                    />
                )}
            </Sider>

            <Layout className={styles.right}>
                <Content className={styles.content}>
                    <Outlet /> {/* 渲染匹配的子路由组件 */}
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;