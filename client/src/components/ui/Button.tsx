import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "icon" | "none";
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const base =
  "rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

const variants = {
  primary:
    "px-4 py-2 w-full bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500",
  secondary:
    "px-4 py-2 w-full bg-gray-100 text-gray-800 hover:bg-purple-700 hover:text-white focus:ring-purple-500",
  outline:
    "px-4 py-2 w-full border border-gray-300 text-gray-800 hover:bg-gray-100 focus:ring-gray-400",
  icon:
    "w-9 h-9 flex items-center justify-center bg-transparent hover:bg-gray-800/30 focus:ring-gray-800",
  none: "bg-orange-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform duration-200",
};


  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

