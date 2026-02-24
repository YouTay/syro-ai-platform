import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border border-gray-200/60 bg-white/50 backdrop-blur-sm px-3 py-2 text-sm shadow-soft placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600/25 focus:bg-white/80 transition-all",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
