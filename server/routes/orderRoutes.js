const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Middleware to ensure user is authenticated
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'Unauthorized' });
};

router.post('/', ensureAuthenticated, orderController.createOrder);
router.get('/myorders', ensureAuthenticated, orderController.getUserOrders);

module.exports = router;
