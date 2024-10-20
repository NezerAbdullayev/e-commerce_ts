import { FC, memo } from "react";
import { Box, Button, TextField } from "@mui/material";

interface QuantitySelectorProps {
    quantity: number;
    onChangeQuantity: (change: number) => void;
}

const QuantitySelector: FC<QuantitySelectorProps> = ({ quantity, onChangeQuantity }) => {
    return (
        <Box display="flex" alignItems="center" mb={2}>
            <Button onClick={() => onChangeQuantity(-1)} variant="outlined">
                -
            </Button>
            <TextField
                type="number"
                value={quantity}
                onChange={(e) => onChangeQuantity(Number(e.target.value) - quantity)}
                sx={{ width: "60px", mx: 1 }}
            />
            <Button onClick={() => onChangeQuantity(1)} variant="outlined">
                +
            </Button>
        </Box>
    );
};

export default memo(QuantitySelector);
