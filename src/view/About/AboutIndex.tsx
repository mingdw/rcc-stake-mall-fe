import React, { useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb, Divider, List, Typography } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom'; 
import Item from 'antd/es/list/Item';
const { Header, Content, Sider } = Layout;
const { Text } = Typography;
const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];
const menuData = [
  {
    key: 'about',
    title: '关于我们',
    children: [
      { key: 'about-1', title: '简介', anchor: 'section1', content:
          '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 北京中岚旅行社有限公司是北京领先的大型签证服务公司之一，十来年专注办理各国各类别的签证，并为客户提供全面、体贴的“一站式”出境便捷服务。北京中岚旅行社有限公司团队均来自各大签证机构，与多国领馆长期保持良好渠道关系，选择我们办理签证，将会有资深签证专员为您审核签证资料，签证成功率近100%，个别国家更是可以达到零拒签率，全年365天无间断，为客户提供丰富的后续服务和保障。</p>'+
         
          '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;北京中岚旅行社有限公司前身是某国旅签证中心，其核心团队专注出国签证代送业务十多年。现公司组织架构主要由北京中岚旅行社有限公司总部（位于北京市三里屯使馆区），以及分布在北京南北使馆区的7个签证部构成，呈卫星状环绕使馆中心。分别为：签证1-2分部位于北京光华路使馆南区，签证3-2分部位于北京三里屯使馆北区中心，签证6-7分布位于燕莎美国使馆片区，确保材料递交的时效性以及时时掌握使馆政策变化，各分部由经验丰富的带头人组织工作，均拥有一支资深签证专家队伍，针对签证办理遇到的各种问题，集北京各领使馆良好渠道资源，应对上已做到行之有效，游刃有余。</p>'+
         
          '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;北京中岚旅行社有限公司团队熟悉全球各国的签证申请条款、掌握相关签证政策的变化，具有丰富的行业从业经验和专业水准，与出入境和各省外办关系良好；针对出国、入境签证问题，我咨询人员均免费提供专业、快捷和贴心的咨询服务。过往丰富的签证个案证明，北京中岚旅行社有限公司咨询人员在应对各种疑难签证上已做到行之有效，游刃有余；对于具体签证个案，北京中岚旅行社有限公司咨询人员为您量身定做，制定解决方案，出签率高，为您省时、省力、省心，轻松获得签证，让您的出行更加便捷！</p>'
       },
      { key: 'about-2', title: '为什么选择我们', anchor: 'section2', content: '<List'+
      'size="large"'+
       'bordered >'+
            '<div style={{marginLeft:\'50px\'}}>'+
                  '</br>'+
                  '<Item>'+
                    '<p><span><strong>签证丰富:</strong>覆盖全球各国多类型签证，精心筛选出性价比高的特价签证，满足您出国需求。</span></p>'+
                '</Item>'+
                '<Item>'+
                    '<p><span><strong>签证丰富:</strong>覆盖全球各国多类型签证，精心筛选出性价比高的特价签证，满足您出国需求。</span></p>'+
                '</Item>'+
                '<Item>'+
                    '<p><span><strong>签证丰富:</strong>覆盖全球各国多类型签证，精心筛选出性价比高的特价签证，满足您出国需求。</span></p>'+
                '</Item>'+
                '<Item>'+
                    '<p><span><strong>签证丰富:</strong>覆盖全球各国多类型签证，精心筛选出性价比高的特价签证，满足您出国需求。</span></p>'+
                '</Item>'+
                '<Item>'+
                    '<p><span><stong>签证丰富:</stong>覆盖全球各国多类型签证，精心筛选出性价比高的特价签证，满足您出国需求。</span></p>'+
                '</Item>'+
            '</div>'+
            
         '</List>'
    },
      { key: 'about-3', title: '联系我们', anchor: 'section3',content:'<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 北京中岚旅行社有限公司是北京领先的大型签证服务公司之一，十来年专注办理各国各类别的签证，并为客户提供全面、体贴的“一站式”出境便捷服务。北京中岚旅行社有限公司团队均来自各大签证机构，与多国领馆长期保持良好渠道关系，选择我们办理签证，将会有资深签证专员为您审核签证资料，签证成功率近100%，个别国家更是可以达到零拒签率，全年365天无间断，为客户提供丰富的后续服务和保障。</p>'+
         
          '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;北京中岚旅行社有限公司前身是某国旅签证中心，其核心团队专注出国签证代送业务十多年。现公司组织架构主要由北京中岚旅行社有限公司总部（位于北京市三里屯使馆区），以及分布在北京南北使馆区的7个签证部构成，呈卫星状环绕使馆中心。分别为：签证1-2分部位于北京光华路使馆南区，签证3-2分部位于北京三里屯使馆北区中心，签证6-7分布位于燕莎美国使馆片区，确保材料递交的时效性以及时时掌握使馆政策变化，各分部由经验丰富的带头人组织工作，均拥有一支资深签证专家队伍，针对签证办理遇到的各种问题，集北京各领使馆良好渠道资源，应对上已做到行之有效，游刃有余。</p>'+
         
          '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;北京中岚旅行社有限公司团队熟悉全球各国的签证申请条款、掌握相关签证政策的变化，具有丰富的行业从业经验和专业水准，与出入境和各省外办关系良好；针对出国、入境签证问题，我咨询人员均免费提供专业、快捷和贴心的咨询服务。过往丰富的签证个案证明，北京中岚旅行社有限公司咨询人员在应对各种疑难签证上已做到行之有效，游刃有余；对于具体签证个案，北京中岚旅行社有限公司咨询人员为您量身定做，制定解决方案，出签率高，为您省时、省力、省心，轻松获得签证，让您的出行更加便捷！</p>'
       },
    ],
  },
  {
    key: 'copyright',
    title: '版权申明',
    children: [
      { key: 'copyright-1', title: '风险提示', anchor: 'section4' ,content:''},
      { key: 'copyright-2', title: '免责申明', anchor: 'section5' ,content:''},
      { key: 'copyright-3', title: '版权说明', anchor: 'section6' ,content:''},
      { key: 'copyright-4', title: '开源协议', anchor: 'section7',content:''},
    ],
  },
  {
    key: 'service',
    title: '服务协议',
    children: [
      { key: 'service-1', title: '子菜单2-1', anchor: 'section8',content:'' },
      { key: 'service-2', title: '子菜单2-2', anchor: 'section9',content:'' },
    ],
  },
  {
    key: 'questions',
    title: '常见问题',
    children: [
      { key: 'questions-1', title: '什么是代币质押？', anchor: 'section10' ,content:''},
      { key: 'questions-2', title: '如何获取收益？', anchor: 'section11' ,content:''},
      { key: 'questions-3', title: '中途退出怎么办？', anchor: 'section12' ,content:''},
      { key: 'questions-4', title: '质押的代币有风险吗？', anchor: 'section13',content:'' },
      { key: 'questions-5', title: '质押的代币用来干什么？', anchor: 'section14' ,content:''},
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
      // 滚动到对应的锚点位置
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
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
  
  const handleBreadcrumbClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, path: string) => {
    event.preventDefault(); // 阻止默认行为
    const cur = menuData.find(itm => itm.key===path)
    if(cur){
      setSelectedKey(cur.key)
      setSubSelectedKey(cur.children[0].key)
    }
    
  };

  const renderBreadcrumb = () => {
    return (
      <Breadcrumb>
        <Breadcrumb.Item><Link to="/home">首页</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/about" onClick={(event) => handleBreadcrumbClick(event, 'about')}>关于我们</Link></Breadcrumb.Item>
        {menuData.map((item) => (
          item.key === selectedKey && (
            <Breadcrumb.Item key={item.key}>
              <Link to={`/${item.key}`} onClick={(event) => handleBreadcrumbClick(event, item.key)}>{item.title}</Link>
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
          return (
            <div>
              <div><span className="text-info" style={{fontSize:'20px'}}><strong>{subItm.title}</strong></span></div>
              {subItm.content? <div dangerouslySetInnerHTML={{ __html: subItm.content }}></div>:''}
              <Divider dashed />
            </div>
          );
        })
       }
      </div>
    );
  };


  return (
    <div style={{marginLeft:'5%'}}>
      <Layout style={{ height: '100vh', width: '100%' }}>
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
          <Content style={{ padding: '24px 0', backgroundColor: '#fff',overflowY:'auto' }}>
          <div style={{ overflow: '-moz-scrollbars-none', '-ms-overflow-style': 'none', overflowY: 'scroll', scrollbarWidth: 'none' }}>
              {renderContent()}
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
    
  );
};


export default About;