export interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

const contactHref = "#contact";

export const navigationItems = [
  { id: "overview", label: "Tổng quan", href: "#overview" },
  { id: "location", label: "Vị trí", href: "#location" },
  { id: "creators", label: "Đơn vị kiến tạo", href: "#creators" },
  {
    id: "experiences",
    label: "Trải nghiệm",
    href: "#experiences",
  },
  { id: "residences", label: "Bộ sưu tập căn hộ", href: "#residences" },
  { id: "gallery", label: "Thư viện", href: "#gallery" },
  { id: "contact", label: "Liên hệ", href: contactHref },
] as const satisfies readonly NavigationItem[];

export const headerNavigationItems = navigationItems.filter(
  (item) => item.id !== "contact",
);

export const privatePreviewLink = {
  id: "private-preview",
  label: "Private Preview",
  href: contactHref,
} as const satisfies NavigationItem;
