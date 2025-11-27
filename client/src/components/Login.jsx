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

export default function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/auth/login', formData);
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    const googleAuth = () => {
        window.location.href = 'https://penfoteco-backend.onrender.com';
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
                    SIGN IN
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                    {/* Form Fields */}
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
                        sx={{ mb: 3 }}
                    />

                    {/* Submit Button */}
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
                        Sign In
                    </Button>
                </Box>

                {/* Terms Text */}
                <Typography fontSize={13} color="text.secondary" sx={{ mb: 2 }}>
                    By continuing, you agree to our{" "}
                    <Link href="#" underline="hover">Conditions of Use</Link> and{" "}
                    <Link href="#" underline="hover">Privacy Notice</Link>.
                </Typography>

                <Typography
                    onClick={() => navigate("/signup")}
                    sx={{
                        cursor: "pointer",
                        color: "primary.main",
                        fontSize: 14,
                        mb: 2,
                        "&:hover": { textDecoration: "underline" }
                    }}
                >
                    New here? Create an account
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
                    Continue with Google
                </Button>
            </Paper>
        </Box>
    );
}
