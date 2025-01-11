const router = require('express').Router();
const axios = require('axios');
const Transaction = require('../models/transactionModel');
const dataURL = process.env.DATA_URL || '';

// Initialize database with data from external API
router.get('/init-db', async (req, res) => {
    try {
        const { data } = await axios.get(dataURL);
        const docs = await Transaction.insertMany(data);
        res.status(200).json({ success: true, message: 'Database initialized', data: docs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// List transactions with search and pagination
router.get('/transactions', async (req, res) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 10;
        const skip = page * limit;
        const search = req.query.search || '';
        const month = parseInt(req.query.month) || 3;

        const searchConfig = {
            $and: [
                month == 0 ? {} : { $expr: { $eq: [{ $month: "$dateOfSale" }, month] } },
                {
                    $or: [
                        { title: { $regex: search, $options: 'i' } },
                        { description: { $regex: search, $options: 'i' } },
                        { price: { $regex: search, $options: 'i' } }
                    ]
                }
            ]
        };

        const data = await Transaction.find(searchConfig).skip(skip).limit(limit);
        const totalCount = await Transaction.countDocuments(searchConfig);

        res.status(200).json({ success: true, totalCount, page: page + 1, limit, month, transactions: data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Get statistics
router.get('/statistics', async (req, res) => {
    try {
        const month = parseInt(req.query.month) || 3;
        const monthQuery = month == 0 ? {} : { $expr: { $eq: [{ $month: "$dateOfSale" }, month] } };

        const data = await Transaction.find(monthQuery, { price: 1, sold: 1, dateOfSale: 1 });
        const response = data.reduce((acc, curr) => {
            const price = parseFloat(curr.price);
            acc.totalSale += curr.sold ? price : 0;
            acc.soldCount += curr.sold ? 1 : 0;
            acc.unsoldCount += curr.sold ? 0 : 1;
            return acc;
        }, { totalSale: 0, soldCount: 0, unsoldCount: 0 });

        response.totalSale = response.totalSale.toFixed(2);
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Bar chart data
router.get('/bar-chart', async (req, res) => {
    try {
        const month = parseInt(req.query.month) || 3;
        const monthQuery = month == 0 ? {} : { $expr: { $eq: [{ $month: "$dateOfSale" }, month] } };

        const data = await Transaction.find(monthQuery, { price: 1 });
        const ranges = Array(10).fill(0);

        data.forEach(item => {
            const price = parseFloat(item.price);
            const index = price > 900 ? 9 : Math.floor(price / 100);
            ranges[index]++;
        });

        const labels = ['0-100', '101-200', '201-300', '301-400', '401-500', '501-600', '601-700', '701-800', '801-900', '901-above'];
        const response = labels.reduce((acc, label, index) => ({ ...acc, [label]: ranges[index] }), {});

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Pie chart data
router.get('/pie-chart', async (req, res) => {
    try {
        const month = parseInt(req.query.month) || 3;
        const monthQuery = month == 0 ? {} : { $expr: { $eq: [{ $month: "$dateOfSale" }, month] } };

        const data = await Transaction.find(monthQuery, { category: 1 });
        const response = data.reduce((acc, curr) => {
            acc[curr.category] = (acc[curr.category] || 0) + 1;
            return acc;
        }, {});

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Combined data
router.get('/combined-data', async (req, res) => {
    try {
        const [statistics, barChart, pieChart] = await Promise.all([
            axios.get(`${req.protocol}://${req.get('host')}/statistics?month=${req.query.month}`),
            axios.get(`${req.protocol}://${req.get('host')}/bar-chart?month=${req.query.month}`),
            axios.get(`${req.protocol}://${req.get('host')}/pie-chart?month=${req.query.month}`)
        ]);

        res.status(200).json({
            statsData: statistics.data,
            barChartData: barChart.data,
            pieChartData: pieChart.data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
