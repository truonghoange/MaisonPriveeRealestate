import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonBaseProps = {
  variant?: ButtonVariant;
  className?: string;
};

type NativeButtonProps = ButtonBaseProps &
  ComponentPropsWithoutRef<"button"> & { href?: never };

type LinkButtonProps = ButtonBaseProps &
  ComponentPropsWithoutRef<"a"> & { href: string; disabled?: never };

export type ButtonProps = NativeButtonProps | LinkButtonProps;

const baseClasses =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-(--radius-sm) px-6 py-3 text-(length:--text-xs) font-medium tracking-[0.1em] uppercase no-underline transition-[background-color,color,border-color,text-decoration-color,opacity] duration-(--duration-fast) ease-(--ease-out) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-text not-disabled:active:opacity-75 disabled:cursor-not-allowed disabled:opacity-45";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-foreground bg-foreground text-background not-disabled:hover:border-accent not-disabled:hover:bg-accent not-disabled:hover:text-accent-foreground",
  secondary:
    "border border-control-border bg-transparent text-foreground not-disabled:hover:border-foreground not-disabled:hover:bg-surface",
  ghost:
    "border border-transparent bg-transparent px-0 text-foreground underline decoration-transparent underline-offset-8 not-disabled:hover:decoration-current",
};

export function Button(props: ButtonProps) {
  if (typeof props.href === "string") {
    const { variant = "primary", className, ...linkProps } = props;

    return (
      <a
        className={cn(baseClasses, variantClasses[variant], className)}
        {...linkProps}
      />
    );
  }

  const {
    variant = "primary",
    className,
    type = "button",
    ...buttonProps
  } = props;

  return (
    <button
      type={type}
      className={cn(baseClasses, variantClasses[variant], className)}
      {...buttonProps}
    />
  );
}
