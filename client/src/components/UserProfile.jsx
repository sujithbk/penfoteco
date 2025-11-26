import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Paper,
    Button,
    Avatar,
    Grid,
    Divider,
    CircularProgress,
    AppBar,
    Toolbar,
    IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

export default function UserProfile() {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const userRes = await axios.get('/auth/current_user');
            setUser(userRes.data);

            const ordersRes = await axios.get('/api/orders/myorders');
            setOrders(ordersRes.data);

            setLoading(false);
        } catch (error) {
            console.error('Error fetching profile:', error);
            setLoading(false);
            // If not authenticated, redirect to login
            if (error.response && error.response.status === 401) {
                navigate('/login');
            }
        }
    };

    const handleLogout = async () => {
        try {
            await axios.get('/auth/logout');
            window.location.href = '/'; // Full reload to clear state
        } catch (error) {
            console.error('Logout failed:', error);
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

            <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
                <Typography variant="h4" sx={{ mb: 3, fontWeight: 400 }}>
                    Your Profile
                </Typography>

                <Grid container spacing={3}>
                    {/* User Info Card */}
                    <Grid item xs={12} md={4}>
                        <Paper variant="outlined" sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
                            <Avatar sx={{ width: 100, height: 100, margin: '0 auto', mb: 2, bgcolor: '#f0c14b', color: '#111', fontSize: 40 }}>
                                {user?.name?.charAt(0).toUpperCase()}
                            </Avatar>
                            <Typography variant="h5" sx={{ fontWeight: 500 }}>
                                {user?.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                {user?.email}
                            </Typography>

                            <Button
                                variant="outlined"
                                color="error"
                                fullWidth
                                onClick={handleLogout}
                                sx={{ textTransform: 'none' }}
                            >
                                Log Out
                            </Button>
                        </Paper>
                    </Grid>

                    {/* Stats & Links */}
                    <Grid item xs={12} md={8}>
                        <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, mb: 3 }}>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Account Activities
                            </Typography>
                            <Divider sx={{ mb: 2 }} />

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="body1">
                                    Total Orders Placed
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    {orders.length}
                                </Typography>
                            </Box>

                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => navigate('/orders')}
                                sx={{
                                    bgcolor: '#f0c14b',
                                    color: '#111',
                                    '&:hover': { bgcolor: '#ddb347' },
                                    textTransform: 'none'
                                }}
                            >
                                View Your Orders
                            </Button>
                        </Paper>

                        <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Personal Information
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Typography variant="body2" color="text.secondary">
                                <strong>Email:</strong> {user?.email}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                <strong>Member Since:</strong> {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
