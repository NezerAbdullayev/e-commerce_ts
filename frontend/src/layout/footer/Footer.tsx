import { Box, Grid2 as Grid, List, ListItemText, Typography } from "@mui/material";
import { FC } from "react";
import { FooterTitle } from "./FooterStyed";

import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer: FC = () => {
    return (
        <Box sx={{ p: { xs: 4, md: 6 }, pt: 6, pb: 12, fontSize: { xs: "12px", md: "14px" } }} className="bg-stone-800 text-stone-50">
            <Grid container spacing={2} justifyContent="center">
                <Grid size={{ md: 6, lg: 4 }}>
                    <FooterTitle variant="body1">About us</FooterTitle>
                    <Typography variant="caption">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit vel velit corporis ea mollitia, pariatur sapiente
                        rerum neque ipsam a hic perspiciatis. Possimus hic deleniti, sunt sit cumque ea quo.
                    </Typography>
                    <Box sx={{ mt: 4, color: "#9a9a9a" }}>
                        <FacebookIcon sx={{ mr: 1 }} />
                        <XIcon sx={{ mr: 1 }} />
                        <InstagramIcon sx={{ mr: 1 }} />
                    </Box>
                </Grid>

                <Grid size={{ md: 6, lg: 2 }}>
                    <FooterTitle variant="body1">information</FooterTitle>
                    <List>
                        <ListItemText>
                            <Typography lineHeight={2} variant="caption">
                                About Us
                            </Typography>
                        </ListItemText>

                        <ListItemText>
                            <Typography lineHeight={2} variant="caption">
                                Order Tracking
                            </Typography>
                        </ListItemText>

                        <ListItemText>
                            <Typography lineHeight={2} variant="caption">
                                Privary &amp; Policy
                            </Typography>
                        </ListItemText>

                        <ListItemText>
                            <Typography lineHeight={2} variant="caption">
                                Terms &amp; Conditions
                            </Typography>
                        </ListItemText>
                    </List>
                </Grid>

                <Grid size={{ md: 6, lg: 2 }}>
                    <FooterTitle variant="body1">my accont</FooterTitle>

                    <List>
                        <ListItemText>
                            <Typography lineHeight={2} variant="caption">
                                Login
                            </Typography>
                        </ListItemText>

                        <ListItemText>
                            <Typography lineHeight={2} variant="caption">
                                My Card
                            </Typography>
                        </ListItemText>

                        <ListItemText>
                            <Typography lineHeight={2} variant="caption">
                                My Account
                            </Typography>
                        </ListItemText>

                        <ListItemText>
                            <Typography lineHeight={2} variant="caption">
                                Wishlist
                            </Typography>
                        </ListItemText>
                    </List>
                </Grid>

                <Grid size={{ md: 6, lg: 2 }}>
                    <FooterTitle variant="body1">Contact</FooterTitle>

                    <List>
                        <ListItemText>
                            <Typography lineHeight={2} variant="caption">
                                <b>Phone:</b> +123 456 789
                            </Typography>
                        </ListItemText>

                        <ListItemText>
                            <Typography lineHeight={2} variant="caption">
                                <b>Email:</b>contact@yourdomain.com
                            </Typography>
                        </ListItemText>

                        <ListItemText>
                            <Typography lineHeight={2} variant="caption">
                                <b>Address:</b>123 Real Street, City, Country
                            </Typography>
                        </ListItemText>
                    </List>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Footer;
