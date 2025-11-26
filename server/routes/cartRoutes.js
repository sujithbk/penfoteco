const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');



const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'Unauthorized' });
};

router.get('/', ensureAuthenticated, cartController.getCart);
router.post('/add', ensureAuthenticated, cartController.addToCart);
router.put('/update', ensureAuthenticated, cartController.updateCartItem);
router.delete('/remove/:productId', ensureAuthenticated, cartController.removeFromCart);

module.exports = router;
