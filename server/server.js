require('dotenv').config();
const express = require('express');
const cors = require('cors');

const apiRoutes = require('./routes/api');
const mongoConnect = require('./configs/dbConn');

const app = express();

// MongoDB connection
mongoConnect();

// Middleware
app.use(express.json());
app.use(cors());
console.log('MongoDB URI:', process.env.MONGO_URI);

// API Routes
app.use('/', apiRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    const url = `http://localhost:${PORT}`;
    console.log(`Server is running on port ${PORT} - Visit it here: %c${url}`, 'color: blue; text-decoration: underline; cursor: pointer;', url);
});

