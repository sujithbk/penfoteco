import React, { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Link,
    Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';
import axios from '../api/axios';

export default function Signup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/auth/signup', formData);
            navigate('/login');
        } catch (err) {
            console.error(err);
        }
    };

    const googleAuth = () => {
        window.location.href = 'http://localhost:8080/auth/google';
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                pt: 8,
            }}
        >
            <Paper
                elevation={1}
                sx={{
                    width: "100%",
                    maxWidth: 520,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 600,
                        mb: 3,
                        lineHeight: 1.2,
                    }}
                >
                    SIGNUP
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                    <Typography fontSize={14} sx={{ mb: 0.5 }}>
                        Your name
                    </Typography>
                    <TextField
                        name="name"
                        fullWidth
                        size="small"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />

                    <Typography fontSize={14} sx={{ mb: 0.5 }}>
                        Email
                    </Typography>
                    <TextField
                        name="email"
                        type="email"
                        fullWidth
                        size="small"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />

                    <Typography fontSize={14} sx={{ mb: 0.5 }}>
                        Password
                    </Typography>
                    <TextField
                        name="password"
                        type="password"
                        fullWidth
                        size="small"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        sx={{ mb: 0.5 }}
                    />

                    <Typography fontSize={12} color="text.secondary" sx={{ mb: 2 }}>
                        Passwords must be at least 6 characters.
                    </Typography>

                    <Typography fontSize={14} sx={{ mb: 0.5 }}>
                        Password again
                    </Typography>
                    <TextField
                        name="confirmPassword"
                        type="password"
                        fullWidth
                        size="small"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        sx={{ mb: 3 }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        sx={{
                            backgroundColor: "#f0c14b",
                            textTransform: "none",
                            color: "#111",
                            fontWeight: 500,
                            border: "1px solid #a88734",
                            "&:hover": { backgroundColor: "#ddb347" },
                            py: 1.1,
                            mb: 3,
                        }}
                    >
                        Create Account
                    </Button>
                </Box>

                <Typography fontSize={13} color="text.secondary" sx={{ mb: 2 }}>
                    By creating an account, you agree to our{" "}
                    <Link href="#" underline="hover">Conditions of Use</Link>,{" "}
                    <Link href="#" underline="hover">Privacy Notice</Link>.
                </Typography>

                <Typography
                    onClick={() => navigate("/login")}
                    sx={{
                        cursor: "pointer",
                        color: "primary.main",
                        fontSize: 14,
                        mb: 2,
                        "&:hover": { textDecoration: "underline" }
                    }}
                >
                    Already have an account? Sign in
                </Typography>

                <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<GoogleIcon />}
                    onClick={googleAuth}
                    sx={{
                        textTransform: 'none',
                        borderColor: '#ddd',
                        color: '#111',
                        py: 1.5,
                        "&:hover": {
                            borderColor: '#999',
                            bgcolor: '#f7f7f7'
                        }
                    }}
                >
                    Sign up with Google
                </Button>
            </Paper>
        </Box>
    );
}
