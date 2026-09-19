import { Container } from "@/components/layout/Container";
import { navigationItems } from "@/data/navigation";

const implementedSectionIds = new Set([
  "overview",
  "location",
  "creators",
  "experiences",
  "residences",
  "gallery",
  "contact",
]);

export function DevelopmentAnchorHarness() {
  const pendingNavigationItems = navigationItems.filter(
    (item) => !implementedSectionIds.has(item.id),
  );

  if (!pendingNavigationItems.length) return null;

  return (
    <aside
      aria-label="Điểm neo điều hướng tạm thời"
      className="section-tone-light border-border bg-background text-muted border-t py-5"
    >
      <Container className="flex flex-wrap items-center gap-x-5 gap-y-2 text-(length:--text-xs)">
        <p className="font-medium tracking-[0.1em] uppercase">
          Development anchors
        </p>
        {pendingNavigationItems.map((item) => (
          <span key={item.id} id={item.id} tabIndex={-1}>
            {item.label}
          </span>
        ))}
      </Container>
    </aside>
  );
}
