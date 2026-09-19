import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Eyebrow } from "./Eyebrow";
import { Heading } from "./Heading";
import { Text } from "./Text";

type SectionHeadingProps = Omit<ComponentPropsWithoutRef<"div">, "title"> & {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  level?: "h1" | "h2" | "h3" | "h4";
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  level = "h2",
  align = "left",
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center"
          ? "items-center text-center"
          : "items-start text-left",
        className,
      )}
      {...props}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading as={level} size="lg">
        {title}
      </Heading>
      {description && (
        <Text size="lead" tone="muted">
          {description}
        </Text>
      )}
    </div>
  );
}
