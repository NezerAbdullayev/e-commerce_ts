import { FC, useCallback, useState } from "react";
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
import PageTitle from "../../../../components/PageTitle";
import Error from "../Error";
import CategoryItem from "./CategoryItem";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation(); 
    const { data: categoryData, isLoading: loadingCategories, error: categoriesError } = useGetAllCategoryQuery();
    const [createCategory, { isLoading: createLoading }] = useCreateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();
    const [updateCategory, { isLoading: updateLoading }] = useUpdateCategoryMutation();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<{ categoryName: string }>({
        resolver: yupResolver(CategoriesSchema),
    });

    const [open, setOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const handleOpen = useCallback(() => {
        reset({ categoryName: "" });
        setOpen(true);
    }, [reset]);

    const handleClose = useCallback(() => {
        setOpen(false);
        setIsEditMode(false);
        setSelectedCategory(null);
    }, []);

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

    const handleEdit = useCallback(
        ({ id, name }: { id: string; name: string }) => {
            reset({ categoryName: name });
            setSelectedCategory(id);
            setIsEditMode(true);
            setOpen(true);
        },
        [reset],
    );

    const handleDelete = useCallback(
        async (categoryId: string) => {
            try {
                await deleteCategory({ id: categoryId }).unwrap();
                toast.success(t("deleteSuccess"));
            } catch (error) {
                console.error(error);
                toast.error(t("deleteError"));
            }
        },
        [deleteCategory, t],
    );

    return (
        <Box>
            <PageTitle>{t("categories")}</PageTitle>
            <Button onClick={handleOpen} variant="contained" color="primary">
                {t("addCategory")}
            </Button>
            <Box minWidth={"80%"} width={"800px"} mx={"auto"}>
                <Box display="flex" justifyContent="start" mb={2}>
                    <Typography variant="h5" className="text-bold text-[#2e2e2e]">
                        {t("categoryName")}
                    </Typography>
                </Box>

                {loadingCategories ? (
                    <Loading />
                ) : categoriesError ? (
                    <Error message={t("errorFetching")} />
                ) : (
                    categoryData &&
                    categoryData.map((category) => (
                        <CategoryItem
                            key={category._id}
                            id={category._id}
                            name={category.name}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))
                )}
            </Box>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
                <Box sx={style}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            label={t("categoryName")}
                            fullWidth
                            margin="normal"
                            {...control.register("categoryName")}
                            error={!!errors.categoryName}
                            helperText={errors.categoryName?.message}
                        />
                        <Button type="submit" variant="contained" color="primary" disabled={createLoading || updateLoading}>
                            {isEditMode ? t("updateCategory") : t("createCategory")}
                        </Button>
                    </form>
                </Box>
            </Modal>
        </Box>
    );
};

export default Categories;
