import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";
type HeadingSize = "sm" | "md" | "lg" | "xl" | "display";

type HeadingProps = ComponentPropsWithoutRef<"h2"> & {
  as?: HeadingLevel;
  size?: HeadingSize;
};

const sizeClasses: Record<HeadingSize, string> = {
  sm: "text-(length:--heading-sm)",
  md: "text-(length:--heading-md)",
  lg: "text-(length:--heading-lg)",
  xl: "text-(length:--heading-xl)",
  display: "text-(length:--heading-display)",
};

export function Heading({
  as: Element = "h2",
  size = "md",
  className,
  ...props
}: HeadingProps) {
  return (
    <Element
      className={cn(
        "font-[family-name:var(--font-serif)] font-normal tracking-[-0.005em]",
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}
