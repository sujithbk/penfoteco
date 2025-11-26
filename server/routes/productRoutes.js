const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();


router.get('/', productController.getAllProducts);


router.get('/:id', productController.getProductById);


router.get('/category/:category', productController.getProductsByCategory);

module.exports = router;
