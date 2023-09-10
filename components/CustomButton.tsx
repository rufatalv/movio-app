import { Button } from "@nextui-org/react";
import React from "react";

interface Props {
  children: React.ReactNode;
  isLoading: boolean;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
}

function CustomButton({
  children,
  type,
  isLoading,
  onClick,
  className,
}: Props) {
  return (
    <Button
      type={type}
      onClick={onClick}
      isLoading={isLoading}
      className={`h-10 px-4 gap-4 py-6 text-xl bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:!outline-none focus-visible:ring-0 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${className}`}
      color="primary">
      {isLoading ? "Loading..." : children}
    </Button>
  );
}

export default CustomButton;
