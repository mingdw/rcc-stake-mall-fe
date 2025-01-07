import React, { useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb, Divider, List, Typography } from 'antd';
import {ArrowDownOutlined, ArrowUpOutlined, DollarCircleOutlined, FieldNumberOutlined, GiftOutlined, MailOutlined, PhoneOutlined, QqOutlined,UserOutlined,WarningOutlined,WechatOutlined} from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom'; 
import Item from 'antd/es/list/Item';
const { Header, Content, Sider } = Layout;
const { Text } = Typography;
import classnames from 'classnames';
import css from './About.module.scss'
const menuData = [
  {
    key: 'about',
    title: '关于我们',
    children: [
      { key: 'about-1', title: '简介', anchor: 'section1'},
      { key: 'about-2', title: '为什么选择我们', anchor: 'section2'},
      { key: 'about-3', title: '联系我们', anchor: 'section3',content:
      
        '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="#!"><span className="img-avatar img-avatar-48 bg-translucent text-warning"><QqOutlined />&nbsp;&nbsp;&nbsp;466830255</span></a></p>'+
        '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="#!"><span className="img-avatar img-avatar-48 bg-translucent text-warning"><WechatOutlined />&nbsp;&nbsp;&nbsp;mingdong1129</span></a></p>'+
        '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <a href="#!"> <span className="img-avatar img-avatar-48 bg-translucent text-warning"><PhoneOutlined />&nbsp;&nbsp;&nbsp;18710181258</span></a></p>'+
        '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <a href="#!"> <span className="img-avatar img-avatar-48 bg-translucent text-warning"><MailOutlined />&nbsp;&nbsp;&nbsp;7023302@qq.com</span></a></p>'
       },
    ],
  },
  {
    key: 'copyright',
    title: '版权申明',
    children: [
      { key: 'copyright-1', title: '风险提示', anchor: 'section4',content:''},
      { key: 'copyright-2', title: '免责申明', anchor: 'section5',content:''},
      { key: 'copyright-3', title: '版权说明', anchor: 'section6',content:''},
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
      { key: 'questions-1', title: '什么是代币质押？', anchor: 'section10',content:''},
      { key: 'questions-2', title: '如何获取收益？', anchor: 'section11',content:''},
      { key: 'questions-3', title: '中途退出怎么办？', anchor: 'section12',content:''},
      { key: 'questions-4', title: '质押的代币有风险吗？', anchor: 'section13',content:'' },
      { key: 'questions-5', title: '质押的代币用来干什么？', anchor: 'section14',content:''},
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
            // 新增：滚动到相应的锚点位置
            const anchorElement = document.getElementById(key);
            if (anchorElement) {
              anchorElement.scrollIntoView({ behavior: 'smooth' });
            }
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
    const curMenu =  menuData.find( item => item.key===selectedKey)
    const itemDatas = [
      {
        title:<Link to="/home">首页</Link>
      },{
        title:<Link to="/about" onClick={(event) => handleBreadcrumbClick(event, 'about')}>关于我们</Link>,
      }
    ]
   
    if(curMenu){
      console.info("curMenu:"+curMenu.title)
      itemDatas.push({
        title:<Link to={curMenu.key} onClick={(event) => handleBreadcrumbClick(event, curMenu.key)}>{curMenu.title}</Link>
      })
    }
    return ( <Breadcrumb items={itemDatas}/>);
  };

  //根据key生成实际内容组件页面
  const creatContent = (key:string) =>{
      if(key==="about-1"){
        return (<><div><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在当今数字化浪潮蓬勃发展的时代，加密货币领域不断涌现出创新的金融模式，RCC 代币质押平台应运而生，为广大投资者提供了一个极具潜力的财富增值渠道。</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RCC 代币质押平台专注于比特币质押服务，致力于打造高效、透明、安全的一站式体验。首先，说到高效，平台依托先进的区块链技术架构，实现了质押流程的极速处理。用户只需简单几步操作，即可完成比特币的质押，瞬间开启收益之旅，无需繁琐的等待与复杂的审核环节，节省了大量时间成本，让资金快速流转产生价值</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;透明性更是平台的核心亮点之一。所有的质押数据、收益明细都清晰地记录在区块链上，不可篡改且面向所有用户公开。投资者能够实时追踪自己质押比特币的状态，了解每一笔 R 币收益的来源，这种高度透明给予用户十足的信任感，使其在投资过程中心中有数。</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;而安全保障方面，平台采用了多重加密技术，从钱包存储到交易验证，全方位守护用户资产安全。同时，配备专业的安全团队，24 小时监控系统，及时应对任何潜在风险，确保比特币资产固若金汤，让投资者毫无后顾之忧。</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;质押比特币后，用户将按一定比例赢取 R 币。随着加密市场的动态变化，R 币展现出强劲的升值潜力。当 R 币价值攀升，用户便可在本平台便捷地兑换丰厚奖金，实现资产的稳健增长。无论是追求短期收益，还是布局长期财富规划，RCC 代币质押平台都凭借其独特优势，成为投资者在数字金融海洋中的可靠领航员，助力开启全新的财富篇章</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;未来，RCC 代币质押平台还将持续优化升级，紧跟行业趋势，为用户创造更多价值，携手共赴加密财富的璀璨未来。</p></div></>)
      }else if(key ==="about-2"){
        return (<><div><List size="large">
                  <Item>
                   <span><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;技术领先，高效便捷: </strong>依托前沿的区块链技术架构，简化质押流程至极致。用户仅需简单几步，就能闪电般完成比特币质押，快速开启收益，彻底告别繁琐等待与复杂审核，让资金时刻保持高效运转，不错过任何增值机会。</span>
                  </Item>
                  <Item>
                     <span><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;极致透明，安心托付: </strong>所有质押相关数据、收益细节均如实记录于区块链之上，不可篡改且面向全体用户公开，<span className="text-danger">并且可以随时退出</span>。投资者能实时掌握质押比特币动态，清楚知晓每一笔 R 币收益来源，如同将资产置于阳光之下，给予您满满的安全感与信任感</span>
                  </Item>
                  <Item>
                     <span><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;多重防护，资产无忧: </strong>深知资产安全至关重要，平台采用多重加密技术，从钱包存储到每一笔交易验证，层层设防。搭配专业的 24 小时安全监控团队，时刻警惕潜在风险，确保比特币资产稳如泰山，让您投资无后顾之忧</span>
                  </Item>
                <Item>
                   <span><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;潜力币种，丰厚回报: </strong>质押比特币可赢取具有强劲升值潜力的 R 币。随着加密市场的风云变幻，R 币价值一路看涨，为您开启财富增长新通道，凭借其增值红利，让资产实现稳健上扬。</span>
                </Item>
                <Item>
                  <span><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;便捷兑换，落袋为安: </strong>当 R 币价值攀升，平台提供便捷流畅的奖金兑换服务。无需复杂手续，轻松一点，即可将升值收益兑换成丰厚奖金，让您的财富增长实实在在看得见、摸得着</span>
                </Item>
                <Item>
                   <span><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;专业团队，护航全程: </strong>背后拥有一支由加密领域资深专家组成的专业团队，他们精通市场趋势、技术运维、风险管控。无论是日常运营，还是面对复杂多变的市场行情，都能为您的投资之旅保驾护航。</span>
                </Item>
                <Item>
                 <span><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持续创新，紧跟潮流: </strong>深知加密行业瞬息万变，平台始终保持敏锐嗅觉，持续投入研发，不断优化升级服务与功能，确保您始终站在行业前沿，享受最新、最优的投资体验，携手共赴财富新征程。</span>
                </Item>
                <Item>
                  <span><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;用户至上，贴心服务: </strong>将用户需求放在首位，打造全方位、多层次的客户服务体系。无论您是初涉加密领域的新手，还是经验丰富的老手，遇到任何问题，专业客服团队都能随时为您答疑解惑，提供贴心、周到的服务支持。</span>
                </Item>
         </List>
          </div></>)
      }else if(key==="about-3"){
        return(<>
          <List size='small'>
              <Item>
                <a href="#!"><QqOutlined />&nbsp;&nbsp;&nbsp;466830255</a>
              </Item>
              <Item>
              <a href="#!"><span className="img-avatar img-avatar-48 bg-translucent text-warning"><WechatOutlined />&nbsp;&nbsp;&nbsp;mingdong1129</span></a>
              </Item>
              <Item>
              <a><span className="img-avatar img-avatar-48 bg-translucent text-warning"><PhoneOutlined />&nbsp;&nbsp;&nbsp;18710181258</span></a>
              </Item>
              <Item>
              <a href="#!"> <span className="img-avatar img-avatar-48 bg-translucent text-warning"><MailOutlined />&nbsp;&nbsp;&nbsp;7023302@qq.com</span></a>
              </Item>
          </List>
          </>)
      }
  }


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
            <div id={subItm.key} key={subItm.key}>
              <div><span className="text-info" style={{fontSize:'20px'}}><strong>{subItm.title}</strong></span></div>
              {creatContent(subItm.key)}
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
          <Sider width={300} style={{ background: '#fff'}}> {/* 添加 position: fixed */}
            <Menu
              mode="inline"
              defaultSelectedKeys={[menuData[0].key]}
              defaultOpenKeys={menuData.map((item) => item.key)}
              onClick={handleMenuClick}
              selectedKeys={[selectedKey]}
              style={{ backgroundColor: '#fff' }}
              items={menuData.map(menuItem =>({
                key:menuItem.key,
                label:menuItem.title,
                children:menuItem.children.map(subMenuItem =>({
                  key:subMenuItem.key,
                  label:subMenuItem.title,
                  style: {
                     backgroundColor: selectedKey === menuItem.key && subSelectedKey === subMenuItem.key? '#E6F4FF' : '#fff' 
                    }
                }))
              }))}
            />
          </Sider>
          {/* 右侧内容区域 */}
          <Content style={{ padding: '24px 0', backgroundColor: '#fff', height: 'auto' }}>
            <div className={classnames(css.content)}>
              {renderContent()}
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
    
  );
};


export default About;