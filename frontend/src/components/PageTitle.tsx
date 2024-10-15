import { Typography } from "@mui/material";
import { FC, ReactNode } from "react";

const PageTitle: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div>
            <Typography variant="h4" gutterBottom className="font-bold text-stone-700" align="center">
                {children}
            </Typography>
        </div>
    );
};

export default PageTitle;
