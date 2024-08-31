import React from "react";
import { cn } from "@/lib/utils";
import { IconArrowRight } from "@/icons";

type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "primary",
  children,
  className,
  onClick,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        {
          "bg-beige-dark px-8 py-3 text-[13px] font-bold text-white hover:bg-beige-light disabled:cursor-not-allowed disabled:opacity-50":
            variant === "primary",
          "border border-black bg-white px-8 py-3 text-[13px] font-bold text-black hover:bg-black hover:text-white":
            variant === "secondary",
          "flex w-fit items-center justify-center gap-2 text-[13px] font-bold text-charcoal hover:text-beige-dark":
            variant === "ghost",
        },
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {children}{" "}
      {variant == "ghost" && <IconArrowRight className="bg-beige-light" />}
    </button>
  );
}

export const ButtonWithRef = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", children, className, onClick, ...props }, ref) => {
    return (
      <button
        className={cn(
          {
            "bg-beige-dark px-8 py-3 text-[13px] font-bold text-white hover:bg-beige-light disabled:cursor-not-allowed disabled:opacity-70":
              variant === "primary",
            "border border-black bg-white px-8 py-3 text-[13px] font-bold text-black hover:bg-black hover:text-white":
              variant === "secondary",
            "flex w-fit items-center justify-center gap-2 text-[13px] font-bold text-charcoal hover:text-beige-dark":
              variant === "ghost",
          },
          className,
        )}
        ref={ref}
        onClick={onClick}
        {...props}
      >
        {children}{" "}
        {variant == "ghost" && <IconArrowRight className="bg-beige-light" />}
      </button>
    );
  },
);
