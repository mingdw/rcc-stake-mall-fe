import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { Button, Col, Row, Typography, Carousel, Timeline, Space, Divider, Layout } from 'antd';
import { GithubOutlined, TaobaoCircleOutlined, SafetyCertificateOutlined, DollarOutlined, LikeOutlined, SyncOutlined, ClockCircleOutlined } from '@ant-design/icons';
import img01 from '../../assets/images/login-bg-4.jpg';
import img02 from '../../assets/images/login-bg-2.jpg';
import img03 from '../../assets/images/login-bg-3.jpg';
import styles from './Home.module.scss';
import classnames from 'classnames';
import { Link } from 'react-router';

const Home: React.FC = () => {
    const collateralDatas = useMemo(() => [
        { key: '1', icon1: <GithubOutlined className={styles.icon1} />, icon2: <TaobaoCircleOutlined className={styles.icon2} />, collateral: 'BTC', collateralRate: '5%', loan: '91', loanRate: '5%', minStake: '1000', maxLoan: '10000', duration: '10天', status: '0' },
        { key: '2', icon1: <GithubOutlined className={styles.icon1} />, icon2: <TaobaoCircleOutlined className={styles.icon2} />, collateral: 'ETH', collateralRate: '4%', loan: '123', loanRate: '5%', minStake: '1000', maxLoan: '10000', duration: '10天', status: '0' },
        { key: '3', icon1: <GithubOutlined className={styles.icon1} />, icon2: <TaobaoCircleOutlined className={styles.icon2} />, collateral: 'USDT', collateralRate: '3%', loan: '876', loanRate: '5%', minStake: '1000', maxLoan: '10000', duration: '10天', status: '0' },
        { key: '4', icon1: <GithubOutlined className={styles.icon1} />, icon2: <TaobaoCircleOutlined className={styles.icon2} />, collateral: 'ETC', collateralRate: '5%', loan: '133', loanRate: '5%', minStake: '1000', maxLoan: '10000', duration: '10天', status: '0' },
        { key: '5', icon1: <GithubOutlined className={styles.icon1} />, icon2: <TaobaoCircleOutlined className={styles.icon2} />, collateral: 'DAI', collateralRate: '4%', loan: '1354', loanRate: '5%', minStake: '1000', maxLoan: '10000', duration: '10天', status: '0' },
        { key: '6', icon1: <GithubOutlined className={styles.icon1} />, icon2: <TaobaoCircleOutlined className={styles.icon2} />, collateral: 'AVVA', collateralRate: '3%', loan: '244', loanRate: '5%', minStake: '1000', maxLoan: '10000', duration: '10天', status: '0' },
    ], []);

    const carouselData = [
        { image: img01, title: '质押简单快捷', description: '安全高收益，轻松获取稳定收益' },
        { image: img02, title: '代币商城', description: '种类丰富，完全白嫖' },
        { image: img03, title: '参与我们的社区', description: '共享未来的金融生态' },
    ];

    interface CardContentProps {
        id: string;
        title: string;
        des?: string;
        bgColor?: string;
        children: React.ReactNode;
    }

    interface CardbBrrageProps {
        icon1?: React.ReactNode;
        icon2?: React.ReactNode;
        collateral?: string;
        collateralRate?: string;
        loan?: string;
        loanRate?: string;
        minStake?: string;
        maxLoan?: string;
        duration?: string;
        status?: string;
    }

    const CardContentComponent: React.FC<CardContentProps> = ({ id,title, des, bgColor, children }) => {
        return (
            <div key={id} className={styles.cardContent} style={{ backgroundColor: bgColor? bgColor : '#fff' }}>
                <div className={styles.cardTitle}>{title}</div>
                <hr className={styles.cardHr} />
                {des && <p className={styles.cardDes}>{des}</p>}
                {children}
            </div>
        );
    }

    const CardBarrageComponent: React.FC<CardbBrrageProps> = ({ icon1, icon2, collateral, collateralRate, loan, loanRate, minStake, maxLoan, duration, status }) => {
        return (
            <div
                className={styles.barrageCardFlow}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <p className={styles.p1}>{icon1} {icon2}<span style={{ marginLeft: '10px', fontSize: '18px', color: 'black' }}><strong>{collateral}</strong></span> &nbsp; &nbsp;<span style={{ color: 'gray' }}>|  Base</span></p>
                <p>抵押率：{collateralRate}</p>
                <p>借贷利率：{loanRate}</p>
                <p>质押期限：{duration}</p>
                <p>质押金额：{loan}</p>
                <Space style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button type="primary">质押</Button>
                    <Button type="primary">借贷</Button>
                </Space>
            </div>
        );
    };

    const handleMouseEnter = () => {
        const marquee = document.getElementById('marquee');
        if (marquee) {
            marquee.style.animationPlayState = 'paused'; // 暂停动画
        }
    };

    const handleMouseLeave = () => {
        const marquee = document.getElementById('marquee');
        if (marquee) {
            marquee.style.animationPlayState = 'running'; // 恢复动画
        }
    };

    const [userCount, setUserCount] = useState(0);
    const [stakeAmount, setStakeAmount] = useState(0);
    const [totalEarnings, setTotalEarnings] = useState(0);
    const [platformRate, setPlatformRate] = useState(0);
    const [productCount, setProductCount] = useState(0);

    // 模拟数据
    const targetUserCount = 1500;
    const targetStakeAmount = 12444;
    const targetTotalEarnings = 28737;
    const targetPlatformRate = 5; // 5%~10% 可以根据需要调整
    const targetProductCount = 1000;

    // 计数器效果
    useEffect(() => {
        const duration = 1000; // 动画持续时间为1秒
        const startTime = Date.now();

        const updateCounts = () => {
            const elapsedTime = Date.now() - startTime;
            const progress = Math.min(elapsedTime / duration, 1); // 计算进度

            // 更新状态
            setUserCount(Math.floor(progress * targetUserCount));
            setStakeAmount(Math.floor(progress * targetStakeAmount));
            setTotalEarnings(Math.floor(progress * targetTotalEarnings));
            setProductCount(Math.floor(progress * targetProductCount));
            if (progress < 1) {
                requestAnimationFrame(updateCounts); // 继续更新
            }
        };

        requestAnimationFrame(updateCounts); // 开始动画

        return () => {
            // 清理
        };
    }, []);

    return (
        <Layout className={styles.layout}>

        <div>
            <Row className={styles.announcementBar}>
              <Space>
               <span> 📢 新功能上线！现在用户可以通过手机应用进行质押操作。点击</span> <Link to="/#" > 了解更多。</Link>
              </Space>
            </Row>
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
            <CardContentComponent id="chenji" title="我们的成绩" des="2018至今，平台完成的数据" bgColor="#fff">
                <Row style={{ marginTop: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                    <Col span={4} className={styles.dashCard}>
                        <p className={styles.p1}>{userCount}+</p>
                        <p className={styles.p2}>用户总数</p>
                    </Col>
                    <Col span={4} className={styles.dashCard}>
                        <p className={styles.p1}>{productCount}+</p>
                        <p className={styles.p2}>商品数量</p>
                    </Col>
                    <Col span={4} className={styles.dashCard}>
                        <p className={styles.p1}>${totalEarnings}</p>
                        <p className={styles.p2}>历史总收益</p>
                    </Col>
                    <Col span={4} className={styles.dashCard}>
                        <p className={styles.p1}>{platformRate}%~10%</p>
                        <p className={styles.p2}>平台收益率</p>
                    </Col>
                    
                </Row>
            </CardContentComponent >

            <CardContentComponent id="zichan" title="支持质押借贷的加密资产" des="支持主流的稳定币ETH、USDT、USDC、DAI等数十种加密资产" bgColor="#F5F5F5">
                <div className={styles.marqueeContainer} id="marqueeContainer">
                    <div className={styles.marquee} id="marquee">
                        {collateralDatas.map((item, index) => (
                            <div key={index} style={{ display: 'inline-block', marginRight: '20px' }}>
                                <CardBarrageComponent
                                    icon1={item.icon1}
                                    icon2={item.icon2}
                                    collateral={item.collateral}
                                    collateralRate={item.collateralRate}
                                    loan={item.loan}
                                    loanRate={item.loanRate}    
                                    minStake={item.minStake}
                                    maxLoan={item.maxLoan}
                                    duration={item.duration}
                                    status={item.status}
                                />
                            </div>
                        ))}
                        {collateralDatas.map((item, index) => (
                            <div key={`clone-${index}`} style={{ display: 'inline-block', marginRight: '20px' }}>
                                <CardBarrageComponent
                                    icon1={item.icon1}
                                    icon2={item.icon2}
                                    collateral={item.collateral}
                                    collateralRate={item.collateralRate}
                                    loan={item.loan}
                                    loanRate={item.loanRate}    
                                    minStake={item.minStake}
                                    maxLoan={item.maxLoan}
                                    duration={item.duration}
                                    status={item.status}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </CardContentComponent>

            <CardContentComponent id="youshi" title="我们的优势" des="每一份质押都能获取收益，每一份借贷都用心服务。" bgColor="#F5F5F5">
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

            <CardContentComponent id="fuwu" title="我们的服务" des="借贷、质押相关的服务我们都支持，高效快捷安全服务好每一个客户" bgColor="#f5f5f5">
                <Row style={{ width: '70%', margin: '0 auto', marginTop: '40px', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                    <Col span={5} className={styles.cardService}>
                        <p className={styles.title}>质押服务</p>
                        <p>安全快捷</p>
                        <Divider />
                        <p>24小时客服</p>
                        <p>安全无忧</p>
                        <p><Button className={styles.button}>查看详情</Button></p>
                    </Col>
                    <Col span={5} className={styles.cardService}>
                        <p className={styles.title}>借贷服务</p>
                        <p>安全快捷</p>
                        <Divider />
                        <p>24小时客服</p>
                        <p>安全无忧</p>
                        <p><Button className={styles.button}>查看详情</Button></p>
                    </Col>
                    <Col span={5} className={styles.cardService}>
                        <p className={styles.title}>自动清算</p>
                        <p>安全快捷</p>
                        <Divider />
                        <p>24小时客服</p>
                        <p>安全无忧</p>
                        <p><Button className={styles.button}>查看详情</Button></p>
                    </Col>
                    <Col span={5} className={styles.cardService}>
                        <p className={styles.title}>订单追踪</p>
                        <p>安全快捷</p>
                        <Divider />
                        <p>24小时客服</p>
                        <p>安全无忧</p>
                        <p><Button className={styles.button}>查看详情</Button></p>
                    </Col>
                </Row>
            </CardContentComponent>

        </div>
        </Layout>
    );
};

export default Home;