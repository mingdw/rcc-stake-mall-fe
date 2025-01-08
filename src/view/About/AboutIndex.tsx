import React, { useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb, Divider, List, Typography } from 'antd';
import {ArrowDownOutlined, ArrowUpOutlined, DollarCircleOutlined, FieldNumberOutlined, GiftOutlined, GithubFilled, MailOutlined, PhoneOutlined, QqOutlined,UserOutlined,WarningOutlined,WechatOutlined} from '@ant-design/icons';
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
      { key: 'about-1', title: '简介'},
      { key: 'about-2', title: '为什么选择我们'},
      { key: 'about-3', title: '联系我们'},
    ],
  },
  {
    key: 'copyright',
    title: '版权申明',
    children: [
      { key: 'copyright-1', title: '风险提示'},
      { key: 'copyright-2', title: '免责申明'},
      { key: 'copyright-3', title: '版权说明'},
      { key: 'copyright-4', title: '开源协议'},
    ],
  },
  {
    key: 'service',
    title: '服务协议',
    children: [
      { key: 'service-1', title: '服务与协议详情'}
    ],
  },
  {
    key: 'questions',
    title: '常见问题',
    children: [
      { key: 'questions-1', title: 'Q1.什么是RCC代币质押？'},
      { key: 'questions-2', title: 'Q2.如何获取收益？'},
      { key: 'questions-3', title: 'Q3.中途退出怎么办？'},
      { key: 'questions-4', title: 'Q4.质押的代币有风险吗？'},
      { key: 'questions-5', title: 'Q5.质押的代币用来干什么？'},
      { key: 'questions-6', title: 'Q6.平台如何盈利？'},
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
    const foundItem = menuData.flatMap(item => item.children).find(child => child.key === hash);
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
      const anchorElement = document.getElementById(cur.children[0].key);
      if (anchorElement) {
        anchorElement.scrollIntoView({ behavior: 'smooth' });
      }
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
      itemDatas.push({
        title:<Link to={curMenu.key} onClick={(event) => handleBreadcrumbClick(event, curMenu.key)}>{curMenu.title}</Link>
      })
    }
    return ( <Breadcrumb items={itemDatas}/>);
  };

  //根据key生成实际内容组件页面
  const creatContent = (key:string) =>{
      if(key==="about-1"){
        return (<><div>
                  <br/>
                  <ul className='list-group list-group-flush'>
                    <li className='list-group-item'>
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在当今数字化浪潮蓬勃发展的时代，加密货币领域不断涌现出创新的金融模式，RCC 代币质押平台应运而生，为广大投资者提供了一个极具潜力的财富增值渠道。</span>
                    </li> 
                    <li className='list-group-item'>
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RCC 代币质押平台专注于以太坊质押服务，致力于打造高效、透明、安全的一站式体验。首先，说到高效，平台依托先进的区块链技术架构，实现了质押流程的极速处理。用户只需简单几步操作，即可完成以太坊的质押，瞬间开启收益之旅，无需繁琐的等待与复杂的审核环节，节省了大量时间成本，让资金快速流转产生价值</span>
                    </li> 
                    <li className='list-group-item'>
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;透明性更是平台的核心亮点之一。所有的质押数据、收益明细都清晰地记录在区块链上，不可篡改且面向所有用户公开。投资者能够实时追踪自己质押以太坊的状态，了解每一笔 R 币收益的来源，这种高度透明给予用户十足的信任感，使其在投资过程中心中有数。</span>
                    </li> 
                    <li className='list-group-item'>
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;而安全保障方面，平台采用了多重加密技术，从钱包存储到交易验证，全方位守护用户资产安全。同时，配备专业的安全团队，24 小时监控系统，及时应对任何潜在风险，确保以太坊资产固若金汤，让投资者毫无后顾之忧。</span>
                    </li> 
                    <li className='list-group-item'>
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;质押以太坊后，用户将按一定比例赢取 R 币。随着加密市场的动态变化，R 币展现出强劲的升值潜力。当 R 币价值攀升，用户便可在本平台便捷地兑换丰厚奖金，实现资产的稳健增长。无论是追求短期收益，还是布局长期财富规划，RCC 代币质押平台都凭借其独特优势，成为投资者在数字金融海洋中的可靠领航员，助力开启全新的财富篇章。</span>
                    </li>
                    <li className='list-group-item'>
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;未来，RCC 代币质押平台还将持续优化升级，紧跟行业趋势，为用户创造更多价值，携手共赴加密财富的璀璨未来。</span>
                    </li>
                </ul>
                </div></>)
      }else if(key ==="about-2"){
        return (<><div><List size="large">
                  <Item>
                   <span><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;技术领先，高效便捷: </strong>依托前沿的区块链技术架构，简化质押流程至极致。用户仅需简单几步，就能闪电般完成以太坊质押，快速开启收益，彻底告别繁琐等待与复杂审核，让资金时刻保持高效运转，不错过任何增值机会。</span>
                  </Item>
                  <Item>
                     <span><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;极致透明，安心托付: </strong>所有质押相关数据、收益细节均如实记录于区块链之上，不可篡改且面向全体用户公开，<span className="text-danger">并且可以随时退出</span>。投资者能实时掌握质押以太坊动态，清楚知晓每一笔 R 币收益来源，如同将资产置于阳光之下，给予您满满的安全感与信任感</span>
                  </Item>
                  <Item>
                     <span><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;多重防护，资产无忧: </strong>深知资产安全至关重要，平台采用多重加密技术，从钱包存储到每一笔交易验证，层层设防。搭配专业的 24 小时安全监控团队，时刻警惕潜在风险，确保以太坊资产稳如泰山，让您投资无后顾之忧</span>
                  </Item>
                <Item>
                   <span><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;潜力币种，丰厚回报: </strong>质押以太坊可赢取具有强劲升值潜力的 R 币。随着加密市场的风云变幻，R 币价值一路看涨，为您开启财富增长新通道，凭借其增值红利，让资产实现稳健上扬。</span>
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
          <div className='text-success'>
          <br/>
          <List size='small' style={{fontSize:'18px'}} className="text-success">
              <Item >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<QqOutlined />&nbsp;&nbsp;&nbsp;<span>466830255</span>
              </Item>
              <Item>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<WechatOutlined />&nbsp;&nbsp;&nbsp;<span>mingdong1129</span>
              </Item>
              <Item>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<PhoneOutlined />&nbsp;&nbsp;&nbsp;<span>18710181258</span>
              </Item>
              <Item>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<MailOutlined />&nbsp;&nbsp;&nbsp;<span>7023302@qq.com</span>
              </Item>
          </List></div>
          </>)
      }else if(key ==="copyright-1"){
        return(<>
          <div>
            <br/>
            <div>尊敬的用户：</div>
            <div>近期市场上出现一些不法分子打着 RCC 代币平台或类似名义进行诈骗活动，为保护您的财产安全与合法权益，特向您发出以下郑重风险提示：</div>
            <div>
              <span><strong>一、关于 RCC 代币平台本身</strong></span>
              <List>
                <Item>
                  <span className='text-info'>1. </span>监管不确定性：虚拟货币相关业务活动在我国不受法律保护，包括虚拟货币的质押、交易等行为。RCC 代币平台所涉及的以太坊质押获取 R 币收益模式，随时面临监管政策调整风险，一旦政策收紧，您的投资、收益提取等环节可能受阻，甚至面临资产损失。
                </Item>
                <Item>
                  <span className='text-info'>2. </span>技术风险：以太坊网络本身存在诸如智能合约漏洞、网络拥堵、黑客攻击等技术隐患。质押过程中若遭遇这些问题，您质押的以太坊可能面临被盗取、无法按时解锁，进而影响 R 币收益的正常获取，平台也未必有足够能力应对此类复杂技术危机保障您的权益。
                </Item>
              </List>
              <span><strong>二、防范假冒风险</strong></span>
              <List>
                <Item>
                  <span className='text-info'>1. </span>虚假项目：不法分子可能会冒用 RCC 名义，搭建虚假网站、APP，外观与正版平台极为相似，诱导您输入私钥、助记词等关键信息，一旦泄露，您的以太坊资产将被瞬间转移，血本无归。他们常以高额 R 币收益回报为诱饵，远超正常市场水平，极具欺骗性
                </Item>
                <Item>
                  <span className='text-info'>2. </span>误导推广：打着 “RCC 官方合作”“独家代理” 等旗号，在社交媒体、线下讲座等渠道进行虚假宣传，吸引投资者参与。但实际上与真正的 RCC 平台毫无关联，骗取您的信任投入资金后便失联跑路。
                </Item>
              </List>
            </div>
            <span><strong>三、警惕非法集资陷阱</strong></span>
            <List>
                <Item>
                  <span className='text-info'>1. </span>虚假回报承诺：当前，不法分子利用 “虚拟货币”“区块链” 等热门概念行骗时，最常用的手段就是许以超高回报率吸引投资者上钩。他们动辄吹嘘 “几个月内资产翻倍”“年化收益高达百分之几百”，这些离谱的承诺远远超出了正常投资在合理市场环境下所能达到的盈利水平。在现实的金融市场中，稳健型投资的年化收益通常仅在几个百分点，高风险投资收益虽相对较高但也极难达到如此夸张程度，所以这类超高回报基本可以断定是骗局。
                </Item>
                <Item>
                  <span className='text-info'>2. </span>无真实商业模式：这些打着 “虚拟货币”“区块链” 旗号的非法集资项目，往往没有任何真实可行的商业应用或盈利模式作为支撑。它们并非基于市场需求、技术创新去创造价值获取利润，而只是一门心思编造故事、画大饼。例如，有些所谓的区块链项目，声称要颠覆某个传统行业，却拿不出具体的技术方案、落地规划，纯粹是空中楼阁，只为骗取您的投资款。
                </Item>
                <Item>
                  <span className='text-info'>3. </span>资金链断裂风险及法律后果：由于没有实质营收，此类非法集资项目只能依赖不断吸引新投资者投入资金，用新钱填旧账，以支付前期投资者所谓的高额回报。一旦新投资者数量减少，资金流入不足，就必然导致资金链断裂。届时，您不仅无法拿到承诺的高额收益，连本金都会血本无归。更为严重的是，参与此类非法集资活动本身触犯法律，一旦东窗事发，您作为参与者，不但要承受财产损失的痛苦，还可能面临法律的惩处，给自己和家庭带来极大的负面影响
                </Item>
              </List>
              <WarningOutlined style={{fontSize:'16px',color:'red'}}/><span className='text-danger'>特别说明：本平台合约地址透明，本金可随时解除质押退回原地址(扣除手续费外)</span>
          </div>
         
        </>)
      }else if(key==="copyright-2"){
        return (<>
          <div>
            <br/>
            <div>本免责声明旨在向您阐明与 RCC 代币平台相关信息沟通及风险提示事宜中的权利与责任界限，请您仔细阅读。</div>
            <div>
              <span><strong>一、信息性质与责任限定</strong></span>
              <List>
                <Item>
                  <span className='text-info'>1. </span>本风险提示信息仅供参考，旨在帮助您了解市场中存在的以 RCC 代币平台及相关 “虚拟货币”“区块链” 概念为名的诈骗风险概况。所提供内容不构成任何投资建议、金融咨询或法律意见，您应依据自身的财务状况、风险承受能力、投资知识与经验等因素，独立自主地做出投资决策。
                </Item>
                <Item>
                  <span className='text-info'>2. </span>对于您因依赖或参照本风险提示信息而做出的任何投资行为、经济决策及其后果，我们不承担任何直接或间接的责任。您确认知晓虚拟货币市场高度复杂多变，各类风险层出不穷，投资决策最终责任完全在于您个人。
                </Item>
              </List>
              <span><strong>二、平台真实性与假冒警示</strong></span>
              <List>
                <Item>
                  <span className='text-info'>1. </span>我们已尽力向您揭示可能冒用 RCC 代币平台名义的诈骗行径，但无法保证穷尽所有假冒情形。若您遭遇声称与 RCC 代币平台有关联，却不在本提示范围内的可疑情况，您有责任自行核实对方身份真实性、合法性，切勿轻易轻信。
                </Item>
                <Item>
                  <span className='text-info'>2. </span>如因您未能谨慎辨别真伪，误信虚假信息而遭受财产损失、个人信息泄露等不利后果，我们不承担赔偿责任。同时，建议您及时向相关执法部门报案，维护自身权益。
                </Item>
              </List>
              <span><strong>三、非法集资防范提醒</strong></span>
              <List>
                <Item>
                  <span className='text-info'>1. </span>针对涉及 “虚拟货币”“区块链” 的非法集资风险提示，仅为帮助您提高风险防范意识。您参与任何此类项目所引发的经济纠纷、法律责任，与本信息提供方无关。您必须清楚认识到非法集资活动的违法本质及严重危害，自行把控远离此类非法活动的底线。
                </Item>
                <Item>
                  <span className='text-info'>2. </span>若您明知某项目存在非法集资嫌疑仍执意参与，由此导致的一切损失，包括但不限于本金损失、法律诉讼成本等，均由您自行承担，我们不会对您的行为后果负责，亦不会介入您与非法集资方的纠纷处理。
                </Item>
              </List>
              <span><strong>四、信息更新与时效</strong></span>
              <List>
                <Item>
                  <span className='text-info'>1. </span>虚拟货币及相关诈骗手段日新月异，本风险提示信息基于当前已知情况编制。但我们无法保证信息的永久准确性与及时性，市场动态变化可能使部分内容过时。您有义务持续关注官方监管动态、行业资讯，自行补充最新风险知识。
                </Item>
                <Item>
                  <span className='text-info'>2. </span>若因您未及时了解最新信息而遭受损失，不应归咎于本信息提供方。我们鼓励您定期重温此类风险提示，保持敏锐的风险洞察力。
                </Item>
              </List>
              <div>综上所述，您在阅读、使用本 RCC 代币平台风险提示信息过程中，应充分理解并接受上述免责条款。如有任何疑问，建议寻求专业法律意见。</div>
            </div>
          </div>
        </>)
      }else if(key==="copyright-3"){
        return(<>
          <div>
            <br/>
            <div>本版权说明旨在向您清晰阐述关于 RCC 代币质押平台相关资料、信息的版权归属及使用规范，望您予以充分关注。</div>
            <div>
              <span><strong>一、版权归属</strong></span>
              <List>
                <Item>
                  <span className='text-info'>1. </span>RCC 代币质押平台（包括但不限于平台架构、界面设计、智能合约代码、相关技术文档、操作指南等）所涉及的一切知识产权，均归 [RCC代币质押] 独家所有。未经版权所有者书面授权，任何单位或个人不得以任何形式对其进行复制、修改、分发、传播、商业利用或用于其他未经许可的目的。
                </Item>
                <Item>
                  <span className='text-info'>2. </span>平台所呈现的有关以太坊质押、虚拟货币运作原理、区块链技术应用等信息，若系平台原创整理或开发，同样受版权保护。这些资料旨在为用户提供技术交流基础，帮助用户更好地理解代币质押背后的技术逻辑，其版权亦归属于 [RCC代币质押]。
                </Item>
              </List>
              <span><strong>二、技术交流使用规范</strong></span>
              <List>
                <Item>
                  <span className='text-info'>1. </span>允许范围：为促进技术交流与行业发展，用户在个人学习、研究以及非商业性的专业讨论场景下，可合理引用平台所公开的部分信息资料。例如，您可以在技术研讨会上分享基于对 RCC 代币质押平台技术原理的个人见解，并引用平台的公开技术参数作为论据，但必须明确标注资料来源为 RCC 代币质押平台。
                </Item>
                <Item>
                  <span className='text-info'>2. </span>禁止行为：严禁任何用户将平台资料用于商业推广、竞品研发、非法盈利等与技术交流背道而驰的行为。具体而言，不得私自摘取平台代码片段用于构建类似商业竞品平台，不得将平台技术文档篡改后作为自己的 “研究成果” 进行发布谋利，亦不得利用平台信息诱导他人参与未经授权的投资或金融活动。一旦发现此类侵权行为，版权所有者有权采取法律行动追究侵权者的法律责任，要求赔偿因侵权行为所遭受的一切损失。
                </Item>
              </List>
              <span><strong>三、信息更新与版权维护</strong></span>
              <List>
                <Item>
                  <span className='text-info'>1. </span>鉴于区块链技术及虚拟货币领域的快速迭代特性，RCC 代币质押平台将不定期对平台技术资料、信息内容进行更新优化。版权所有者保留对更新后内容的完整版权，用户对新老版本资料的使用均需遵循本版权说明规定。
                </Item>
                <Item>
                  <span className='text-info'>2. </span>若您对平台资料的使用存在任何疑问，或不确定某种行为是否构成侵权，建议您及时与版权所有者联系沟通，获取明确的授权指引，以避免无意侵权行为的发生。
                </Item>
              </List>
              <div>我们致力于打造一个开放且规范的技术交流环境，期望您在遵循版权规则的前提下，充分利用 RCC 代币质押平台所提供的技术资源，共同推动行业技术进步</div>
            </div>
          </div>
        </>)
      } else if(key==="copyright-4"){
        return(<>
          <div>
            <br/>
            <div>尊敬的开发者及使用者：</div>
            <div>本开源协议旨在规范 RCC 代币质押平台相关代码及技术资料的开放使用，以促进技术交流、创新，同时确保合法合规运用，望各方严格遵守。</div>
            <div>
            <span><strong>一、开源授权基础</strong></span>
              <List>
                <Item>
                  <span className='text-info'>1. </span>RCC 代币质押平台（涵盖核心智能合约代码、辅助模块代码、技术白皮书、开发文档等，以下统称“开源资料”）在符合本协议规定的前提下，授权给广大开发者与技术爱好者免费使用、学习及修改。此授权旨在激发技术社区活力，助力区块链技术在代币质押领域的深入探索。
                </Item>
                <Item>
                  <span className='text-info'>2. </span>版权所有者明确声明保留对开源资料的最终版权归属，开源行为不意味着放弃任何知识产权权益，仅是在特定范围内赋予使用者一定权限。
                </Item>
              </List>
              <span><strong>二、技术交流使用权限</strong></span>
              <List>
                <Item>
                  <span className='text-info'>1. </span>学习研究：使用者有权获取开源资料用于个人学习目的，深入钻研区块链技术在代币质押场景的应用细节，包括但不限于分析智能合约逻辑、研究算法优化策略，以提升个人技术素养。
                </Item>
                <Item>
                  <span className='text-info'>2. </span>社区分享：鼓励使用者在技术社区、论坛、学术研讨活动等非商业场景下，分享基于开源资料的技术见解、实践经验，以及对平台优化改进的创意构思。交流过程应保持开源、共享精神，促进知识流动。
                </Item>
                <Item>
                  <span className='text-info'>3. </span>协作开发：欢迎开发者依据开源资料开展协作开发项目，共同攻克技术难题，推动平台功能完善。但参与协作的各方需明确知晓彼此权利义务，新产生的代码若融入开源项目，应同样遵循本开源协议。
                </Item>
              </List>
              <span><strong>三、禁止行为与合规要求</strong></span>
              <List>
                <Item>
                  <span className='text-info'>1. </span>违法应用：严禁任何使用者利用 RCC 代币质押平台开源资料从事非法金融活动，如非法集资、洗钱、诈骗等，或违反所在地区法律法规的虚拟货币交易行为。此类行径严重违背开源宗旨，将面临法律严惩，且版权所有者将全力配合执法部门调查追究责任。
                </Item>
                <Item>
                  <span className='text-info'>2. </span>商业侵权：禁止将开源资料直接用于商业盈利目的而未获取版权所有者另行书面许可。这包括但不限于包装成商业产品售卖、作为竞品核心技术支撑，损害版权所有者正当商业利益。若需商业化运用，应提前与版权所有者协商合作模式。
                </Item>
                <Item>
                  <span className='text-info'>3. </span>恶意篡改：不得恶意修改开源资料，植入恶意代码（如病毒、后门程序）危害其他使用者安全，或故意歪曲技术原理误导社区。应秉持诚信原则维护开源生态健康。
                </Item>
              </List>
              <span><strong>四、责任与免责声明</strong></span>
              <List>
                <Item>
                  <span className='text-info'>1. </span>使用者责任：使用者在利用开源资料过程中，自行承担因代码使用、修改、分发等行为引发的技术风险、安全隐患，如因不当修改智能合约导致漏洞被黑客攻击造成损失，使用者需自行负责。
                </Item>
                <Item>
                  <span className='text-info'>2. </span>版权所有者免责：版权所有者对使用者因违反本协议或自身操作失误、技术决策失误等导致的任何直接、间接损失，不承担赔偿责任。但版权所有者保留对开源资料进行更新、维护、管理以及监督协议执行情况的权利，有权要求违规使用者纠正行为或收回开源授权。
                </Item>
              </List>
              <span><strong>五、协议变更与终止</strong></span>
              <List>
                <Item>
                  <span className='text-info'>1. </span>变更通知：版权所有者保留根据技术发展、法律环境变化等因素适时修订本开源协议的权利。修订内容将提前合理时间公示，使用者在新版本生效后继续使用开源资料视为接受新协议约束。
                </Item>
                <Item>
                  <span className='text-info'>2. </span>协议终止：若使用者严重违反本协议，版权所有者有权单方面终止其使用开源资料的权限，要求使用者销毁相关副本，并保留依法索赔的权利
                </Item>
              </List>
              <div>通过遵循本开源协议，愿我们携手共创一个活跃、健康、合法的技术交流空间，让 RCC 代币质押平台技术惠及更多有志于区块链创新的人士。<Link to={"https://github.com/mingdw/rcc-stake-fe-react"}><GithubFilled /> 下载源代码</Link></div>
              <div style={{marginRight:'100px'}}>RCC 代币质押</div>
              <div style={{marginRight:'0px',marginTop:'5px'}}>2025-01-07</div>
            </div>
          </div>
        </>)
      }else if(key==="service-1"){
        return(<>
          <div>
            <br/>
            <div>尊敬的用户：</div>
            <div>本服务与协议（以下简称 “本协议”）由您（以下简称 “用户”）与 RCC 代币质押平台（以下简称 “平台”）运营方 [运营方公司名称] 就 RCC 代币质押相关服务事宜订立，旨在明确双方的权利、义务及责任，确保服务的合规、有序开展。请您在使用平台服务前，仔细阅读并充分理解本协议全部内容。</div>
            <div>
             <List>
                <Item>
                  一、服务内容
                    <Item>
                    <span className='text-info'>1. </span>质押服务：平台为用户提供以太坊质押功能，用户可依据平台规则与流程，将其合法拥有的以太坊代币存入指定质押合约地址，以获取相应的 R 币收益。平台负责确保质押流程的技术稳定性，包括但不限于智能合约的正常执行、数据记录的准确性与安全性。
                  </Item>
                  <Item>
                    <span className='text-info'>2. </span>信息服务：平台向用户提供关于以太坊、R 币以及质押业务的相关信息，如市场行情动态、质押收益计算方式、技术原理介绍等，以辅助用户做出合理决策。此类信息仅供参考，不构成投资建议，用户应自行承担因依赖信息所产生的风险。
                  </Item>
                  <Item>
                    <span className='text-info'>3. </span>技术支持：平台配备专业技术团队，为用户在质押过程中遇到的技术问题提供一定期限内的免费咨询与协助解决服务，确保用户能够顺利完成质押操作、查询收益等常规流程。
                  </Item>
                </Item>
                
                <Item>
                   二、用户权利与义务
                   <Item>
                  <span className='text-info'>1. </span>用户权利
                  <ul>
                    <li>有权依据本协议及平台规则，使用平台提供的质押与信息服务，查询自己的质押资产状态、收益明细等信息。</li>
                    <li>在符合平台规定的前提下，有权选择质押期限、赎回质押资产，以及获取相应收益。</li>
                  </ul>
                  <span className='text-info'>2. </span>用户义务
                  <ul>
                    <li>确保所质押的以太坊来源合法合规，用户应自行承担因资产来源问题引发的一切法律责任。</li>
                    <li>严格遵守平台的注册、认证、质押、赎回等各项流程与规则，如实提供所需信息资料，如因用户提供虚假信息导致服务受阻或出现纠纷，用户承担全部责任。</li>
                    <li>自行承担因市场波动、技术风险等因素导致的质押资产价值变化及收益不确定性风险，不得因投资损失向平台主张不合理赔偿。</li>
                  </ul>
                </Item>
                </Item>
               
                <Item>
                  三、平台权利与义务
                  <Item>
                  <span className='text-info'>1. </span>平台权利
                  <ul>
                    <li>有权按照本协议及平台公示规则，对用户质押申请进行审核，拒绝不符合条件或存在违规风险的申请。</li>
                    <li>为维护平台运营安全与合规性，有权对用户账户进行监测，在发现异常交易、涉嫌违法违规行为时，采取暂停服务、冻结账户等必要措施，并及时向相关监管部门报告。</li>
                  </ul>
                  <span className='text-info'>2. </span>平台义务
                  <ul>
                    <li>保障平台的技术稳定性，采取合理的安全防护措施，防止黑客攻击、数据泄露等安全事件发生，保护用户质押资产与个人信息安全。</li>
                    <li>依据法律法规及监管要求，如实向用户披露平台运营信息、质押业务风险等关键内容，不得隐瞒或误导用户。</li>
                  </ul>
                  </Item>
                </Item>

                <Item>
                四、风险揭示与免责条款
                  <Item>
                  <span className='text-info'>1. </span>风险揭示
                  <ul>
                    <li>市场风险：以太坊及 R 币市场价格波动剧烈，质押期间，用户的资产价值可能因市场行情变化出现大幅增减，用户应充分认识到虚拟货币投资的高风险性。</li>
                    <li>技术风险：尽管平台尽力保障技术安全，但区块链技术本身存在智能合约漏洞、网络拥堵等潜在风险，可能导致质押资产延迟解锁、收益计算错误甚至资产损失，平台不承担因不可抗力或技术难题引发的不可预见、不可避免损失。</li>
                    <li>监管风险：虚拟货币相关业务处于动态监管环境，政策法规变化可能对平台运营及用户质押业务产生重大影响，如限制交易、要求清退等，双方应共同承担由此带来的合规调整成本</li>
                  </ul>
                  <span className='text-info'>2. </span>免责条款
                  <ul>
                    <li>平台对用户因个人疏忽、故意行为（如泄露私钥、参与非法交易等）导致的任何损失不承担责任。</li>
                    <li>若因第三方原因（如黑客攻击、合作机构违约等）造成用户损失，平台将在法律允许范围内协助用户维权，但不承担直接赔偿责任，除非平台自身存在过错。。</li>
                  </ul>
                  </Item>
                </Item>

                <Item>
                  五、协议变更、终止与争议解决
                  <Item>
                      <span className='text-info'>1. </span>协议变更：平台有权根据法律法规变化、业务发展需求等因素，适时修订本协议。修订内容将提前在平台显著位置公示，自公示之日起一定期限后生效，用户在变更生效后继续使用平台服务视为同意接受新协议约束
                  </Item>
                  <Item>
                      <span className='text-info'>2. </span>协议终止：
                      <ul>
                    <li>双方协商一致可终止本协议。</li>
                    <li>若用户严重违反本协议约定，平台有权立即终止服务，冻结用户账户，追究用户违约责任，并要求用户承担因违约造成的损失。</li>
                    <li>因不可抗力（如自然灾害、法律法规重大变更致使业务无法开展等）导致协议无法履行，双方可协商终止协议，互不承担违约责任。</li>
                  </ul>
                  </Item>
                  <Item>
                    <span className='text-info'>3. </span>争议解决：如双方在本协议履行过程中发生争议，应首先通过友好协商解决；协商不成的，任何一方均可向有管辖权的人民法院提起诉讼
                  </Item>
                </Item>
                <Item>
                  六、其他条款
                  <Item><span className='text-info'>1. </span>本协议自用户在平台完成注册并点击确认接受之日起生效，有效期至双方协商终止或依据本协议约定终止为止</Item>
                  <Item><span className='text-info'>2. </span>本协议未尽事宜，可由双方另行签订补充协议，补充协议与本协议具有同等法律效力。</Item>
                </Item>
              </List>
              <p>通过签订本协议，希望您与平台能够在合规、互信的基础上，共同推动 RCC 代币质押业务的健康发展。如有任何疑问，请随时联系平台客服。</p>
            </div>
          </div>
        </>)
      }else if(key==="questions-1"){
          return(<>
            <div>
              <br/>
                <div>RCC代币质押支持ERC20、ERC271、以太坊等币种的质押，平台收取部分手续费作为平台运营使用，用户通过质押代币可以获取平台R币作为回报，R币作为平台币可以换取平台奖励</div>
            </div>
          </>)
      }else if(key==="questions-2"){
        return(<>
          <div>
            <br/>
              <div>选中喜欢的质押池，质押获取收益，中途随时可以解除质押</div>
          </div>
        </>)
    }else if(key==="questions-3"){
      return(<>
        <div>
          <br/>
            <div>如果中途退出，返回用户本金（扣除少量手续费）</div>
        </div>
      </>)
  }else if(key==="questions-4"){
    return(<>
      <div>
        <br/>
          <div>用户每币质押资金去向透明可查，随时可以解除质押，不做任何限制</div>
      </div>
    </>)
}else if(key==="questions-5"){
  return(<>
    <div>
      <br/>
        <div>质押的代币平台不做任何投资，纯属技术交流</div>
    </div>
  </>)
} else if(key==="questions-6"){
  return(<>
    <div>
      <br/>
        <div>平台收取少量手续费作为日常维护</div>
    </div>
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
              defaultOpenKeys={[selectedKey]}
              onClick={handleMenuClick}
              selectedKeys={[selectedKey]}
            
              items={menuData.map(menuItem =>({
                key:menuItem.key,
                label:menuItem.title,
                children:menuItem.children.map(subMenuItem =>({
                  key:subMenuItem.key,
                  label:subMenuItem.title,
                  style: {
                     backgroundColor: selectedKey === menuItem.key && subSelectedKey === subMenuItem.key? '#E6F4FF' :'#fff' 
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