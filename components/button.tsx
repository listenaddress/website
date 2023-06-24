"use client";
import { type } from "os";
import React from "react";
import { ThemeContext } from "@/context/theme";

interface ButtonProps {
  onClick: any;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  primary?: boolean;
  secondary?: boolean;
  style?: {};
  className?: string;
}

const getSizeClasses = (size: string) => {
  switch (size) {
    case "sm":
      return "px-4 py-1 text-sm font-medium rounded-md";
    case "lg":
      return "px-6 py-2 text-md sm:px-16 sm:py-3 sm:text-lg font-medium rounded-xl";
    default:
      return "px-6 py-2 text-md font-medium rounded-lg";
  }
}

const getStyleClasses = (style: string, theme: string) => {
  switch (style) {
    case "secondary":
      return `text-${theme}-text-primary border-2 border-${theme}-border-primary`;
    default:
      return `bg-${theme}-button-primary text-${theme}-bg-primary`;
  }
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  type = "button",
  disabled = false,
  size = "md",
  primary = false,
  secondary = false,
  style = {},
  className = ""
}) => {
  if (!primary && !secondary) primary = true;
  const { theme, setTheme } = React.useContext(ThemeContext) || { theme: 'light', setTheme: () => { } };
  return (
    <button
      type={type}
      className={`${getSizeClasses(size)} ${getStyleClasses((primary ? 'primary' : 'secondary'), theme)} bg-${theme}-secondary text-${theme}-primary bg-${theme}-button-${style} ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;