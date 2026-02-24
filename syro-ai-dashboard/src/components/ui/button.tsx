import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "outline" | "ghost" | "gradient";
}

export function Button({
  className,
  variant = "default",
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  const base =
    "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600/30 disabled:pointer-events-none disabled:opacity-50";

  const variants: Record<string, string> = {
    default: "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg",
    outline: "border border-gray-300/50 bg-white/50 backdrop-blur hover:bg-white/70 hover:border-purple-200 text-gray-900 hover:shadow-soft2",
    ghost: "hover:bg-purple-50/40 text-gray-900 hover:text-purple-600",
    gradient: "bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-700 hover:to-purple-600 hover:shadow-glass hover:scale-105 shadow-soft2",
  };

  return (
    <Comp
      className={cn(base, "h-10 px-4 py-2 rounded-lg", variants[variant], className)}
      {...props}
    />
  );
}
