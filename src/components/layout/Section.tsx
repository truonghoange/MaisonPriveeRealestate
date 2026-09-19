import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  tone?: "default" | "light" | "dark";
  spacing?: "sm" | "md" | "lg";
};

const toneClasses = {
  default: "",
  light: "section-tone-light",
  dark: "section-tone-dark",
} as const;

const spacingClasses = {
  sm: "py-(--section-space-sm)",
  md: "py-(--section-space-md)",
  lg: "py-(--section-space-lg)",
} as const;

export function Section({
  className,
  tone = "default",
  spacing = "md",
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "bg-background text-foreground scroll-mt-[calc(var(--site-header-height)+1rem)]",
        toneClasses[tone],
        spacingClasses[spacing],
        className,
      )}
      {...props}
    />
  );
}
