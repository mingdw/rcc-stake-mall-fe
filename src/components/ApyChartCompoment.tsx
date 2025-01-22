
import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Button, Col, Row, Space } from 'antd';
import styles from './ApyChartComponent.module.scss'; // 确保有样式文件
import ButtonGroup from 'antd/es/button/button-group';

interface ChartData {
    month: string;
    rate: number;
}

interface ApyChartComponentProps {
    data: ChartData[];
    selectedPeriod: '1m' | '6m' | '1y';
    onPeriodChange: (period: '1m' | '6m' | '1y') => void;
    title: string; // 图表名称
}

const ApyChartComponent: React.FC<ApyChartComponentProps> = ({ data, selectedPeriod, onPeriodChange, title }) => {
    const getOption = () => {
        return {
            tooltip: {
                trigger: 'axis',
            },
            xAxis: {
                type: 'category',
                data: data.map(item => item.month),
            },
            yAxis: {
                type: 'value',
                name: '利率 (%)',
            },
            series: [
                {
                    name: '利率',
                    type: 'line',
                    data: data.map(item => item.rate),
                    smooth: true,
                },
            ],
        };
    };

    return (
        <div className={styles.chartContainer}>
            <Row className={styles.chartRow}>
                <Col span={12} className={styles.title}>{title}</Col>
                <Col span={12} className={styles.buttonGroup}>
                    <ButtonGroup>
                        <Button
                            size='small'
                            className={selectedPeriod === '1m' ? styles.activeButton : styles.inactiveButton}
                            onClick={() => onPeriodChange('1m')}
                        >
                            1m
                        </Button>
                        <Button
                         size='small'
                            className={selectedPeriod === '6m' ? styles.activeButton : styles.inactiveButton}
                            onClick={() => onPeriodChange('6m')}
                        >
                            6m
                        </Button>
                        <Button
                         size='small'
                            className={selectedPeriod === '1y' ? styles.activeButton : styles.inactiveButton}
                            onClick={() => onPeriodChange('1y')}
                        >
                            1y
                        </Button>
                    </ButtonGroup>
                </Col>
            </Row>
            <ReactECharts option={getOption()} style={{ height: '200px', width: '115%',marginLeft:'-45px' }}/>
        </div>
    );
};

export default ApyChartComponent;

