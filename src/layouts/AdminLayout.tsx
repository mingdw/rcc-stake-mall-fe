import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { UserOutlined, DatabaseOutlined, MoneyCollectOutlined, FileTextOutlined } from '@ant-design/icons';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';


const { Sider, Content } = Layout;

const cardStyle = {
    margin: '16px',
    border:'1px solid #E1DBDB',
    borderRadius:'5px',
    backgroundColor:'#fff'
};

const titleStyle = {
    height:'40px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    color:'#17A0BF',
    backgroundColor:'#EEF2F4'
};

const contentStyle = {
   backgroundColor:'#fff',
};

const itemStyle = {
    padding: '5px 0',
    cursor: 'pointer',
    marginLeftLeft:'20px',
    borderBottom: '0.5px solid #F4F5F9', 
    color:'gray'
};

const hoverStyle = {
    backgroundColor: '#f0f0f0',
};

const iconStyle = {
    fontSize: '12px', 
    marginRight: '8px' 
}

// 定义菜单项的 props 类型
interface MenuItemProps {
    to: string; // 链接的路径
    children: React.ReactNode; // 子元素的类型
    isSelected: boolean; // 是否选中
    onClick: () => void; // 点击事件
}

// 菜单项组件
const MenuItem: React.FC<MenuItemProps> = ({ to, children, isSelected, onClick }) => (
    <div
        style={itemStyle}
        className="menu-item"
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
        onClick={onClick}
    >
        <Link style={{marginLeft:'40px',fontSize:'12px'}} to={to}>{children}</Link>
    </div>
);

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
    isSelected: boolean;   // 是否选中
    onSelect: () => void;  // 选中事件
}

// 卡片组件
const CardComponent: React.FC<CardComponentProps> = ({ icon, title, links, isSelected, onSelect }) => (
    <div style={cardStyle} onClick={onSelect}>
        <div style={titleStyle}>
            <span style={{marginLeft:'20px' }}> {icon} {title}</span>
        </div>
        <div style={contentStyle}>
            {links.map((link, index) => (
                <MenuItem key={index} to={link.path} isSelected={false} onClick={onSelect}>
                    {link.label}
                </MenuItem>
            ))}
        </div>
    </div>
);


const AdminLayout: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedCard, setSelectedCard] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [isActive, setIsActive] = useState(false); // 新增状态管理字体颜色
    
    useEffect(() => {
        navigate("/admin/profile/info");
    }, [navigate]);

    useEffect(() => {
        const path = location.pathname;
        if (path.startsWith("/profile")) {
            setSelectedCard("profile");
        } else if (path.startsWith("/stake")) {
            setSelectedCard("stake");
        } else if (path.startsWith("/lending")) {
            setSelectedCard("lending");
        } else if (path.startsWith("/contracts")) {
            setSelectedCard("contracts");
        } else {
            setSelectedCard(null);
        }
    }, [location]);

    const handleCardSelect = (card: string) => {
        setSelectedCard(card);
        setSelectedItem(null); // 重置选中的菜单项
        setIsActive(true); // 
    };

    const handleMenuItemSelect = (item: string) => {
        setSelectedItem(item);
    };


    return (
        <Layout style={{ width: '65%', margin: '0 auto' ,backgroundColor:'yellow'}}>
            <Sider width={250} style={{ background: 'rgb(245,245,245)' }}>
            <CardComponent
                    icon={<UserOutlined  />}
                    title="个人中心"
                    links={[
                        { path: "/admin/profile/info", label: "个人信息" },
                        { path: "/admin/profile/balance", label: "账户余额" },
                        { path: "/admin/profile/security", label: "安全设置" },
                        { path: "/admin/profile/history", label: "交易历史" },
                        { path: "/admin/profile/notifications", label: "通知设置" },
                    ]}
                    isSelected={selectedCard === "profile"}
                    onSelect={() => handleCardSelect("profile")}
                />
                <CardComponent
                    icon={<DatabaseOutlined style={iconStyle} />}
                    title="质押管理"
                    links={[
                        { path: "/admin/suply", label: "概览" },
                        { path: "/admin/history", label: "历史记录" },
                    ]}
                    isSelected={selectedCard === "stake"}
                    onSelect={() => handleCardSelect("stake")}
                />
                <CardComponent
                    icon={<MoneyCollectOutlined style={iconStyle} />}
                    title="借贷管理"
                    links={[
                        { path: "/admin/boorrow", label: "概览" },
                        { path: "/lending/transactions", label: "交易记录" },
                    ]}
                    isSelected={selectedCard === "lending"}
                    onSelect={() => handleCardSelect("lending")}
                />
                <CardComponent
                    icon={<FileTextOutlined style={iconStyle} />}
                    title="合约管理"
                    links={[
                        { path: "/admin/contract", label: "合约" },
                        { path: "/admin/contract/templates", label: "合同模板" },
                    ]}
                    isSelected={selectedCard === "contracts"}
                    onSelect={() => handleCardSelect("contracts")}
                />
            </Sider>

            <Layout style={{ padding: '16px' }}>
                <Content style={{ minHeight:'auto' ,width:'130%'}}>
                    <Outlet /> {/* 渲染匹配的子路由组件 */}
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;