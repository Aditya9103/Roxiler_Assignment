import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { Card, Statistic, Spin, message } from 'antd';

export default function Stats({ month, monthText }) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`http://localhost:3000/combined-data?month=${month}`);
            setData(res.data);
            setLoading(false);
            message.success('Data loaded successfully');
        } catch (error) {
            console.error(error);
            message.error('Error loading data');
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
        return () => setData(null);
    }, [month]);

    return (
        <div
            style={{
                padding: '24px',
                maxWidth: '1400px',
                margin: '0 auto',
            }}
        >
            <h2 style={{ textAlign: 'center', fontSize: '26px', marginBottom: '32px' }}>
                Statistics for {monthText}
            </h2>
            {loading ? (
                <div style={{ textAlign: 'center', padding: '48px 0' }}>
                    <Spin size="large" />
                </div>
            ) : (
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                        gap: '24px',
                        alignItems: 'start',
                    }}
                >
                    <Card style={{ padding: '16px', height: '100%' }}>
                        <Totals stats={data?.statsData} />
                    </Card>
                    <Card
                        style={{
                            padding: '16px',
                            gridColumn: 'span 2',
                            height: '100%',
                        }}
                    >
                        {data && <BarChart data={data?.barChartData} />}
                    </Card>
                    <Card
                        style={{
                            padding: '16px',
                            gridColumn: 'span 2',
                            height: '100%',
                        }}
                    >
                        {data && <PieChart data={data?.pieChartData} />}
                    </Card>
                </div>
            )}
        </div>
    );
}

function Totals({ stats }) {
    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                justifyContent: 'space-evenly',
                textAlign: 'center',
            }}
        >
            <Statistic
                title="Total Sale"
                value={stats?.totalSale}
                prefix="₹"
                valueStyle={{ fontSize: '22px' }}
            />
            <Statistic
                title="Total Sold Items"
                value={stats?.soldCount}
                valueStyle={{ fontSize: '22px' }}
            />
            <Statistic
                title="Total Unsold Items"
                value={stats?.unsoldCount}
                valueStyle={{ fontSize: '22px' }}
            />
        </div>
    );
}

function BarChart({ data }) {
    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Products per Price Range' },
        },
        scales: {
            x: {
                stacked: true,
                title: { display: true, text: 'Price Range' },
            },
            y: {
                stacked: true,
                title: { display: true, text: 'Product Count' },
                ticks: { stepSize: 4 },
            },
        },
    };

    const labels = Object.keys(data);
    const values = Object.values(data);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Products',
                data: values,
                backgroundColor: 'rgba(24, 144, 255, 0.7)',
            },
        ],
    };

    return (
        <div style={{ maxWidth: '95%', height: '400px', margin: '0 auto' }}>
            <Bar data={chartData} options={options} />
        </div>
    );
}

function PieChart({ data }) {
    const labels = Object.keys(data);
    const values = Object.values(data);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Products',
                data: values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                ],
            },
        ],
    };

    return (
        <div style={{ maxWidth: '95%', height: '350px', margin: '0 auto' }}>
            <Doughnut data={chartData} />
        </div>
    );
}
