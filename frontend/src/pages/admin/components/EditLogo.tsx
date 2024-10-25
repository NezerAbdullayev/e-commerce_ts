import { FC, useState } from "react";
import { Box, Button, Input, Typography } from "@mui/material";
import { TiEdit } from "react-icons/ti";
import { useGetAppLogoQuery, useUpdateAppLogoMutation } from "../../../redux/services/logoApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { logoSchema } from "../../../validations/global.validation";

const EditLogo: FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const { data } = useGetAppLogoQuery();
    const [updateLogo, { isLoading }] = useUpdateAppLogoMutation();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<{ name: string }>({ resolver: yupResolver(logoSchema) });

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const onSubmit = async (formData: { name: string }) => {
        try {
            await updateLogo({ name: formData.name }).unwrap();
            setIsEditing(false);
            toast.success("Logo changed successfully!");
        } catch (error) {
            toast.error("Failed to update logo. Please try again.");
            console.error("Logo update failed:", error);
        }
    };

    return (
        <Box>
            <Box p={1}>
                <Button onClick={handleEditClick} variant="outlined" color="primary">
                    <Box mr={1}>Change Logo </Box>
                    <TiEdit className="text-2xl text-[#1060b1]" />
                </Button>
            </Box>

            {isEditing && (
                <Box gap={2} mx={2} className="flex items-center">
                    <form onSubmit={handleSubmit(onSubmit)} className="mb-2 flex flex-col gap-2">
                        <Controller
                            name="name"
                            control={control}
                            defaultValue={data ? data[0]?.name || "" : ""}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    sx={{
                                        backgroundColor: "#f9f9f9",
                                        borderRadius: 1,
                                        padding: "8px 12px",
                                        fontSize: "14px",
                                    }}
                                    placeholder="Enter new logo name"
                                />
                            )}
                        />
                        {/* error */}
                        {errors?.name && (
                            <Typography color="error" variant="caption">
                                {errors.name.message}
                            </Typography>
                        )}

                        <Button
                            type="submit"
                            disabled={isLoading}
                            variant="contained"
                            color="primary"
                            sx={{ minHeight: "32px", fontSize: "14px" }}
                        >
                            {isLoading ? "Saving..." : "Change Logo"}
                        </Button>
                    </form>
                </Box>
            )}
        </Box>
    );
};

export default EditLogo;
