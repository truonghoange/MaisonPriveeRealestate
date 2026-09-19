import type { ConsultantConfig } from "@/types/consultant";

export interface ConsultantAction {
  kind: "phone" | "zalo" | "email";
  label: string;
  value: string;
  href: string;
  external: boolean;
}

export function hasApprovedConsultantName(config: ConsultantConfig): boolean {
  const name = config.name.trim();
  return Boolean(name && name !== "Tên tư vấn viên");
}

export function getConsultantActions(
  config: ConsultantConfig,
): ConsultantAction[] {
  const actions: ConsultantAction[] = [];
  const phone = config.phone.trim();
  const phoneHref = phone.startsWith("+")
    ? `+${phone.slice(1).replace(/\D/g, "")}`
    : phone.replace(/\D/g, "");

  if (phone && phoneHref) {
    actions.push({
      kind: "phone",
      label: "Gọi",
      value: phone,
      href: `tel:${phoneHref}`,
      external: false,
    });
  }

  if (config.zaloUrl.trim()) {
    actions.push({
      kind: "zalo",
      label: "Zalo",
      value: "Trò chuyện qua Zalo",
      href: config.zaloUrl.trim(),
      external: true,
    });
  }

  if (config.email.trim()) {
    actions.push({
      kind: "email",
      label: "Email",
      value: config.email.trim(),
      href: `mailto:${config.email.trim()}`,
      external: false,
    });
  }

  return actions;
}
