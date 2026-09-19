import { headerNavigationItems } from "@/data/navigation";

export function DesktopNavigation() {
  return (
    <nav aria-label="Điều hướng chính">
      <ul className="flex items-center gap-x-6 2xl:gap-x-8">
        {headerNavigationItems.map((item) => (
          <li key={item.id}>
            <a
              href={item.href}
              className="font-[family-name:var(--font-sans)] text-(length:--text-nav) leading-none tracking-[0.045em] whitespace-nowrap underline decoration-transparent underline-offset-8 transition-[text-decoration-color] duration-(--duration-fast) ease-(--ease-out) hover:decoration-current"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
