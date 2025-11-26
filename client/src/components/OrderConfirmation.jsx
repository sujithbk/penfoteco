import React from 'react';
import { Box, Container, Typography, Button, Paper } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from 'react-router-dom';

export default function OrderConfirmation() {
    const navigate = useNavigate();

    return (
        <Box sx={{ bgcolor: '#eaeded', minHeight: '100vh', py: 8 }}>
            <Container maxWidth="sm">
                <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
                    <CheckCircleOutlineIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
                    <Typography variant="h4" gutterBottom sx={{ color: '#007600', fontWeight: 500 }}>
                        Order Placed, Thanks!
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 4 }}>
                        Confirmation will be sent to your email.
                    </Typography>

                    <Button
                        variant="contained"
                        onClick={() => navigate('/orders')}
                        sx={{
                            bgcolor: '#f0c14b',
                            color: '#111',
                            '&:hover': { bgcolor: '#ddb347' },
                            textTransform: 'none',
                            borderRadius: 2,
                            mr: 2
                        }}
                    >
                        Review or edit your recent orders
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={() => navigate('/')}
                        sx={{
                            textTransform: 'none',
                            borderRadius: 2
                        }}
                    >
                        Continue Shopping
                    </Button>
                </Paper>
            </Container>
        </Box>
    );
}
