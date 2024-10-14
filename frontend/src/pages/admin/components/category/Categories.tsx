import { FC, useState } from "react";
import {
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useGetAllCategoryQuery,
    useUpdateCategoryMutation,
} from "../../../../redux/services/categoryApi";
import { Box, Button, Modal, Typography, TextField } from "@mui/material";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Loading from "../../../../components/Loading";

// Modal stili
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

// Schema validation
const CategoriesSchema = object().shape({
    categoryName: string().required("Category is required"),
});

const Categories: FC = () => {
    const { data: categoryData, isLoading: loadingCategories } = useGetAllCategoryQuery();
    const [createCategory, { isLoading: createLoading }] = useCreateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();
    const [updateCategory, { isLoading: updateLoading }] = useUpdateCategoryMutation();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
    } = useForm<{ categoryName: string }>({
        resolver: yupResolver(CategoriesSchema),
    });

    const [open, setOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const handleOpen = () => {
        reset();
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setIsEditMode(false);
        setSelectedCategory(null);
    };

    const onSubmit = (data: { categoryName: string }) => {
        const { categoryName } = data;
        if (isEditMode && selectedCategory) {
            updateCategory({ id: selectedCategory, categoryName });
        } else {
            createCategory({ categoryName });
        }
        handleClose();
        reset();
    };

    const handleEdit = ({ id, name }: { id: string; name: string }) => {
        setValue("categoryName", name);
        setSelectedCategory(id);
        setIsEditMode(true);
        setOpen(true);
    };

    const handleDelete = (categoryId: string) => {
        deleteCategory({ id: categoryId });
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom className="font-bold text-stone-700" align="center">
                Categories
            </Typography>

            <Button onClick={handleOpen} variant="contained" color="primary">
                Add New Category
            </Button>

            <Box minWidth={"80%"} width={"800px"} mx={"auto"}>
                <Box display="flex" justifyContent="start" mb={2}>
                    <Typography variant="h5" className="text-bold text-[#2e2e2e]">
                        Category name :
                    </Typography>
                </Box>

                {loadingCategories ? (
                    <Loading />
                ) : (
                    categoryData &&
                    categoryData.map((category) => (
                        <Box
                            key={category._id}
                            display="flex"
                            justifyContent="space-between"
                            mb={2}
                            className="border-stone-550 rounded border-2 p-2 transition-all hover:border-stone-400"
                        >
                            <Typography variant="h6">{category.name}</Typography>
                            <Box display={"flex"} gap={2}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => handleEdit({ id: category._id, name: category.name })}
                                >
                                    Edit
                                </Button>
                                <Button variant="outlined" color="secondary" onClick={() => handleDelete(category._id)}>
                                    Delete
                                </Button>
                            </Box>
                        </Box>
                    ))
                )}
            </Box>

            <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
                <Box sx={style}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            label="Category Name"
                            fullWidth
                            margin="normal"
                            {...control.register("categoryName")}
                            error={!!errors.categoryName}
                            helperText={errors.categoryName?.message}
                        />
                        <Button type="submit" variant="contained" color="primary" disabled={createLoading || updateLoading}>
                            {isEditMode ? "Update Category" : "Create Category"}
                        </Button>
                    </form>
                </Box>
            </Modal>
        </Box>
    );
};

export default Categories;
