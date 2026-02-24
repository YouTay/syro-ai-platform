import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "outline" | "ghost";
}

export function Button({
  className,
  variant = "default",
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  const base =
    "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]/30 disabled:pointer-events-none disabled:opacity-50";

  const variants: Record<string, string> = {
    default: "bg-slate-900 text-white hover:bg-slate-800",
    outline: "border border-slate-200 bg-white hover:bg-slate-50 text-slate-900",
    ghost: "hover:bg-slate-100 text-slate-900",
  };

  return (
    <Comp
      className={cn(base, "h-10 px-4 py-2 rounded-xl", variants[variant], className)}
      {...props}
    />
  );
}
