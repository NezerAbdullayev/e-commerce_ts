import { FC } from "react";
import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PageNotFound: FC = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                textAlign: "center",
            }}
        >
            <Typography variant="h1" color="error">
                404
            </Typography>
            <Typography variant="h4" gutterBottom>
                Page Not Found
            </Typography>
            <Typography variant="body1" gutterBottom>
                The page you are looking for does not exist.
            </Typography>
            <Button onClick={handleGoBack} variant="contained" color="primary">
                Go Back
            </Button>
        </Container>
    );
};

export default PageNotFound;
