import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Box, Button, Typography, Rating } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "antd";
import { toast } from "react-toastify";

import { isAuthenticated } from "../../redux/slice/authSlice";
import { useCreateReviewMutation } from "../../redux/services/productsApi";
import FormTextarea from "../Forms/FormTextarea";
import { reviewSchema } from "../../validations/global.validation";

interface Review {
    comment: string;
}

interface CreateReviewProps {
    productId: string | undefined;
}

const AddNewReview: FC<CreateReviewProps> = ({ productId }) => {
    const isAuth = useSelector(isAuthenticated);
    const navigate = useNavigate();

    const [ratingValue, setRatingValue] = useState<number | null>(0);

    const [createReview, { isLoading: reviewLoading }] = useCreateReviewMutation();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Review>({ resolver: yupResolver(reviewSchema) });

    const onSubmit: SubmitHandler<Review> = async (data) => {
        const reviewData = {
            ...data,
            rating: ratingValue,
        };

        try {
            await createReview({ review: reviewData, productId }).unwrap();
            toast.success("Review successfully added!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to add review. Please try again.");
        }
        reset();
        setRatingValue(null);
    };

    return (
        <Box mt={1}>
            {isAuth ? (
                <Box maxWidth={400}>
                    <Box className="mb-2.5 flex items-center gap-5">
                        <Typography variant="h5">Add Your Review</Typography>
                        <Rating
                            name="simple-controlled"
                            value={ratingValue}
                            onChange={(_, newValue) => {
                                setRatingValue(newValue);
                            }}
                        />
                    </Box>

                    <Form onFinish={handleSubmit(onSubmit)}>
                        {/* Comment Input */}
                        <FormTextarea control={control} name="comment" error={errors.comment?.message} />

                        {/* Submit Button */}
                        <Button type="submit" variant="contained" color="primary" fullWidth disabled={reviewLoading}>
                            Add Comment
                        </Button>
                    </Form>
                </Box>
            ) : (
                <Box textAlign="center" marginY={2}>
                    <Typography sx={{ mb: 1 }}>You must log in to add a comment</Typography>
                    <Button variant="contained" color="primary" onClick={() => navigate("/login")}>
                        Log In
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default AddNewReview;
