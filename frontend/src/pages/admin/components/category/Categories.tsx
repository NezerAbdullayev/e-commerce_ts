import React, { FC } from "react";
import {
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useGetAllCategoryQuery,
    useUpdateCategoryMutation,
} from "../../../../redux/services/categoryApi";
import { Box, Button, Modal, Typography } from "@mui/material";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const Categories: FC = () => {
    const { data: CategoryData } = useGetAllCategoryQuery();
    const [createCategory, { isLoading: createLoading }] = useCreateCategoryMutation();
    const [deleteCategory, { isLoading: deleteLoading }] = useDeleteCategoryMutation();
    const [updateCategory, { isLoading: updateLoading }] = useUpdateCategoryMutation();
    console.log(CategoryData);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Box>
            <Typography variant="h4" gutterBottom className="font-bold text-stone-700" align="center">
                Categories
            </Typography>

            <Button onClick={handleOpen}>Open modal</Button>

            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}></Box>
            </Modal>

            <Box>
                <Box></Box>
            </Box>
        </Box>
    );
};

export default Categories;
