const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Middleware to ensure user is authenticated (assuming you have one, if not we'll need to create/import it)
// For now, I'll assume req.user is populated by passport or a custom middleware. 
// Since we used passport in server.js, we should use a middleware to check authentication.

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
