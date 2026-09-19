import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type TextSize = "sm" | "base" | "lg" | "lead";
type TextTone = "default" | "muted" | "inverse";

type TextProps = ComponentPropsWithoutRef<"p"> & {
  size?: TextSize;
  tone?: TextTone;
};

const sizeClasses: Record<TextSize, string> = {
  sm: "text-(length:--text-sm) leading-6",
  base: "text-(length:--text-base) leading-7",
  lg: "text-(length:--text-lg) leading-8",
  lead: "text-(length:--text-lead) leading-[1.55]",
};

const toneClasses: Record<TextTone, string> = {
  default: "text-foreground",
  muted: "text-muted",
  inverse: "text-inverse-foreground",
};

export function Text({
  className,
  size = "base",
  tone = "default",
  ...props
}: TextProps) {
  return (
    <p
      className={cn(
        "font-[family-name:var(--font-sans)]",
        sizeClasses[size],
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  );
}
