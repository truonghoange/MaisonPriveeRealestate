import { consultant } from "@/data/consultant";
import { privatePreviewLink } from "@/data/navigation";
import { getConsultantActions } from "@/lib/contact";

export function MobileContactBar() {
  const actions = getConsultantActions(consultant).filter(
    (action) => action.kind === "phone" || action.kind === "zalo",
  );

  return (
    <aside
      aria-label="Liên hệ nhanh"
      className="border-border section-tone-dark bg-background fixed inset-x-0 bottom-0 z-40 border-t px-3 pt-2 md:hidden"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
    >
      <div
        className="mx-auto grid max-w-lg divide-x divide-(--border)"
        style={{
          gridTemplateColumns: `repeat(${actions.length + 1}, minmax(0, 1fr))`,
        }}
      >
        {actions.map((action) => (
          <a
            key={action.kind}
            href={action.href}
            {...(action.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="hover:bg-surface flex min-h-12 items-center justify-center px-2 text-center text-[0.6875rem] font-medium tracking-[0.12em] uppercase no-underline transition-colors duration-(--duration-fast)"
            aria-label={
              action.kind === "phone"
                ? `Gọi tư vấn: ${action.value}`
                : "Liên hệ tư vấn qua Zalo"
            }
          >
            {action.label}
          </a>
        ))}
        <a
          href={privatePreviewLink.href}
          className="text-accent-text hover:bg-surface flex min-h-12 items-center justify-center px-2 text-center text-[0.6875rem] font-medium tracking-[0.12em] uppercase no-underline transition-colors duration-(--duration-fast)"
        >
          {privatePreviewLink.label}
        </a>
      </div>
    </aside>
  );
}
