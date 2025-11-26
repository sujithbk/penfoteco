import React, { useState, useEffect } from 'react';
import {
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Badge,
    InputBase,
    MenuItem,
    Select,
    Typography,
    CircularProgress,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import HomeCarousel from './Carousel/HomeCarousel';
import CategoryGrid from './CategoryGrid/CategoryGrid';
import ProductSection from './ProductSection/ProductSection';

export default function Homepage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchProducts();
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await axios.get('/auth/current_user');
            setUser(response.data);
        } catch (error) {
            console.log('Not logged in');
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get('/api/products');
            setProducts(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
        }
    };



    const handleSearch = () => {
        if (searchTerm.trim()) {
            setSelectedCategory(''); // Clear category when searching
            const element = document.getElementById('products-section');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setSearchTerm(''); // Clear search when selecting category
        const element = document.getElementById('products-section');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleSearchKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // Filter products by category
    const electronicsProducts = products.filter(p => p.category === 'Electronics');
    const sportsProducts = products.filter(p => p.category === 'Sports');
    const homeProducts = products.filter(p => p.category === 'Home');
    const accessoriesProducts = products.filter(p => p.category === 'Accessories');

    // Get filtered products for search or category
    const filteredProducts = products.filter(product => {
        if (selectedCategory) {
            return product.category === selectedCategory;
        }
        return product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase());
    });

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ flexGrow: 1, bgcolor: '#eaeded' }}>
            {/* Header */}
            <AppBar
                position="static"
                sx={{
                    background: "#131921",
                    padding: "5px 0",
                }}
            >
                <Toolbar
                    sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                    }}
                >
                    {/* Logo */}
                    <Box sx={{ cursor: "pointer" }} onClick={() => {
                        setSelectedCategory('');
                        setSearchTerm('');
                        navigate('/');
                    }}>
                        <Typography variant="h5" sx={{ color: '#fff', fontWeight: 'bold' }}>
                            AMAZON
                        </Typography>
                    </Box>

                    {/* Location */}
                    <Box sx={{ color: "#fff", display: "flex", flexDirection: "column" }}>
                        <Typography variant="caption" sx={{ opacity: 0.8 }}>
                            Deliver to
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            India
                        </Typography>
                    </Box>

                    {/* Search Box */}
                    <Box
                        sx={{
                            flex: 1,
                            display: "flex",
                            background: "#fff",
                            borderRadius: "4px",
                            overflow: "hidden",
                        }}
                    >
                        <InputBase
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={handleSearchKeyPress}
                            sx={{ padding: "6px 10px", flex: 1 }}
                        />
                        <IconButton
                            onClick={handleSearch}
                            sx={{
                                background: "#febd69",
                                borderRadius: 0,
                                width: "50px",
                                ":hover": { background: "#f3a847" },
                            }}
                        >
                            <SearchIcon />
                        </IconButton>
                    </Box>

                    {/* Language */}
                    <Select
                        defaultValue="EN"
                        sx={{
                            height: "40px",
                            color: "#fff",
                            border: "1px solid #555",
                            ".MuiSvgIcon-root": { color: "#fff" },
                        }}
                    >
                        <MenuItem value="EN">EN</MenuItem>
                        <MenuItem value="HI">HI</MenuItem>
                    </Select>

                    {/* Account */}
                    <Box
                        sx={{ color: "#fff", cursor: "pointer" }}
                        onClick={() => navigate(user ? '/profile' : '/login')}
                    >
                        <Typography variant="caption">
                            Hello, {user ? user.name.split(' ')[0] : 'sign in'}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                            Account & Lists
                        </Typography>
                    </Box>

                    {/* Returns */}
                    <Box sx={{ color: "#fff", cursor: "pointer" }} onClick={() => navigate('/orders')}>
                        <Typography variant="caption">Returns</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                            & Orders
                        </Typography>
                    </Box>

                    {/* Cart */}
                    <IconButton sx={{ color: "#fff" }}>
                        <Badge badgeContent={0} color="error">
                            <ShoppingCartIcon sx={{ fontSize: 30 }} />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* TOP BIG CAROUSEL */}
            <HomeCarousel />

            {/* 4 FLOATING CATEGORY BOXES */}
            <CategoryGrid onCategorySelect={handleCategorySelect} />

            {/* PRODUCT ROWS LIKE AMAZON */}
            <Box id="products-section" sx={{ mt: 3 }}>
                {searchTerm || selectedCategory ? (
                    <ProductSection sx={{ marginRight: 5 }}
                        title={selectedCategory ? `Shop ${selectedCategory}` : `Search Results for "${searchTerm}"`}
                        products={filteredProducts}
                    />
                ) : (
                    <>
                        {electronicsProducts.length > 0 && (
                            <ProductSection sx={{ marginRight: 5 }}
                                title="Best Deals on Electronics"
                                products={electronicsProducts}
                            />
                        )}
                        {sportsProducts.length > 0 && (
                            <ProductSection sx={{ marginRight: 5 }}
                                title="Top Sellers in Sports & Fitness"
                                products={sportsProducts}
                            />
                        )}
                        {homeProducts.length > 0 && (
                            <ProductSection
                                title="Home & Kitchen Essentials"
                                products={homeProducts}
                            />
                        )}
                        {accessoriesProducts.length > 0 && (
                            <ProductSection
                                title="Trending Accessories"
                                products={accessoriesProducts}
                            />
                        )}
                    </>
                )}
            </Box>
        </Box>
    );
}
