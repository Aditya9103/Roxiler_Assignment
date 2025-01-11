const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;

const mongoConnect = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 5000 });
        console.log('Connected to MongoDB');
    } catch (error) {
        cˀonsole.error('Error while connecting to MongoDB:', error.message);
    }

    // Event listeners for connection events
    mongoose.connection.on('error', (err) => {
        console.error('Connection error:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
        console.warn('Disconnected from MongoDB');
    });
};

module.exports = mongoConnect;
