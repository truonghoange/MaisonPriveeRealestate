import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type VisuallyHiddenProps = ComponentPropsWithoutRef<"span">;

export function VisuallyHidden({ className, ...props }: VisuallyHiddenProps) {
  return <span className={cn("sr-only", className)} {...props} />;
}
