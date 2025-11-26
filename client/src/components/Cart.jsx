import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    IconButton,
    Card,
    CardContent,
    CircularProgress,
    AppBar,
    Toolbar
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
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
        if (qty < 1) return;
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
            const orderData = {
                products: cart.items.map(item => ({
                    productId: item.product._id,
                    quantity: item.qty
                })),
                amount: calculateTotal(),
                address: {
                    fullName: "User Name",
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
        }
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;

    return (
        <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', pb: 4 }}>
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
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 3 }}>
                    {/* Cart Items */}
                    <Box>
                        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <ShoppingCartIcon /> Shopping Cart
                        </Typography>

                        {cart?.items?.length === 0 ? (
                            <Card sx={{ borderRadius: 4, boxShadow: 2 }}>
                                <CardContent sx={{ py: 8, textAlign: 'center' }}>
                                    <Typography variant="h6" sx={{ mb: 2 }}>Your Amazon Cart is empty.</Typography>
                                    <Button
                                        variant="contained"
                                        onClick={() => navigate('/')}
                                        sx={{
                                            bgcolor: '#f0c14b',
                                            color: '#111',
                                            '&:hover': { bgcolor: '#ddb347' },
                                            textTransform: 'none',
                                            borderRadius: 3,
                                            px: 4
                                        }}
                                    >
                                        Shop today's deals
                                    </Button>
                                </CardContent>
                            </Card>
                        ) : (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {cart?.items?.map((item) => (
                                    <Card key={item._id} sx={{ borderRadius: 4, boxShadow: 2, bgcolor: '#fff' }}>
                                        <CardContent sx={{ p: 3 }}>
                                            <Box sx={{ display: 'flex', gap: 3 }}>
                                                <img
                                                    src={item.product.image}
                                                    alt={item.product.name}
                                                    style={{
                                                        width: '128px',
                                                        height: '128px',
                                                        objectFit: 'cover',
                                                        borderRadius: '12px'
                                                    }}
                                                />
                                                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                                    <Box>
                                                        <Typography variant="h6" sx={{ fontWeight: 500, fontSize: '1.1rem', mb: 1 }}>
                                                            {item.product.name}
                                                        </Typography>
                                                        <Typography variant="body1" sx={{ color: '#007600', fontWeight: 600 }}>
                                                            ₹{item.product.price.toLocaleString()}
                                                        </Typography>
                                                    </Box>

                                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                                                        <Box sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            bgcolor: '#e0e0e0',
                                                            borderRadius: 3,
                                                            px: 2,
                                                            py: 0.5,
                                                            gap: 2
                                                        }}>
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => updateQty(item.product._id, item.qty - 1)}
                                                                sx={{ p: 0.5 }}
                                                            >
                                                                <RemoveIcon fontSize="small" />
                                                            </IconButton>
                                                            <Typography sx={{ fontWeight: 500, minWidth: '20px', textAlign: 'center' }}>
                                                                {item.qty}
                                                            </Typography>
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => updateQty(item.product._id, item.qty + 1)}
                                                                sx={{ p: 0.5 }}
                                                            >
                                                                <AddIcon fontSize="small" />
                                                            </IconButton>
                                                        </Box>

                                                        <Button
                                                            size="small"
                                                            onClick={() => removeFromCart(item.product._id)}
                                                            startIcon={<DeleteIcon />}
                                                            sx={{
                                                                color: '#d32f2f',
                                                                textTransform: 'none',
                                                                '&:hover': { bgcolor: '#ffebee' }
                                                            }}
                                                        >
                                                            Remove
                                                        </Button>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Box>
                        )}
                    </Box>

                    {/* Order Summary */}
                    {cart?.items?.length > 0 && (
                        <Card sx={{
                            borderRadius: 4,
                            boxShadow: 3,
                            bgcolor: '#fff',
                            height: 'fit-content',
                            position: 'sticky',
                            top: 80
                        }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                                    Order Summary
                                </Typography>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant="body2">
                                        Subtotal ({totalItems} items)
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        ₹{calculateTotal().toLocaleString()}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant="body2">Delivery</Typography>
                                    <Typography variant="body2" sx={{ color: '#007600', fontWeight: 500 }}>
                                        FREE
                                    </Typography>
                                </Box>

                                <Box sx={{ borderTop: '1px solid #e0e0e0', my: 2 }} />

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        Total
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        ₹{calculateTotal().toLocaleString()}
                                    </Typography>
                                </Box>

                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={handleCheckout}
                                    sx={{
                                        bgcolor: '#f0c14b',
                                        color: '#111',
                                        '&:hover': { bgcolor: '#ddb347' },
                                        textTransform: 'none',
                                        borderRadius: 3,
                                        py: 1.5,
                                        fontSize: '1rem',
                                        fontWeight: 500
                                    }}
                                >
                                    Proceed to Buy
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </Box>
            </Container>
        </Box>
    );
}
