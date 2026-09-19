import { Container } from "@/components/layout/Container";
import { consultant } from "@/data/consultant";
import { contactContent } from "@/data/contact";
import { navigationItems, privatePreviewLink } from "@/data/navigation";
import { project } from "@/data/project";
import { getConsultantActions } from "@/lib/contact";

export function SiteFooter() {
  const consultantActions = getConsultantActions(consultant);
  const projectDisclaimer = project.disclaimers.find(
    (item) => item.id === "project-information",
  );

  return (
    <footer className="section-tone-dark border-border bg-background text-foreground border-t pt-16 pb-[calc(6rem+env(safe-area-inset-bottom))] md:pt-20 md:pb-16">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 md:gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)_minmax(0,0.85fr)] lg:gap-16">
          <div className="md:col-span-2 lg:col-span-1">
            <p className="font-[family-name:var(--font-serif)] text-(length:--text-wordmark) leading-none font-medium">
              {project.shortName}
            </p>
            <p className="text-muted mt-5 max-w-[26rem] text-(length:--text-sm) leading-7">
              {contactContent.independentNotice}
            </p>
          </div>

          <nav aria-label="Điều hướng cuối trang">
            <p className="text-accent-text text-(length:--text-xs) tracking-[0.14em] uppercase">
              Khám phá
            </p>
            <ul className="mt-5 space-y-3">
              {navigationItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="text-muted hover:text-foreground text-(length:--text-sm) no-underline transition-colors duration-(--duration-fast)"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-accent-text text-(length:--text-xs) tracking-[0.14em] uppercase">
              Liên hệ
            </p>
            <ul className="mt-5 space-y-3">
              {consultantActions.map((action) => (
                <li key={action.kind}>
                  <a
                    href={action.href}
                    {...(action.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="text-muted hover:text-foreground text-(length:--text-sm) no-underline transition-colors duration-(--duration-fast)"
                  >
                    {action.label}: {action.value}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={privatePreviewLink.href}
                  className="text-muted hover:text-foreground text-(length:--text-sm) no-underline transition-colors duration-(--duration-fast)"
                >
                  Yêu cầu Private Preview
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-border mt-14 grid gap-8 border-t pt-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)] lg:gap-16">
          {projectDisclaimer ? (
            <p className="text-muted max-w-[66rem] text-(length:--text-xs) leading-6">
              {projectDisclaimer.text.vi}
            </p>
          ) : null}
          <div className="text-muted space-y-3 text-(length:--text-xs) leading-5 lg:text-right">
            <p>{contactContent.imageDisclaimer}</p>
            <p>
              © {new Date().getFullYear()} {project.shortName}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
