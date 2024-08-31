import { cn } from "@/lib/utils";
import React from "react";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "aria-[invalid=true]:outline-red h-fit min-w-72 rounded-lg px-4 py-3 text-[14px] font-bold caret-beige-dark outline-double outline-2 outline-white-cloud placeholder:font-bold placeholder:text-black/40 placeholder:caret-beige-dark focus:outline-beige-dark",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";
