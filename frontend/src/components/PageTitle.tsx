import { Typography } from "@mui/material";
import { FC, ReactNode } from "react";

const PageTitle: FC<{ children: ReactNode; className?: string }> = ({ children, className }) => {
    return (
        <div>
            <Typography variant="h4" gutterBottom align="center" className={`font-bold text-stone-700 ${className ? className : ""}`}>
                {children}
            </Typography>
        </div>
    );
};

export default PageTitle;
