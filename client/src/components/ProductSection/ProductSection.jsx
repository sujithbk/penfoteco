import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import ProductCard from "./ProductCard";

export default function ProductSection({ title, products }) {
    return (
        <Box sx={{ p: { xs: 2, md: 3 }, bgcolor: "#fff", mb: 2 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                {title}
            </Typography>

            <Grid container spacing={2}>
                {products.slice(0, 8).map((p) => (
                    <Grid item key={p._id} xs={6} sm={4} md={3} lg={2} xl={1.5} >
                        <ProductCard product={p} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
