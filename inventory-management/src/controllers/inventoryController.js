const Inventory = require('../models/Inventory');

// 1. Get all & Get by ID (có join với product)
exports.getAllInventory = async (req, res) => {
    try {
        const inventories = await Inventory.find().populate('product');
        res.status(200).json(inventories);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getInventoryById = async (req, res) => {
    try {
        const inv = await Inventory.findById(req.params.id).populate('product');
        res.status(200).json(inv);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// 2. Add_stock: Tăng stock
exports.addStock = async (req, res) => {
    const { product, quantity } = req.body;
    const inv = await Inventory.findOneAndUpdate(
        { product },
        { $inc: { stock: quantity } },
        { new: true }
    );
    res.status(200).json(inv);
};

// 3. Remove_stock: Giảm stock trực tiếp
exports.removeStock = async (req, res) => {
    const { product, quantity } = req.body;
    const inv = await Inventory.findOneAndUpdate(
        { product, stock: { $gte: quantity } },
        { $inc: { stock: -quantity } },
        { new: true }
    );
    if (!inv) return res.status(400).json({ message: "Không đủ hàng để giảm" });
    res.status(200).json(inv);
};

// 4. Reservation: Giảm stock và tăng reserved
exports.reservation = async (req, res) => {
    const { product, quantity } = req.body;
    const inv = await Inventory.findOneAndUpdate(
        { product, stock: { $gte: quantity } },
        { $inc: { stock: -quantity, reserved: quantity } },
        { new: true }
    );
    if (!inv) return res.status(400).json({ message: "Stock không đủ để giữ hàng" });
    res.status(200).json(inv);
};

// 5. Sold: Giảm reserved và tăng soldCount
exports.sold = async (req, res) => {
    const { product, quantity } = req.body;
    const inv = await Inventory.findOneAndUpdate(
        { product, reserved: { $gte: quantity } },
        { $inc: { reserved: -quantity, soldCount: quantity } },
        { new: true }
    );
    if (!inv) return res.status(400).json({ message: "Số lượng giữ chỗ (reserved) không đủ" });
    res.status(200).json(inv);
};