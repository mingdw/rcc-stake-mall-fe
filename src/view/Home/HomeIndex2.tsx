import React from 'react';
import { Button, Col, Row, Typography, Carousel, Timeline } from 'antd';
import { SafetyCertificateOutlined, DollarOutlined, LikeOutlined, SyncOutlined,ClockCircleOutlined } from '@ant-design/icons';

import img01 from '../../assets/images/login-bg-4.jpg';
import img02 from '../../assets/images/login-bg-2.jpg';
import img03 from '../../assets/images/login-bg-3.jpg';
import styles from './Home.module.scss';



const Home2: React.FC = () => {

    const interestRateData = [
        { month: 'Jan', rate: 2 },
        { month: 'Feb', rate: 2.5 },
        { month: 'Mar', rate: 3 },
        //...更多数据
    ];

    const  collateralDatas = [
        { key: '1',    collateral: '比特币 (BTC)', collateralRate: '5%', loan: '10000', loanRate: '5%', minStake: '1000', maxLoan: '10000', duration: '10天', status: '0' },
        { key: '2', collateral: '以太坊 (ETH)', collateralRate: '4%', loan: '10000', loanRate: '5%', minStake: '1000', maxLoan: '10000', duration: '10天', status: '0' },
        { key: '3', collateral: '稳定币 (USDT)', collateralRate: '3%', loan: '10000', loanRate: '5%', minStake: '1000', maxLoan: '10000', duration: '10天', status: '0' },
    ];
   

    const config = {
        data: interestRateData,
        xField: 'month',
        yField: 'rate',
        title: '利率历史走势',
    };

    const carouselData = [
        { image: img01, title: '质押简单快捷', description: '安全高收益，轻松获取稳定收益' },
        { image: img02, title: '低抵押率', description: '安全快捷的借贷操作' },
        { image: img03, title: '参与我们的社区', description: '共享未来的金融生态' },
    ];

    const timelineData = [
        { title: '安全性', description: '智能合约审计，确保资金安全。' },
        { title: '低手续费', description: '透明的费用结构，降低用户成本。' },
        { title: '高流动性', description: '快速的交易处理，确保流动性。' },
    ];



    interface CardContentProps {
        title: string;
        des?: string;      // 标题的类型
        bgColor?: string;
        children: React.ReactNode; // 子元素的类型
    }

    interface CardbBrrageProps {
        key: string;
        collateral: string;
        collateralRate: string;
        loan: string;
        loanRate: string;
        minStake: string;
        maxLoan: string;
        duration: string;
        status: string;
    }

    const CardContentComponent: React.FC<CardContentProps> = ({ title, des, bgColor, children }) => {
        return (
            <div className={styles.cardContent} style={{ backgroundColor: bgColor ? bgColor : '#fff' }}>
                <div className={styles.cardTitle}>{title}</div>
                <hr className={styles.cardHr} />
                {des && <p className={styles.cardDes}>{des}</p>} 
                {children}
            </div>
        );
    }

    const CardBarrageComponent: React.FC<CardbBrrageProps> = ({ key, collateral, collateralRate, loan, loanRate, minStake, maxLoan, duration, status }) => {
        return (
            <div className={styles.barrageCard}>
                <p>抵押币种: {collateral}</p>
                <p>抵押利率: {collateralRate}</p>
                <p>借贷币种: {loan}</p>
                <p>借贷利率: {loanRate}</p>
                <p>最小质押: {minStake}</p>
                <p>最大借贷: {maxLoan}</p>
                <p>期限: {duration}</p>
                <p>当前状态: {status}</p>
                <Button type="primary">质押</Button>
                <Button type="primary">借贷</Button>
            </div>
        );
    }


    return (
        <div style={{ padding: '20px' }}>
            {/* 图片轮播区域 */}
            <Carousel arrows autoplay autoplaySpeed={2000} style={{ marginBottom: '20px' }}>
                {carouselData.map((item, index) => (
                    <div key={index} style={{ position: 'relative' }}>
                        <div style={{ width: '100%', height: '300px', backgroundImage: `url(${item.image})`, backgroundPosition: 'center' }}>
                            <span className={styles.imgFontStlye}>
                                <strong>{item.title}</strong><br />
                                {item.description}
                            </span>
                        </div>
                    </div>
                ))}
            </Carousel>

            <CardContentComponent title="支持质押借贷的加密资产" des="支持主流的稳定币ETH、USDT、USDC、DAI等数十种加密资产" bgColor="#F5F5F5">
                <Row style={{ marginTop: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                    {collateralDatas.map((item, index) => (
                        <CardBarrageComponent  {...item} />
                    ))}
                </Row>
            </CardContentComponent>

            <CardContentComponent title="我们的成绩" des="2018至今，平台完成的数据" bgColor="#fff">
                <Row style={{ marginTop: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                    <Col span={5} className={styles.dashCard}>
                        <p className={styles.p1}>1500+</p>
                        <p className={styles.p2}>用户总数</p>
                    </Col>

                    <Col span={5} className={styles.dashCard}>
                        <p className={styles.p1}>124,44 $</p>
                        <p className={styles.p2}>质押资产总额</p>
                    </Col>
                    <Col span={5} className={styles.dashCard}>
                        <p className={styles.p1}>287,37 $</p>
                        <p className={styles.p2}>历史总收益</p>
                    </Col>
                    <Col span={5} className={styles.dashCard}>
                        <p className={styles.p1}>5%~10%</p>
                        <p className={styles.p2}>平台收益率</p>
                    </Col>
                </Row>
            </CardContentComponent >

            <CardContentComponent title="我们的优势" des="每一份质押都能获取收益，每一份借贷都用心服务。" bgColor="#F5F5F5">
                <Row style={{ width: '80%', margin: '0 auto', marginTop: '40px', marginBottom: '20px', display: 'flex', justifyContent: 'space-around' }}>
                    <Col span={5} className={styles.cardAdvantage}>
                        <div style={{ width: '95%', textAlign: 'center' }}>
                            <div className={styles.icon}><SafetyCertificateOutlined /></div>
                            <div className={styles.p1}>平台安全性</div>
                            <Typography className={styles.p2}>采用严格的智能合约审计，为您的资金安全保驾护航。</Typography>
                        </div>

                    </Col>

                    <Col span={5} className={styles.cardAdvantage}>
                        <div style={{ width: '95%', textAlign: 'center' }}>
                            <div className={styles.icon}><DollarOutlined /></div>
                            <div className={styles.p1}>操作便捷性</div>
                            <Typography className={styles.p2}>只需一个钱包，质押借贷操作简单，无需繁琐的手续，轻松实现资产增值。</Typography>
                        </div>
                    </Col>
                    <Col span={5} className={styles.cardAdvantage}>
                        <div style={{ width: '95%', textAlign: 'center' }}>
                            <div className={styles.icon}><SyncOutlined /></div>
                            <div className={styles.p1}>高效率</div>
                            <Typography className={styles.p2}> 24小时客服在线，随时解答您的疑问，确保您的质押借贷体验无忧。</Typography>
                        </div>
                    </Col>
                    <Col span={5} className={styles.cardAdvantage}>
                        <div style={{ width: '95%', textAlign: 'center' }}>
                            <div className={styles.icon}><LikeOutlined /></div>
                            <div className={styles.p1}>精益求精</div>
                            <Typography className={styles.p2}>死磕风险把控，对质押借贷流程细节一丝不苟，力争最高方便快捷安全的通过率。</Typography>
                        </div>
                    </Col>
                </Row>
            </CardContentComponent>

            <CardContentComponent title="我们的服务" des="竭尽所能，服务好每一位客户。" bgColor="#fff">
                <div>
                    竭尽所能，服务好每一位客户
                </div>
            </CardContentComponent>

            <CardContentComponent title="平台大事件" bgColor="#F5F5F5">
                <Row style={{ marginTop: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                    <Timeline mode="alternate" className={styles.customTimeline}>
                        {[
                            {
                                children: 'Create a services site 2015-09-01',
                            },
                            {
                                children: 'Solve initial network problems 2015-09-01',
                                color: 'green',
                            },
                            {
                                dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
                                children: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
                            },
                            {
                                color: 'red',
                                children: 'Network problems being solved 2015-09-01',
                            },
                            {
                                children: 'Create a services site 2015-09-01',
                            },
                            {
                                dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
                                children: 'Technical testing 2015-09-01',
                            },
                        ].map((item, index) => (
                            <Timeline.Item key={index} color={item.color}>
                                <div className={styles.timelineContent}>
                                    {item.dot}
                                    <span>{item.children}</span>
                                </div>
                            </Timeline.Item>
                        ))}
                    </Timeline>
                </Row>
            </CardContentComponent>


        </div>
    );
};

export default Home2;