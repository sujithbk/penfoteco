const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get user's cart
exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
        if (!cart) {
            return res.json({ items: [] });
        }
        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Add item to cart
exports.addToCart = async (req, res) => {
    const { productId, qty } = req.body;

    try {
        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            cart = new Cart({ user: req.user._id, items: [] });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {
            // Product exists in cart, update quantity
            cart.items[itemIndex].qty += qty;
        } else {
            // Product does not exist in cart, add new item
            cart.items.push({ product: productId, qty });
        }

        await cart.save();
        const updatedCart = await Cart.findOne({ user: req.user._id }).populate('items.product');
        res.json(updatedCart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update item quantity
exports.updateCartItem = async (req, res) => {
    const { productId, qty } = req.body;

    try {
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].qty = qty;
            await cart.save();
            const updatedCart = await Cart.findOne({ user: req.user._id }).populate('items.product');
            res.json(updatedCart);
        } else {
            res.status(404).json({ message: 'Item not found in cart' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
    const { productId } = req.params;

    try {
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => item.product.toString() !== productId);
        await cart.save();

        const updatedCart = await Cart.findOne({ user: req.user._id }).populate('items.product');
        res.json(updatedCart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
