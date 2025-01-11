import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Table, Input, message, Image, Tooltip } from 'antd';
import axios from 'axios';

const { Search } = Input;

const columns = [
    {
        title: "#",
        dataIndex: "id",
        width: 50,
        align: "center",
        render: (id) => <span>{id}</span>,
    },
    {
        title: "Title",
        dataIndex: "title",
        render: (title) => (
            <Tooltip title={title}>
                <span>{title.length > 30 ? title.slice(0, 30) + '...' : title}</span>
            </Tooltip>
        ),
    },
    {
        title: "Price",
        dataIndex: "price",
        render: (price) => {
            const numericPrice = parseFloat(price);
            return (
                <span style={{ color: '#1890ff' }}>
                    {isNaN(numericPrice) ? "N/A" : `$${numericPrice.toFixed(2)}`}
                </span>
            );
        },
    },
    {
        title: "Description",
        dataIndex: "description",
        render: (description) => (
            <Tooltip title={description}>
                <span>{description.length > 50 ? description.slice(0, 50) + '...' : description}</span>
            </Tooltip>
        ),
    },
    {
        title: "Category",
        dataIndex: "category",
    },
    {
        title: "Sold",
        dataIndex: "sold",
        render: (sold) => (
            <span style={{ color: sold ? 'green' : 'red' }}>
                {sold ? "Yes" : "No"}
            </span>
        ),
        align: "center",
    },
    {
        title: "Date",
        dataIndex: "dateOfSale",
        render: (date) => (
            <span>{moment(date).format("DD MMM YYYY")}</span>
        ),
        align: "center",
    },
    {
        title: "Image",
        dataIndex: "image",
        render: (url) => <Image src={url} alt="Product Image" preview={false} width={50} />,
        align: "center",
    },
];

function Transactions({ month, monthText }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const getData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/transactions', {
                params: {
                    month,
                    page: tableParams.pagination.current,
                    limit: tableParams.pagination.pageSize,
                    search: tableParams.search || '',
                },
            });

            const { transactions, totalCount } = response.data;
            setData(transactions);
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: totalCount,
                },
            });
            message.success('Data loaded successfully');
        } catch (error) {
            console.error(error);
            message.error('Error loading data');
        } finally {
            setLoading(false);
        }
    };

    const handleTableChange = (pagination) => {
        setTableParams({
            ...tableParams,
            pagination,
        });
    };

    const handleSearch = (value) => {
        setTableParams({
            ...tableParams,
            search: value,
        });
    };

    useEffect(() => {
        getData();
    }, [JSON.stringify(tableParams), month]);

    return (
        <>
            <Search
                placeholder="Search"
                allowClear
                onSearch={handleSearch}
                style={{
                    width: '100%',
                    maxWidth: 400,
                    marginBottom: 16,
                }}
            />
            <Table
                columns={columns}
                rowKey={(record) => record.id}
                dataSource={data}
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange}
                size="small"
                bordered
                title={() => <strong>Transactions for {monthText}</strong>}
                scroll={{
                    x: 'max-content', // Ensures horizontal scrolling when columns overflow
                    y: 540,            // Enables vertical scrolling
                }}
                responsive
            />
        </>
    );
}

export default Transactions;
