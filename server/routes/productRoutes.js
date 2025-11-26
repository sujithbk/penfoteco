const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

// Get all products
router.get('/', productController.getAllProducts);

// Get product by ID
router.get('/:id', productController.getProductById);

// Get products by category
router.get('/category/:category', productController.getProductsByCategory);

module.exports = router;
