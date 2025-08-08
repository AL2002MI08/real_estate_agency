import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import type { ReactNode } from "react";

const StyledCard = styled(Card)(({ theme }) => ({
    width: "100%",
    maxWidth: 450,
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(3),
    margin: "auto",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: 12,
}));

interface FormCardProps {
    children: ReactNode;
    variant?: "outlined"
}

export const FormCard = ({ children, variant = "outlined" }: FormCardProps) => {
    return <StyledCard variant={variant}>{children}</StyledCard>;
};
