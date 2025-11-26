import React from "react";
import Carousel from "react-material-ui-carousel";
import { Box, useTheme, useMediaQuery } from "@mui/material";

const images = [
    "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=400&fit=crop",
    "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=400&fit=crop",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop"
];

export default function HomeCarousel() {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));

    const height = isSmall ? "180px" : isMedium ? "280px" : "400px";

    return (
        <Carousel
            indicators={false}
            navButtonsAlwaysVisible
            animation="slide"
            interval={3000}
        >
            {images.map((img, i) => (
                <Box
                    key={i}
                    sx={{
                        height,
                        width: "100%",
                        backgroundImage: `url(${img})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
            ))}
        </Carousel>
    );
}
