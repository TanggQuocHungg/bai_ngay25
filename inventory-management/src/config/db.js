const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Nếu bạn dùng MongoDB Atlas, hãy thay chuỗi này bằng link của bạn trong file .env
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/inventory_db');
        
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1); // Dừng app nếu không kết nối được DB
    }
};

module.exports = connectDB;