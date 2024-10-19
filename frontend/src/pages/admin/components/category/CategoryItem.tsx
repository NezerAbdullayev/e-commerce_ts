import { Box, Button, Typography } from "@mui/material";
import { FC, memo } from "react";

interface CategoryItemProps {
    name: string;
    id: string;
    onEdit: (category: { id: string; name: string }) => void;
    onDelete: (id: string) => void;
}

const CategoryItem: FC<CategoryItemProps> = ({ name, id, onEdit, onDelete }) => {
    return (
        <Box
            display="flex"
            justifyContent="space-between"
            mb={2}
            className="border-stone-550 rounded border-2 p-2 transition-all hover:border-stone-400"
        >
            <Typography variant="h6">{name}</Typography>
            <Box display={"flex"} gap={2}>
                <Button variant="outlined" color="primary" onClick={() => onEdit({ id, name })}>
                    Edit
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => onDelete(id)}>
                    Delete
                </Button>
            </Box>
        </Box>
    );
};

export default memo(CategoryItem);
