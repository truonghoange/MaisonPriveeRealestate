import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type EyebrowProps = ComponentPropsWithoutRef<"p"> & {
  tone?: "accent" | "muted";
};

export function Eyebrow({
  className,
  tone = "accent",
  ...props
}: EyebrowProps) {
  return (
    <p
      className={cn(
        "font-[family-name:var(--font-sans)] text-(length:--text-eyebrow) font-medium tracking-[0.16em] uppercase",
        tone === "accent" ? "text-accent-text" : "text-muted",
        className,
      )}
      {...props}
    />
  );
}
