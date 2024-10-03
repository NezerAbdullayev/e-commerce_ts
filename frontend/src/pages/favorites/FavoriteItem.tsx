import { Card, CardContent, Typography, Button } from "@mui/material";

const FavoriteItem = ({ product }) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5">{product.name}</Typography>
                <Typography variant="body1">${product.price}</Typography>
                <Button variant="contained">Add to Basket</Button>
            </CardContent>
        </Card>
    );
};

export default FavoriteItem;
