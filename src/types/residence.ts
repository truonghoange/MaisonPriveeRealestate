import type { ContentSource } from "@/types/common";

export type TowerCode = "M" | "P";

export type ResidenceType =
  "2BR_PLUS" | "3BR_PLUS" | "4BR_PLUS" | "DUPLEX" | "PENTHOUSE";

export interface AreaRange {
  from: number;
  to?: number;
  unit: "m2";
  approximate?: boolean;
}

export type InventoryStatus = "unknown" | "available" | "reserved" | "sold";

export interface Residence {
  id: string;
  tower: TowerCode;
  type: ResidenceType;
  displayName: string;
  area: AreaRange;
  floorPlan?: string;
  image?: string;
  view?: string;
  inventory: {
    status: InventoryStatus;
  };
  source?: ContentSource;
}
