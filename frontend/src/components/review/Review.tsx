import { Box, Rating, Typography } from "@mui/material";
import { FC } from "react";

interface ReviewProps {
    reviews: {
        _id: string;
        comment: string;
        createdAt: string;
        name: string;
        rating: number;
        user: string;
    }[];
}

const Review: FC<ReviewProps> = ({ reviews }) => {
    return (
        <Box sx={{ overflowY: "auto", maxHeight: "1000px" }}>
            {reviews && reviews.length > 0 ? (
                reviews.map((review) => (
                    <Box key={review._id} sx={{ marginBottom: 2 }}>
                        <Box display={"flex"} alignItems={"center"} gap={1}> 
                            <Typography variant="h6">{review.name}</Typography>
                            <Rating value={review.rating} readOnly />
                        </Box>
                        <Typography variant="body2">{review.comment}</Typography>
                        <Typography variant="caption" color="text.secondary">
                            {new Date(review.createdAt).toLocaleDateString()}
                        </Typography>
                    </Box>
                ))
            ) : (
                <Typography>No reviews yet.</Typography>
            )}
        </Box>
    );
};

export default Review;
