import Image from "next/image";

import type { ProjectMedia } from "@/types/media";

import styles from "./Hero.module.css";

type HeroMediaProps = {
  media: ProjectMedia;
};

export function HeroMedia({ media }: HeroMediaProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src={media.src}
        alt={media.alt}
        fill
        preload
        sizes="100vw"
        className={styles.mediaImage}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,13,21,0.8)_0%,rgba(8,13,21,0.58)_36%,rgba(8,13,21,0.16)_72%),linear-gradient(180deg,rgba(8,13,21,0.2)_0%,rgba(8,13,21,0.05)_48%,rgba(8,13,21,0.64)_100%)] max-md:bg-[linear-gradient(180deg,rgba(8,13,21,0.32)_0%,rgba(8,13,21,0.28)_36%,rgba(8,13,21,0.78)_100%)]"
      />
    </div>
  );
}
