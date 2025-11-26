import React from "react";
import { Box, Grid, Card, CardMedia, Typography } from "@mui/material";

const categories = [
    { title: "Electronics", img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=220&fit=crop" },
    { title: "Sports", img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&h=220&fit=crop" },
    { title: "Home", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=220&fit=crop" },
    { title: "Accessories", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=220&fit=crop" },
];

export default function CategoryGrid({ onCategorySelect }) {
    return (
        <Box sx={{ px: { xs: 2, md: 4 }, mt: { xs: -8, md: -15 }, position: "relative", zIndex: 10 }}>
            <Grid container spacing={2}>
                {categories.map((cat, i) => (
                    <Grid item xs={12} sm={6} md={3} key={i}>
                        <Card
                            sx={{ borderRadius: 2, marginRight: { md: 6 }, p: 2, bgcolor: '#fff', cursor: 'pointer' }}
                            onClick={() => onCategorySelect && onCategorySelect(cat.title)}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {cat.title}
                            </Typography>

                            <CardMedia
                                component="img"
                                image={cat.img}
                                sx={{
                                    height: { xs: 160, md: 220 },
                                    mt: 1,
                                    borderRadius: 1,
                                    objectFit: 'cover'
                                }}
                            />

                            <Typography color="primary" sx={{ mt: 1, fontWeight: 500 }}>
                                Shop now
                            </Typography>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
