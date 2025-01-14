import React from 'react';
import { Layout, Row, Col, Card, Statistic, Typography, Button, List, Carousel, Input } from 'antd';
import { Line } from '@ant-design/charts';
const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const HomeIndex2: React.FC = () => {
    // 示例数据
    const data = [
        { month: 'Jan', value: 30 },
        { month: 'Feb', value: 40 },
        { month: 'Mar', value: 35 },
        { month: 'Apr', value: 50 },
        { month: 'May', value: 70 },
        { month: 'Jun', value: 60 },
    ];

    const config = {
        data,
        xField: 'month',
        yField: 'value',
        point: {
            size: 5,
            shape: 'diamond',
        },
        label: {
            style: {
                fill: '#aaa',
            },
        },
    };

    return (
        <Layout>
            <Content style={{ padding: '20px' }}>
                {/* 重要数据统计区域 */}
                <Row gutter={16} style={{ marginBottom: '20px' }}>
                    <Col span={8}>
                        <Card>
                            <Statistic title="总质押量" value={1000000} prefix="$" />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic title="总借贷量" value={500000} prefix="$" />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic title="活跃用户数" value={2000} />
                        </Card>
                    </Col>
                </Row>

                {/* 利率展示区域 */}
                <Card title="借款利率" style={{ marginBottom: '20px' }}>
                    <List
                        size="small"
                        bordered
                        dataSource={[
                            'ETH: 5%',
                            'BTC: 6%',
                            'USDT: 4%',
                            'DAI: 4%',
                        ]}
                        renderItem={item => (
                            <List.Item>{item}</List.Item>
                        )}
                    />
                    <Paragraph>
                        利率受市场供需、抵押品价值等因素影响，具体利率请参考平台最新公告。
                    </Paragraph>
                </Card>

                {/* 统计图表展示 */}
                <Card title="质押量趋势" style={{ marginBottom: '20px' }}>
                    <Line {...config} />
                </Card>

                {/* 宣传横幅（Hero Banner） */}
                <Carousel autoplay style={{ marginBottom: '20px' }}>
                    <div>
                        <h3 style={{ color: '#fff', background: '#007bff', padding: '50px', textAlign: 'center' }}>
                            高抵押率
                        </h3>
                    </div>
                    <div>
                        <h3 style={{ color: '#fff', background: '#28a745', padding: '50px', textAlign: 'center' }}>
                            低利率
                        </h3>
                    </div>
                    <div>
                        <h3 style={{ color: '#fff', background: '#dc3545', padding: '50px', textAlign: 'center' }}>
                            安全可靠的智能合约保障
                        </h3>
                    </div>
                </Carousel>
                <Button type="primary" size="large" style={{ marginBottom: '20px' }}>
                    开始质押 / 借贷
                </Button>

                {/* 资产展示区域 */}
                <Card title="支持的加密资产" style={{ marginBottom: '20px' }}>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Card title="以太坊 (ETH)">
                                <p>当前价格: $2,000</p>
                                <p>质押率: 75%</p>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card title="比特币 (BTC)">
                                <p>当前价格: $40,000</p>
                                <p>质押率: 70%</p>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card title="USDT">
                                <p>当前价格: $1.00</p>
                                <p>质押率: 80%</p>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card title="DAI">
                                <p>当前价格: $1.00</p>
                                <p>质押率: 80%</p>
                            </Card>
                        </Col>
                    </Row>
                </Card>

                {/* 成功案例或用户评价 */}
                <Card title="用户成功案例" style={{ marginBottom: '20px' }}>
                    <List
                        size="small"
                        bordered
                        dataSource={[
                            '用户 A: 通过质押 ETH 成功借贷 DAI。',
                            '用户 B: 在平台上获得了 5% 的收益。',
                            '用户 C: 质押 BTC 后顺利借贷 USDT。',
                        ]}
                        renderItem={item => (
                            <List.Item>{item}</List.Item>
                        )}
                    />
                </Card>

                {/* 新闻和公告区域 */}
                <Card title="最新消息" style={{ marginBottom: '20px' }}>
                    <List
                        size="small"
                        bordered
                        dataSource={[
                            '新功能上线：自动化借贷流程。',
                            '利率调整通知：ETH 利率上调至 5%。',
                            '安全更新：已修复已知漏洞。',
                        ]}
                        renderItem={item => (
                            <List.Item>{item}</List.Item>
                        )}
                    />
                </Card>

                {/* 搜索功能 */}
                <Input.Search
                    placeholder="搜索加密资产或功能"
                    enterButton="搜索"
                    style={{ marginBottom: '20px' }}
                />
            </Content>

            {/* 底部（Footer） */}
            <Footer style={{ textAlign: 'center' }}>
                <Paragraph>联系信息: support@web3platform.com</Paragraph>
                <Paragraph>© 2023 Web3 质押借贷平台. 版权所有.</Paragraph>
                <Paragraph>
                    <a href="/terms">服务条款</a> | <a href="/privacy">隐私政策</a>
                </Paragraph>
            </Footer>
        </Layout>
    );
};

export default HomeIndex2;