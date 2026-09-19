import type { AreaRange } from "@/types/residence";

const areaNumber = new Intl.NumberFormat("vi-VN", {
  maximumFractionDigits: 0,
});

export function formatResidenceArea(area: AreaRange): string {
  const value =
    area.to === undefined
      ? areaNumber.format(area.from)
      : `${areaNumber.format(area.from)}–${areaNumber.format(area.to)}`;

  return `${area.approximate ? "~" : ""}${value} m²`;
}
