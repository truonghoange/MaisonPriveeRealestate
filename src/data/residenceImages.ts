import { residences } from "@/data/residences";

type ResidenceId = (typeof residences)[number]["id"];

interface ResidenceFloorPlan {
  fileName: string;
  sourcePage: number;
  caption: string;
}

// Images are cropped from the project's training PDF. A floor plan of level 35
// is used where the PDF does not provide a dedicated unit layout.
export const residenceFloorPlans = {
  "tower-m-2br-plus": {
    fileName: "tower-m-2br-plus.webp",
    sourcePage: 71,
    caption: "Mặt bằng căn điển hình 2BR+ · Tower M · trang 71",
  },
  "tower-m-3br-plus": {
    fileName: "tower-m-3br-plus.webp",
    sourcePage: 72,
    caption: "Mặt bằng căn điển hình 3BR+ (123 m²) · Tower M · trang 72",
  },
  "tower-m-4br-plus": {
    fileName: "tower-m-4br-plus.webp",
    sourcePage: 70,
    caption: "Mặt bằng tầng 35 · vị trí căn 4BR+ Tower M · trang 70",
  },
  "tower-m-penthouse": {
    fileName: "tower-m-penthouse.webp",
    sourcePage: 70,
    caption: "Mặt bằng tầng 35 · vị trí Penthouse PH3 Tower M · trang 70",
  },
  "tower-p-3br-plus": {
    fileName: "tower-p-3br-plus.webp",
    sourcePage: 80,
    caption: "Mặt bằng căn điển hình 3BR+ · Tower P · trang 80",
  },
  "tower-p-4br-plus": {
    fileName: "tower-p-4br-plus.webp",
    sourcePage: 81,
    caption: "Mặt bằng căn điển hình 4BR+ · Tower P · trang 81",
  },
  "tower-p-duplex": {
    fileName: "tower-p-duplex.webp",
    sourcePage: 82,
    caption: "Mặt bằng căn Duplex hai tầng · Tower P · trang 82",
  },
  "tower-p-penthouse": {
    fileName: "tower-p-penthouse.webp",
    sourcePage: 79,
    caption: "Mặt bằng tầng 35 · vị trí Penthouse PH1/PH2 Tower P · trang 79",
  },
} as const satisfies Record<ResidenceId, ResidenceFloorPlan>;
