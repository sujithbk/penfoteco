import { Box, Grid, Typography, Select, MenuItem } from "@mui/material";

export default function Footer() {
    return (
        <Box sx={{ background: "#232F3E", color: "#fff", mt: 5, pt: 5 }}>

            <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <Grid
                    container
                    spacing={4}
                    sx={{
                        px: 5,
                        pb: 5,
                        maxWidth: "1200px",  
                    }}
                >
                    
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" sx={{ mb: 2, fontSize: "16px" }}>
                            Get to Know Us
                        </Typography>
                        <FooterLink text="About Us" />
                        <FooterLink text="Careers" />
                        <FooterLink text="Press Releases" />
                        <FooterLink text="Amazon Science" />
                    </Grid>

                  
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" sx={{ mb: 2, fontSize: "16px" }}>
                            Connect with Us
                        </Typography>
                        <FooterLink text="Facebook" />
                        <FooterLink text="Twitter" />
                        <FooterLink text="Instagram" />
                    </Grid>

                    
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" sx={{ mb: 2, fontSize: "16px" }}>
                            Make Money with Us
                        </Typography>
                        <FooterLink text="Sell on Amazon" />
                        <FooterLink text="Amazon Accelerator" />
                        <FooterLink text="Amazon Global Selling" />
                        <FooterLink text="Become an Affiliate" />
                        <FooterLink text="Fulfilment by Amazon" />
                        <FooterLink text="Advertise Your Products" />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" sx={{ mb: 2, fontSize: "16px" , justifyContent: "space-between"}}>
                            Let Us Help You
                        </Typography>
                        <FooterLink text="Your Account" />
                        <FooterLink text="Returns Centre" />
                        <FooterLink text="100% Purchase Protection" />
                        <FooterLink text="Amazon App Download" />
                        <FooterLink text="Help" />
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ borderTop: "1px solid #3A4553" }} />

          
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    py: 3,
                    gap: 5,
                    flexWrap: "wrap",
                }}
            >
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    AMAZON
                </Typography>

                <Select
                    defaultValue="English"
                    sx={{
                        height: "40px",
                        color: "#fff",
                        border: "1px solid #555",
                        ".MuiSvgIcon-root": { color: "#fff" },
                        width: "140px",
                    }}
                >
                    <MenuItem value="English">English</MenuItem>
                    <MenuItem value="Hindi">Hindi</MenuItem>
                </Select>

                <Box
                    sx={{
                        border: "1px solid #555",
                        padding: "8px 15px",
                        borderRadius: "4px",
                    }}
                >
                    India
                </Box>
            </Box>

            <Box sx={{ borderTop: "1px solid #3A4553" }} />

          
            <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <Grid
                    container
                    spacing={4}
                    sx={{
                        px: 5,
                        py: 4,
                        maxWidth: "1200px",
                    }}
                >
                    <Grid item xs={6} sm={4} md={2}>
                        <FooterBottom title="AbeBooks" subtitle="Books, art & collectibles" />
                    </Grid>

                    <Grid item xs={6} sm={4} md={2}>
                        <FooterBottom
                            title="Amazon Web Services"
                            subtitle="Scalable Cloud Computing"
                        />
                    </Grid>

                    <Grid item xs={6} sm={4} md={2}>
                        <FooterBottom title="Audible" subtitle="Download Audio Books" />
                    </Grid>

                    <Grid item xs={6} sm={4} md={2}>
                        <FooterBottom title="Prime Now" subtitle="2-Hour Delivery" />
                    </Grid>

                    <Grid item xs={6} sm={4} md={2}>
                        <FooterBottom title="IMDb" subtitle="Movies, TV & Celebrities" />
                    </Grid>

                    <Grid item xs={6} sm={4} md={2}>
                        <FooterBottom
                            title="Amazon Prime Music"
                            subtitle="100M songs ad-free"
                        />
                    </Grid>
                </Grid>
            </Box>

            <Box
                sx={{
                    textAlign: "center",
                    fontSize: "12px",
                    py: 2,
                    opacity: 0.6,
                }}
            >
                © 1996–2024, Amazon.com, Inc. or its affiliates
            </Box>
        </Box>
    );
}


function FooterLink({ text }) {
    return (
        <Typography
            sx={{
                color: "#DDD",
                fontSize: "14px",
                mb: 1,
                cursor: "pointer",
                ":hover": { textDecoration: "underline" },
            }}
        >
            {text}
        </Typography>
    );
}

function FooterBottom({ title, subtitle }) {
    return (
        <Box>
            <Typography sx={{ fontSize: "14px", fontWeight: "bold", mb: 0.5 }}>
                {title}
            </Typography>
            <Typography sx={{ fontSize: "12px", opacity: 0.8 }}>
                {subtitle}
            </Typography>
        </Box>
    );
}
