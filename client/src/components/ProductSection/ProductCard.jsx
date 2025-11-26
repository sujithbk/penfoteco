import React from "react";
import { Card, CardMedia, CardContent, Typography, Box, Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
    const navigate = useNavigate();

    return (
        <Card
            onClick={() => navigate(`/product/${product._id}`)}
            sx={{
                height: "100%",
                cursor: "pointer",
                transition: "0.2s",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 3,
                },
            }}
        >
            <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                sx={{
                    height: { xs: 150, md: 180 },
                    objectFit: "cover",
                }}
            />

            <CardContent>
                <Typography
                    sx={{
                        fontWeight: 500,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        minHeight: "48px",
                    }}
                >
                    {product.name}
                </Typography>

                {product.rating && (
                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                        <Rating value={product.rating} precision={0.5} size="small" readOnly />
                        <Typography variant="caption" sx={{ ml: 1 }}>
                            ({product.numReviews})
                        </Typography>
                    </Box>
                )}

                <Typography
                    variant="h6"
                    color="primary"
                    sx={{ fontWeight: "bold", mt: 1 }}
                >
                    ₹{product.price.toFixed(2)}
                </Typography>
            </CardContent>
        </Card>
    );
}
