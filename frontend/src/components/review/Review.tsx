import { Box, Rating, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { isAuthenticated } from "../../redux/slice/authSlice";

interface ReviewProps {
    rating: number;
    text: number;
}

const Review: FC = () => {
    // const isAuth = useSelector(isAuthenticated);
    // const [createReview, { isLoading: reviewLoading }] = useCreateReviewMutation();

    const [value, setValue] = useState<number | null>(2);
    console.log("re-rendering review");

    // comment: "perfect";
    // createdAt: "2024-10-15T12:37:07.882Z";
    // name: "nezer";
    // rating: 4;
    // updatedAt: "2024-10-15T12:37:07.882Z";
    // user: "67052d407a3ec4123a641faa";
    // _id: "670e61f38521ff3db445fff8";

    // comment: "nice";
    // createdAt: "2024-10-17T19:59:45.269Z";
    // name: "admin";
    // rating: 3;
    // updatedAt: "2024-10-17T19:59:45.269Z";
    // user: "66f43c34908f58b34bcbf8e1";
    // _id: "67116cb1ec52a38ea412611d";

    return (
        <Typography variant="body1" component={"div"} sx={{ overflowY: "auto" }} className="h-[50%] w-full overflow-auto">
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
                <Box className="font-bold"></Box>
            </Typography>
        </Typography>
    );
};

export default Review;
