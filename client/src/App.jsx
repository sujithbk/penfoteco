import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import Signup from './components/Signup';
import Login from './components/Login';
import Homepage from './components/Homepage';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import OrderConfirmation from './components/OrderConfirmation';
import YourOrders from './components/YourOrders';
import UserProfile from './components/UserProfile';

const theme = createTheme({
    palette: {
        mode: 'light', // or 'dark'
        primary: {
            main: '#1976d2',
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/order-confirmation" element={<OrderConfirmation />} />
                    <Route path="/orders" element={<YourOrders />} />
                    <Route path="/profile" element={<UserProfile />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
