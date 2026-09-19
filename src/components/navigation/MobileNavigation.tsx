"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

import { Button } from "@/components/ui/Button";
import { headerNavigationItems, privatePreviewLink } from "@/data/navigation";

import { MenuButton } from "./MenuButton";

type MobileNavigationProps = {
  brandName: string;
};

export function MobileNavigation({ brandName }: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const desktopQuery = window.matchMedia("(min-width: 80rem)");
    const handleDesktopChange = () => {
      if (!desktopQuery.matches) return;

      document.querySelector<HTMLElement>("[data-site-brand]")?.focus();
      setOpen(false);
    };

    desktopQuery.addEventListener("change", handleDesktopChange);

    return () => {
      document.body.style.overflow = previousOverflow;
      desktopQuery.removeEventListener("change", handleDesktopChange);
    };
  }, [open]);

  function closeMenu() {
    triggerRef.current?.focus();
    setOpen(false);
  }

  function handleLinkClick(href: string) {
    if (href.startsWith("#")) {
      const target = document.getElementById(href.slice(1));
      if (target) {
        if (!target.hasAttribute("tabindex")) target.tabIndex = -1;
        target.focus({ preventScroll: true });
      } else {
        triggerRef.current?.focus();
      }
    }

    setOpen(false);
  }

  function handlePanelKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      return;
    }

    if (event.key !== "Tab") return;

    const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable?.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <div className="xl:hidden">
      <MenuButton
        buttonRef={triggerRef}
        open={open}
        controls={panelId}
        onClick={() => setOpen(true)}
      />

      <div
        ref={panelRef}
        id={panelId}
        role="dialog"
        aria-label="Menu điều hướng"
        aria-modal={open ? true : undefined}
        aria-hidden={!open}
        inert={!open}
        hidden={!open}
        onKeyDown={handlePanelKeyDown}
        className="section-tone-dark bg-background text-foreground fixed inset-0 z-60 overflow-y-auto overscroll-contain xl:hidden"
      >
        <div className="mx-auto flex min-h-dvh max-w-(--container-max) flex-col px-(--container-padding) pb-12">
          <div className="flex h-(--site-header-height) shrink-0 items-center justify-between gap-4">
            <span className="font-[family-name:var(--font-serif)] text-(length:--text-wordmark) leading-none font-medium tracking-[-0.015em]">
              {brandName}
            </span>
            <MenuButton buttonRef={closeRef} open onClick={closeMenu} />
          </div>

          <nav
            aria-label="Điều hướng di động"
            className="flex flex-1 items-center py-8"
          >
            <ul className="w-full space-y-1">
              {headerNavigationItems.map((item, index) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={() => handleLinkClick(item.href)}
                    className="focus-visible:outline-accent-text flex min-h-12 items-center gap-5 py-2 font-[family-name:var(--font-serif)] text-(length:--text-mobile-nav) leading-[1.12] font-normal tracking-[-0.005em] no-underline transition-opacity duration-(--duration-fast) hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    <span
                      aria-hidden="true"
                      className="text-accent-text w-5 shrink-0 font-[family-name:var(--font-sans)] text-(length:--text-xs) tracking-normal"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-border border-t pt-8">
            <Button
              href={privatePreviewLink.href}
              variant="secondary"
              onClick={() => handleLinkClick(privatePreviewLink.href)}
            >
              {privatePreviewLink.label}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
