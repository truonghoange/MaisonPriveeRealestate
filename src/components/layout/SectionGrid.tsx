import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type SectionGridProps = ComponentPropsWithoutRef<"div"> & {
  ratio?: "equal" | "editorial";
};

export function SectionGrid({
  className,
  ratio = "editorial",
  ...props
}: SectionGridProps) {
  return (
    <div
      className={cn(
        "grid gap-x-12 gap-y-8 md:gap-x-16",
        ratio === "equal"
          ? "md:grid-cols-2"
          : "md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]",
        className,
      )}
      {...props}
    />
  );
}
