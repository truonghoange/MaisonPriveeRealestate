import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { privatePreviewLink } from "@/data/navigation";
import { project } from "@/data/project";
import { cn } from "@/lib/utils";

import { DesktopNavigation } from "./DesktopNavigation";
import { MobileNavigation } from "./MobileNavigation";
import styles from "./SiteHeader.module.css";

type SiteHeaderProps = {
  variant?: "solid" | "overlay";
};

export function SiteHeader({ variant = "solid" }: SiteHeaderProps) {
  const brandName = project.shortName;

  return (
    <header
      data-site-header
      data-surface={variant}
      className={cn(
        styles.header,
        "bg-background text-foreground border-border fixed inset-x-0 top-0 z-50 h-(--site-header-height) w-full",
      )}
    >
      <Container className="flex h-full items-center justify-between gap-5">
        <Link
          href="/"
          data-site-brand
          aria-label={`${brandName} — Trang chủ`}
          className="shrink-0 font-[family-name:var(--font-serif)] text-(length:--text-wordmark) leading-none font-medium tracking-[-0.015em] no-underline"
        >
          {brandName}
        </Link>

        <div className="hidden items-center gap-7 xl:flex 2xl:gap-9">
          <DesktopNavigation />
          <Button
            href={privatePreviewLink.href}
            variant="secondary"
            className="min-h-10 shrink-0 px-5 py-2 whitespace-nowrap"
          >
            {privatePreviewLink.label}
          </Button>
        </div>

        <MobileNavigation brandName={brandName} />
      </Container>
    </header>
  );
}
