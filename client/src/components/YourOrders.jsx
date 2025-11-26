import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Paper,
    Grid,
    Divider,
    CircularProgress,
    AppBar,
    Toolbar,
    IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

export default function YourOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const { data } = await axios.get('/api/orders/myorders');
            setOrders(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setLoading(false);
        }
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;

    return (
        <Box sx={{ bgcolor: '#fff', minHeight: '100vh' }}>
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

            <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
                <Typography variant="h4" sx={{ mb: 3, fontWeight: 400 }}>
                    Your Orders
                </Typography>

                {orders.length === 0 ? (
                    <Typography variant="body1">You have no orders yet.</Typography>
                ) : (
                    orders.map((order) => (
                        <Paper key={order._id} variant="outlined" sx={{ mb: 3, borderRadius: 2, overflow: 'hidden' }}>
                            <Box sx={{ bgcolor: '#f0f2f2', p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box sx={{ display: 'flex', gap: 4 }}>
                                    <Box>
                                        <Typography variant="caption" display="block" sx={{ textTransform: 'uppercase', color: '#565959' }}>
                                            Order Placed
                                        </Typography>
                                        <Typography variant="body2">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" display="block" sx={{ textTransform: 'uppercase', color: '#565959' }}>
                                            Total
                                        </Typography>
                                        <Typography variant="body2">
                                            ₹{order.amount.toFixed(2)}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" display="block" sx={{ textTransform: 'uppercase', color: '#565959' }}>
                                            Ship To
                                        </Typography>
                                        <Typography variant="body2" color="primary">
                                            {order.address.fullName}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box>
                                    <Typography variant="caption" display="block" sx={{ textTransform: 'uppercase', color: '#565959' }}>
                                        Order # {order._id}
                                    </Typography>
                                </Box>
                            </Box>

                            <Divider />

                            <Box sx={{ p: 3 }}>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                                    {order.status === 'pending' ? 'Arriving soon' : order.status}
                                </Typography>

                                {order.products.map((item, index) => (
                                    <Box key={index} sx={{ display: 'flex', mb: 2 }}>
                                        <img
                                            src={item.productId.image}
                                            alt={item.productId.name}
                                            style={{ width: 90, height: 90, objectFit: 'contain', marginRight: 20 }}
                                        />
                                        <Box>
                                            <Typography variant="body1" color="primary" sx={{ fontWeight: 500 }}>
                                                {item.productId.name}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#565959' }}>
                                                Qty: {item.quantity}
                                            </Typography>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                sx={{
                                                    mt: 1,
                                                    bgcolor: '#f0c14b',
                                                    color: '#111',
                                                    '&:hover': { bgcolor: '#ddb347' },
                                                    textTransform: 'none'
                                                }}
                                                onClick={() => navigate(`/product/${item.productId._id}`)}
                                            >
                                                Buy it again
                                            </Button>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Paper>
                    ))
                )}
            </Container>
        </Box>
    );
}
