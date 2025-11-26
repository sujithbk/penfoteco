import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Paper,
    Button,
    IconButton,
    Divider,
    Select,
    MenuItem,
    FormControl,
    CircularProgress,
    AppBar,
    Toolbar
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

export default function Cart() {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('/api/cart');
            setCart(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching cart:', error);
            setLoading(false);
        }
    };

    const updateQty = async (productId, qty) => {
        try {
            const { data } = await axios.put('/api/cart/update', { productId, qty });
            setCart(data);
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            const { data } = await axios.delete(`/api/cart/remove/${productId}`);
            setCart(data);
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    const calculateTotal = () => {
        if (!cart || !cart.items) return 0;
        return cart.items.reduce((acc, item) => acc + item.qty * item.product.price, 0);
    };

    const totalItems = cart?.items?.reduce((acc, item) => acc + item.qty, 0) || 0;

    const handleCheckout = async () => {
        try {
            // Create order payload (simplified address for now)
            const orderData = {
                products: cart.items.map(item => ({
                    productId: item.product._id,
                    quantity: item.qty
                })),
                amount: calculateTotal(),
                address: {
                    fullName: "User Name", // You might want to fetch this from user profile or add a checkout form
                    street: "123 Main St",
                    city: "City",
                    postalCode: "12345",
                    country: "Country"
                }
            };

            await axios.post('/api/orders', orderData);
            navigate('/order-confirmation');
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order');
        }
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;

    return (
        <Box sx={{ bgcolor: '#eaeded', minHeight: '100vh', pb: 4 }}>
            {/* Header */}
            <AppBar position="sticky" sx={{ bgcolor: '#131921' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => navigate('/')} sx={{ mr: 2 }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
                        AMAZON
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container maxWidth="xl" sx={{ mt: 4 }}>
                <Grid container spacing={3}>
                    {/* Cart Items */}
                    <Grid item xs={12} md={9}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h4" sx={{ mb: 2, fontWeight: 400 }}>
                                Shopping Cart
                            </Typography>
                            <Typography variant="body2" sx={{ textAlign: 'right', color: '#565959', mb: 1 }}>
                                Price
                            </Typography>
                            <Divider />

                            {cart?.items?.length === 0 ? (
                                <Box sx={{ py: 4, textAlign: 'center' }}>
                                    <Typography variant="h6">Your Amazon Cart is empty.</Typography>
                                    <Button onClick={() => navigate('/')} sx={{ mt: 2 }}>
                                        Shop today's deals
                                    </Button>
                                </Box>
                            ) : (
                                cart?.items?.map((item) => (
                                    <Box key={item._id}>
                                        <Grid container spacing={2} sx={{ py: 3 }}>
                                            <Grid item xs={12} sm={3} md={2}>
                                                <img
                                                    src={item.product.image}
                                                    alt={item.product.name}
                                                    style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'contain' }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={9} md={10}>
                                                <Grid container>
                                                    <Grid item xs={10}>
                                                        <Typography variant="h6" sx={{ fontWeight: 500, fontSize: '1.2rem' }}>
                                                            {item.product.name}
                                                        </Typography>
                                                        <Typography variant="body2" color="success.main" sx={{ my: 1 }}>
                                                            In Stock
                                                        </Typography>
                                                        <Typography variant="caption" display="block" sx={{ mb: 1 }}>
                                                            Eligible for FREE Shipping
                                                        </Typography>

                                                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                                            <FormControl size="small" sx={{ mr: 2, minWidth: 80 }}>
                                                                <Select
                                                                    value={item.qty}
                                                                    onChange={(e) => updateQty(item.product._id, e.target.value)}
                                                                    sx={{ height: 30, fontSize: '0.9rem' }}
                                                                >
                                                                    {[...Array(10).keys()].map((x) => (
                                                                        <MenuItem key={x + 1} value={x + 1}>
                                                                            Qty: {x + 1}
                                                                        </MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>

                                                            <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 20, alignSelf: 'center' }} />

                                                            <Button
                                                                size="small"
                                                                onClick={() => removeFromCart(item.product._id)}
                                                                sx={{ textTransform: 'none', color: '#007185' }}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={2} sx={{ textAlign: 'right' }}>
                                                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                                            ₹{item.product.price.toFixed(2)}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Divider />
                                    </Box>
                                ))
                            )}

                            {cart?.items?.length > 0 && (
                                <Box sx={{ textAlign: 'right', mt: 2 }}>
                                    <Typography variant="h6">
                                        Subtotal ({totalItems} items): <b>₹{calculateTotal().toFixed(2)}</b>
                                    </Typography>
                                </Box>
                            )}
                        </Paper>
                    </Grid>

                    {/* Subtotal Sidebar */}
                    {cart?.items?.length > 0 && (
                        <Grid item xs={12} md={3}>
                            <Paper sx={{ p: 3 }}>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    Subtotal ({totalItems} items): <b>₹{calculateTotal().toFixed(2)}</b>
                                </Typography>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={handleCheckout}
                                    sx={{
                                        bgcolor: '#f0c14b',
                                        color: '#111',
                                        '&:hover': { bgcolor: '#ddb347' },
                                        textTransform: 'none',
                                        borderRadius: 2
                                    }}
                                >
                                    Proceed to Buy
                                </Button>
                            </Paper>
                        </Grid>
                    )}
                </Grid>
            </Container>
        </Box>
    );
}
