"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "@/lib/utils";

export function Separator({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      className={cn(
        "bg-slate-200 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full",
        className
      )}
      {...props}
    />
  );
}
