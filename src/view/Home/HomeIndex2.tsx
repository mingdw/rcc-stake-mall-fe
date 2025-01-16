import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { Button, Col, Row, Typography, Carousel, Timeline, Space, Divider } from 'antd';
import { GithubOutlined, TaobaoCircleOutlined, SafetyCertificateOutlined, DollarOutlined, LikeOutlined, SyncOutlined, ClockCircleOutlined } from '@ant-design/icons';
import img01 from '../../assets/images/login-bg-4.jpg';
import img02 from '../../assets/images/login-bg-2.jpg';
import img03 from '../../assets/images/login-bg-3.jpg';
import styles from './Home.module.scss';
import { Link } from 'react-router-dom';

const Home2: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [scrollState, setScrollState] = useState({
        scrollPosition: 0,
        totalWidth: 0,
        isHovered: false,
    });
    const rafRef = useRef<number | null>(null);

    const scroll = useCallback(() => {
        if (scrollRef.current) {
            setScrollState(prev => {
                const newPosition = prev.scrollPosition - 2;
                return {
                    ...prev,
                    scrollPosition: newPosition <= -prev.totalWidth ? 0 : newPosition,
                };
            });
        }
        rafRef.current = requestAnimationFrame(scroll);
    }, [scrollState.totalWidth]);

    useEffect(() => {
        if (scrollRef.current) {
            const total = scrollRef.current.scrollWidth;
            setScrollState(prev => ({ ...prev, totalWidth: total }));
        }

        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (!scrollState.isHovered) {
            rafRef.current = requestAnimationFrame(scroll);
        } else {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        }
        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [scrollState.isHovered, scroll]);

    const collateralDatas = [
        { key: '1', icon1: <GithubOutlined className={styles.icon1} />, icon2: <TaobaoCircleOutlined className={styles.icon2} />, collateral: 'BTC', collateralRate: '5%', loan: '91', loanRate: '5%', minStake: '1000', maxLoan: '10000', duration: '10天', status: '0' },
        { key: '2', icon1: <GithubOutlined className={styles.icon1} />, icon2: <TaobaoCircleOutlined className={styles.icon2} />, collateral: 'ETH', collateralRate: '4%', loan: '123', loanRate: '5%', minStake: '1000', maxLoan: '10000', duration: '10天', status: '0' },
        { key: '3', icon1: <GithubOutlined className={styles.icon1} />, icon2: <TaobaoCircleOutlined className={styles.icon2} />, collateral: 'USDT', collateralRate: '3%', loan: '876', loanRate: '5%', minStake: '1000', maxLoan: '10000', duration: '10天', status: '0' },
        { key: '4', icon1: <GithubOutlined className={styles.icon1} />, icon2: <TaobaoCircleOutlined className={styles.icon2} />, collateral: 'ETC', collateralRate: '5%', loan: '133', loanRate: '5%', minStake: '1000', maxLoan: '10000', duration: '10天', status: '0' },
        { key: '5', icon1: <GithubOutlined className={styles.icon1} />, icon2: <TaobaoCircleOutlined className={styles.icon2} />, collateral: 'DAI', collateralRate: '4%', loan: '1354', loanRate: '5%', minStake: '1000', maxLoan: '10000', duration: '10天', status: '0' },
        { key: '6', icon1: <GithubOutlined className={styles.icon1} />, icon2: <TaobaoCircleOutlined className={styles.icon2} />, collateral: 'AVVA', collateralRate: '3%', loan: '244', loanRate: '5%', minStake: '1000', maxLoan: '10000', duration: '10天', status: '0' },
    ];

    const timelineDatas = [
        {
            time: '2020-01-01',
            title: '平台上线',
            description: '平台正式上线，开启质押借贷服务，吸引了众多用户参与。',
        },
        {
            time: '2020-03-15',
            title: '用户突破 1000 人',
            description: '平台用户数量突破 1000 人，为用户提供了优质的服务体验。',
        },
        {
            time: '2020-06-01',
            title: '新功能上线',
            description: '推出了新的质押功能，为用户提供更多样化的选择。',
        },
        {
            time: '2020-09-20',
            title: '安全升级',
            description: '进行了智能合约的安全升级，保障用户资金安全。',
        },
        {
            time: '2021-01-10',
            title: '合作拓展',
            description: '与多家金融机构达成合作，扩大平台影响力。',
        },
        {
            time: '2021-04-05',
            title: '用户反馈改进',
            description: '根据用户反馈优化了平台界面和操作流程。',
        },
        {
            time: '2021-07-15',
            title: '系统升级',
            description: '对系统进行了大规模升级，提高了平台性能。',
        },
    ];

    const extendedCollateralDatas = useMemo(() => collateralDatas.concat(collateralDatas), [collateralDatas]);

    const carouselData = [
        { image: img01, title: '质押简单快捷', description: '安全高收益，轻松获取稳定收益' },
        { image: img02, title: '低抵押率', description: '安全快捷的借贷操作' },
        { image: img03, title: '参与我们的社区', description: '共享未来的金融生态' },
    ];

    interface CardContentProps {
        title: string;
        des?: string;
        bgColor?: string;
        children: React.ReactNode;
    }

    interface CardbBrrageProps {
        key: string;
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

    // 使用 useCallback 优化事件处理函数
    const CardBarrageComponent: React.FC<CardbBrrageProps> = ({ key, icon1, icon2, collateral, collateralRate, loan, loanRate, minStake, maxLoan, duration, status }) => {
        return (
            <Link to={`/pledgePool/${key}`}>
                <div
                    className={styles.barrageCardFlow}
                    onMouseEnter={() => setScrollState(prev => ({ ...prev, isHovered: true }))}
                    onMouseLeave={() => setScrollState(prev => ({ ...prev, isHovered: false }))}
                    key={key}
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

            </Link>

        );
    };



    return (
        <div style={{ padding: '20px' }}>
            {/* 图片轮播区域 */}
            <Carousel arrows autoplay={!scrollState.isHovered} autoplaySpeed={2000} style={{ marginBottom: '20px' }}>
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
            
            <CardContentComponent title="支持质押借贷的加密资产" des="支持主流的稳定币ETH、USDT、USDC、DAI等数十种加密资产" bgColor="#F5F5F5">
                <div
                    ref={scrollRef}
                    style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
                    onMouseEnter={() => setScrollState(prev => ({ ...prev, isHovered: true }))}
                    onMouseLeave={() => setScrollState(prev => ({ ...prev, isHovered: false }))}
                >
                    <div style={{
                        marginTop: '20px',
                        marginBottom: '20px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        transform: `translateX(${scrollState.scrollPosition}px)`,
                        transition: 'transform 0.1s linear'
                    }}>
                        {extendedCollateralDatas.map((item, index) => (
                            <div key={index} style={{ display: 'inline-block', marginRight: '20px' }}>
                                <CardBarrageComponent {...item} />
                            </div>
                        ))}
                    </div>
                </div>
            </CardContentComponent>

            

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

            <CardContentComponent title="我们的服务" des="借贷、质押相关的服务我们都支持，高效快捷安全服务好每一个客户" bgColor="#f5f5f5">
               <Row style={{ width: '70%', margin: '0 auto', marginTop: '40px', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                    <Col span={5} className={styles.cardService}>
                       <p className={styles.title}>质押服务</p>
                       <p>安全快捷</p>
                       <Divider/>
                       <p>24小时客服</p>
                       <p>安全无忧</p>
                       <p><Button className={styles.button}>查看详情</Button></p>
                    </Col>
                    <Col span={5} className={styles.cardService}>
                       <p className={styles.title}>借贷服务</p>
                       <p>安全快捷</p>
                       <Divider/>
                       <p>24小时客服</p>
                       <p>安全无忧</p>
                       <p><Button className={styles.button}>查看详情</Button></p>
                    </Col>
                    <Col span={5} className={styles.cardService}>
                       <p className={styles.title}>质押服务</p>
                       <p>安全快捷</p>
                       <Divider/>
                       <p>24小时客服</p>
                       <p>安全无忧</p>
                       <p><Button className={styles.button}>查看详情</Button></p>
                    </Col>
                    <Col span={5} className={styles.cardService}>
                       <p className={styles.title}>质押服务</p>
                       <p>安全快捷</p>
                       <Divider/>
                       <p>24小时客服</p>
                       <p>安全无忧</p>
                       <p><Button className={styles.button}>查看详情</Button></p>
                    </Col>
                </Row> 
            </CardContentComponent>

        </div>
    );
};

export default Home2;