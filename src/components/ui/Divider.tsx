import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type DividerProps = ComponentPropsWithoutRef<"hr">;

export function Divider({ className, ...props }: DividerProps) {
  return (
    <hr
      className={cn("border-border border-0 border-t", className)}
      {...props}
    />
  );
}
