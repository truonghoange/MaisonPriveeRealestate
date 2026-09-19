import { consultant } from "@/data/consultant";
import { project } from "@/data/project";

import styles from "./IntroLoader.module.css";

export function IntroContent() {
  return (
    <div className={styles.poster}>
      <p className={`${styles.brand} ${styles.reveal}`}>{project.shortName}</p>

      <div className={styles.statement}>
        <p className={`${styles.tagline} ${styles.reveal}`}>
          {project.tagline.vi}
        </p>
        <div className={`${styles.englishGroup} ${styles.reveal}`}>
          <span className={styles.rule} aria-hidden="true" />
          <p className={styles.english}>{project.tagline.en}</p>
        </div>
      </div>

      <div className={`${styles.signature} ${styles.reveal}`}>
        <p className={styles.role}>Tư vấn dự án</p>
        <p className={styles.consultant}>{consultant.name}</p>
      </div>
    </div>
  );
}
