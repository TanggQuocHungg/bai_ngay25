const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const inventoryRoutes = require('./routes/inventoryRoutes');

const app = express();
app.use(express.json()); // Để đọc được body JSON từ Postman

// Kết nối MongoDB (Thay URL bằng của bạn hoặc dùng localhost)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/inventory_db';
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Đã kết nối MongoDB'))
    .catch(err => console.error('❌ Lỗi kết nối:', err));

// Sử dụng Routes
app.use('/api', inventoryRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
});