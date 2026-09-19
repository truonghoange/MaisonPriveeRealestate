import type { Ref } from "react";

import { VisuallyHidden } from "@/components/ui/VisuallyHidden";
import { cn } from "@/lib/utils";

type MenuButtonProps = {
  open: boolean;
  controls?: string;
  onClick: () => void;
  buttonRef?: Ref<HTMLButtonElement>;
};

export function MenuButton({
  open,
  controls,
  onClick,
  buttonRef,
}: MenuButtonProps) {
  return (
    <button
      ref={buttonRef}
      type="button"
      aria-expanded={controls ? open : undefined}
      aria-controls={controls}
      onClick={onClick}
      className="text-foreground hover:bg-surface focus-visible:outline-accent-text inline-flex size-11 shrink-0 items-center justify-center rounded-(--radius-sm) transition-colors duration-(--duration-fast) focus-visible:outline-2 focus-visible:outline-offset-2 xl:hidden"
    >
      <span aria-hidden="true" className="relative block h-4 w-5">
        <span
          className={cn(
            "absolute top-1/2 left-0 h-px w-5 bg-current transition-transform duration-(--duration-fast) ease-(--ease-out)",
            open ? "rotate-45" : "-translate-y-1",
          )}
        />
        <span
          className={cn(
            "absolute top-1/2 left-0 h-px w-5 bg-current transition-transform duration-(--duration-fast) ease-(--ease-out)",
            open ? "-rotate-45" : "translate-y-1",
          )}
        />
      </span>
      <VisuallyHidden>{open ? "Đóng menu" : "Mở menu"}</VisuallyHidden>
    </button>
  );
}
