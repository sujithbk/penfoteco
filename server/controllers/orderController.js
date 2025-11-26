const Order = require('../models/Order');
const Cart = require('../models/Cart');


exports.createOrder = async (req, res) => {
    try {
        const { products, amount, address } = req.body;

        const newOrder = new Order({
            userId: req.user._id,
            products,
            amount,
            address
        });

        const savedOrder = await newOrder.save();

      
        await Cart.findOneAndDelete({ user: req.user._id });

        res.status(201).json(savedOrder);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};


exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id })
            .populate('products.productId')
            .sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};
