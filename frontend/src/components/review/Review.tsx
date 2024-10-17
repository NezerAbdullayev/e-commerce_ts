import { Box, Rating, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { isAuthenticated } from "../../redux/slice/authSlice";


interface ReviewProps {
    rating: number;
    text: number;
}

const Review: FC<ReviewProps> = ({ rating, text }) => {
    // const isAuth = useSelector(isAuthenticated);
    // const [createReview, { isLoading: reviewLoading }] = useCreateReviewMutation();

    const [value, setValue] = useState<number | null>(2);



    // comment: "perfect";
    // createdAt: "2024-10-15T12:37:07.882Z";
    // name: "nezer";
    // rating: 4;
    // updatedAt: "2024-10-15T12:37:07.882Z";
    // user: "67052d407a3ec4123a641faa";
    // _id: "670e61f38521ff3db445fff8";

    return (
        <Typography variant="body1" sx={{ overflowY: "auto" }} className="h-[50%] w-full overflow-auto">
            <Typography
                variant="body2"
                component="div"
                color="text.secondary"
                className="flex items-center gap-[2px]"
                sx={{ marginTop: 1 }}
            >
                <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(_, newValue) => {
                        setValue(newValue);
                    }}
                />
                <Box className="font-bold">({rating})</Box>
            </Typography>
        </Typography>
    );
};

export default Review;
