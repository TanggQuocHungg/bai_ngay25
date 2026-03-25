const express = require('express');
const router = express.Router();
const invController = require('../controllers/inventoryController');
const Product = require('../models/Product');
const Inventory = require('../models/Inventory');

// Yêu cầu: Mỗi khi tạo product thì sẽ tạo 1 inventory tương ứng
router.post('/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        await Inventory.create({ product: product._id }); // Tạo inventory mặc định = 0
        res.status(201).json(product);
    } catch (err) { res.status(400).json({ error: err.message }); }
});

router.get('/inventory', invController.getAllInventory);
router.get('/inventory/:id', invController.getInventoryById);
router.post('/inventory/add-stock', invController.addStock);
router.post('/inventory/remove-stock', invController.removeStock);
router.post('/inventory/reservation', invController.reservation);
router.post('/inventory/sold', invController.sold);

module.exports = router;