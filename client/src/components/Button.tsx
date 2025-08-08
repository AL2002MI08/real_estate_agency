import MuiButton from "@mui/material/Button";
import type { ButtonProps } from "@mui/material/Button";
import { twMerge } from "tailwind-merge";

type CustomButtonVariant = "primary" | "secondary";

interface CustomButtonProps extends ButtonProps {
  buttonVariant?: CustomButtonVariant;
  className?: string;
}

export const Button = ({
  buttonVariant = "primary",
  className = "",
  ...props
}: CustomButtonProps) => {
  const baseClasses =
    "rounded-lg font-semibold normal-case py-3 px-6 text-sm shadow-none hover:shadow-none";

  const variantClasses = {
    primary: "bg-purple-500 text-white hover:bg-purple-600",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
  };

  return (
    <MuiButton
      variant="contained"
      disableElevation
      className={twMerge(baseClasses, variantClasses[buttonVariant], className)}
      {...props}
    />

  );
};
