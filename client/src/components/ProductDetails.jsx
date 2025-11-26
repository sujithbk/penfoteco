import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Grid,
    Typography,
    Button,
    Rating,
    Divider,
    Paper,
    FormControl,
    Select,
    MenuItem,
    CircularProgress,
    IconButton,
    AppBar,
    Toolbar,
    Badge
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from '../api/axios';
import ProductSection from './ProductSection/ProductSection';

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [qty, setQty] = useState(1);
    const [loading, setLoading] = useState(true);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        fetchProductDetails();
        fetchCartCount();
    }, [id]);

    const fetchProductDetails = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/products/${id}`);
            setProduct(data);

            const allProductsRes = await axios.get('/api/products');
            const similar = allProductsRes.data
                .filter(p => p.category === data.category && p._id !== data._id)
                .slice(0, 4);
            setSimilarProducts(similar);

            setLoading(false);
        } catch (error) {
            console.error('Error fetching product details:', error);
            setLoading(false);
        }
    };

    const fetchCartCount = async () => {
        try {
            const { data } = await axios.get('/api/cart');
            const count = data.items ? data.items.reduce((acc, item) => acc + item.qty, 0) : 0;
            setCartCount(count);
        } catch (error) {
            console.error('Error fetching cart count:', error);
        }
    };

    const addToCart = async () => {
        try {
            await axios.post('/api/cart/add', { productId: product._id, qty });
            fetchCartCount();
            navigate('/cart');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate('/login');
            } else {
                console.error('Error adding to cart:', error);
            }
        }
    };

    const buyNow = async () => {
        await addToCart();
        navigate('/cart');
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;
    if (!product) return <Typography variant="h5" sx={{ mt: 10, textAlign: 'center' }}>Product not found</Typography>;

    return (
        <Box sx={{ bgcolor: '#fff', minHeight: '100vh' }}>
            {/* Header */}
            <AppBar position="sticky" sx={{ bgcolor: '#131921' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => navigate('/')} sx={{ mr: 2 }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
                        AMAZON
                    </Typography>
                    <IconButton color="inherit" onClick={() => navigate('/cart')}>
                        <Badge badgeContent={cartCount} color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>
                <Grid container spacing={4}>
                    {/* Product Image */}
                    <Grid item xs={12} md={5}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2, border: '1px solid #eee', borderRadius: 2 }}>
                            <img
                                src={product.image}
                                alt={product.name}
                                style={{ maxWidth: '100%', maxHeight: '500px', objectFit: 'contain' }}
                            />
                        </Box>
                    </Grid>

                    {/* Product Info */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h5" sx={{ fontWeight: 500, mb: 1 }}>
                            {product.name}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Rating value={product.rating} precision={0.5} readOnly />
                            <Typography variant="body2" color="primary" sx={{ ml: 1 }}>
                                {product.numReviews} ratings
                            </Typography>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="h4" sx={{ fontWeight: 500, mb: 2 }}>
                            <sup style={{ fontSize: '1rem' }}>₹</sup>
                            {product.price.toFixed(2)}
                        </Typography>

                        <Typography variant="body1" sx={{ mb: 3, color: '#565959' }}>
                            {product.description}
                        </Typography>

                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                                About this item:
                            </Typography>
                            <ul style={{ paddingLeft: '20px', margin: 0 }}>
                                <li>High quality {product.category} product</li>
                                <li>Premium build and finish</li>
                                <li>1 year warranty included</li>
                                <li>Fast delivery available</li>
                            </ul>
                        </Box>
                    </Grid>

                    {/* Buy Box */}
                    <Grid item xs={12} md={3}>
                        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                            <Typography variant="h5" sx={{ fontWeight: 500, mb: 2 }}>
                                ₹{product.price.toFixed(2)}
                            </Typography>

                            <Typography variant="body1" color={product.countInStock > 0 ? 'success.main' : 'error.main'} sx={{ mb: 2, fontWeight: 500 }}>
                                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                            </Typography>

                            {product.countInStock > 0 && (
                                <>
                                    <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                                        <Select
                                            value={qty}
                                            onChange={(e) => setQty(e.target.value)}
                                        >
                                            {[...Array(product.countInStock > 10 ? 10 : product.countInStock).keys()].map((x) => (
                                                <MenuItem key={x + 1} value={x + 1}>
                                                    Qty: {x + 1}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <Button
                                        fullWidth
                                        variant="contained"
                                        sx={{
                                            bgcolor: '#f0c14b',
                                            color: '#111',
                                            mb: 1,
                                            '&:hover': { bgcolor: '#ddb347' },
                                            textTransform: 'none',
                                            borderRadius: 5
                                        }}
                                        onClick={addToCart}
                                    >
                                        Add to Cart
                                    </Button>

                                    <Button
                                        fullWidth
                                        variant="contained"
                                        sx={{
                                            bgcolor: '#fa8900',
                                            color: '#111',
                                            '&:hover': { bgcolor: '#e37b00' },
                                            textTransform: 'none',
                                            borderRadius: 5
                                        }}
                                        onClick={buyNow}
                                    >
                                        Buy Now
                                    </Button>
                                </>
                            )}

                            <Typography variant="caption" display="block" sx={{ mt: 2, color: '#565959' }}>
                                Sold by Amazon Electronics
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Similar Products */}
                {similarProducts.length > 0 && (
                    <Box sx={{ mt: 8 }}>
                        <Divider sx={{ mb: 4 }} />
                        <ProductSection
                            title={`Similar items in ${product.category}`}
                            products={similarProducts}
                        />
                    </Box>
                )}
            </Container>
        </Box>
    );
}
