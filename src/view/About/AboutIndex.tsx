import React, { useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb, Divider } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom'; 

const { Header, Content, Sider } = Layout;

const menuData = [
  {
    key: 'about',
    title: '关于我们',
    children: [
      { key: 'about-1', title: '简介', anchor: 'section1' },
      { key: 'about-2', title: '为什么选择我们', anchor: 'section2' },
      { key: 'about-3', title: '联系我们', anchor: 'section3' },
    ],
  },
  {
    key: 'copyright',
    title: '版权申明',
    children: [
      { key: 'copyright-1', title: '风险提示', anchor: 'section4' },
      { key: 'copyright-2', title: '免责申明', anchor: 'section5' },
      { key: 'copyright-3', title: '版权说明', anchor: 'section6' },
      { key: 'copyright-4', title: '开源协议', anchor: 'section7' },
    ],
  },
  {
    key: 'service',
    title: '服务协议',
    children: [
      { key: 'service-1', title: '子菜单2-1', anchor: 'section8' },
      { key: 'service-2', title: '子菜单2-2', anchor: 'section9' },
    ],
  },
  {
    key: 'questions',
    title: '常见问题',
    children: [
      { key: 'questions-1', title: '什么是代币质押？', anchor: 'section10' },
      { key: 'questions-2', title: '如何获取收益？', anchor: 'section11' },
      { key: 'questions-3', title: '中途退出怎么办？', anchor: 'section12' },
      { key: 'questions-4', title: '质押的代币有风险吗？', anchor: 'section13' },
      { key: 'questions-5', title: '质押的代币用来干什么？', anchor: 'section14' },
    ],
  }
];

const About = () => {
  const [selectedKey, setSelectedKey] = useState(menuData[0].key);
  const [subSelectedKey, setSubSelectedKey] = useState(menuData[0].children[0].key);
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    const hash = location.hash.replace('#', '');
    const foundItem = menuData.flatMap(item => item.children).find(child => child.anchor === hash);
    if (foundItem) {
      setSubSelectedKey(foundItem.key);
    }
  }, [location]);


  const handleMenuClick = (e: { key: any; keyPath: any; }) => {
    const { key, keyPath } = e;
    console.info("select key: "+key+"; key path: "+keyPath);
    menuData.map(itm =>{
      if(itm.children.length>0){
        itm.children.forEach(subItem =>{
          if(subItem.key == key){
            setSelectedKey(itm.key);
            setSubSelectedKey(subItem.key);
          }
        })
      }
    });
  };


  const renderBreadcrumb = () => {
    return (
      <Breadcrumb>
        <Breadcrumb.Item><Link to="/home">首页</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/about">关于我们</Link></Breadcrumb.Item>
        {menuData.map((item) => (
          item.key === selectedKey && (
            <Breadcrumb.Item key={item.key}>
              <Link to={`/${item.key}`}>{item.title}</Link>
            </Breadcrumb.Item>
          )
        ))}
      </Breadcrumb>
    );
  };


  const renderContent = () => {
    const selectedItem = menuData.find((item) => item.key === selectedKey);
    if (!selectedItem) {
      return <div>未找到选中的内容</div>;
    }


    return (
      <div style={{width:'95%',marginLeft:'20px'}}>
        <div className="row">
          <div className="col-6">
             <h3>{selectedItem.title}</h3>
          </div>
          <div className="col-6" style={{textAlign:'right',marginTop:'7px'}}>
              <span style={{color:'gray'}}>www.rcc-pledge.com</span>
          </div>
        </div>
        <Divider dashed />
       {
        selectedItem && selectedItem.children.map(subItm => {
          return <div>
            <div><span className="text-info" style={{fontSize:'20px'}}><strong>{subItm.title}</strong></span></div>
            <p>这是内容部分 {selectedItem.title} -- {subItm.title}</p>
            {/* 这里可以添加其他与selectedSubItem相关的内容 */}
            <Divider dashed />
          </div>
        })
       }
      </div>
    );
  };


  return (
    <div style={{ alignItems: 'center' }}>
      <Layout style={{ height: '100vh', width: '95%', marginLeft: '30px' }}>
        {/* 页面头部，包含 Breadcrumb 组件 */}
        <Header style={{ background: '#F5F5F5', padding: '0 0', display: 'flex', alignItems: 'center', justifyContent: 'start', height: '40px' }}>
          {renderBreadcrumb()}
        </Header>
        {/* 页面主体部分，分为左右布局 */}
        <Layout style={{ padding: '0 0', flex: 1 }}>
          {/* 左侧二级导航菜单 */}
          <Sider width={300} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={[menuData[0].key]}
              defaultOpenKeys={menuData.map((item) => item.key)}
              onClick={handleMenuClick}
              selectedKeys={[selectedKey]}
              style={{ backgroundColor: '#fff' }}
            >
              {menuData.map((menuItem) => (
                <Menu.SubMenu key={menuItem.key} title={menuItem.title}>
                  {menuItem.children.map((subMenuItem) => (
                    <Menu.Item key={subMenuItem.key} style={{ backgroundColor: selectedKey === menuItem.key && subSelectedKey === subMenuItem.key? '#E6F4FF' : '#fff' }}>
                      {subMenuItem.title}
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              ))}
            </Menu>
          </Sider>
          {/* 右侧内容区域 */}
          <Content style={{ padding: '24px 0', backgroundColor: '#fff' }}>
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};


export default About;