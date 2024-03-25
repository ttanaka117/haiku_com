import styles from "./ContentCardWrapper.module.scss";
import { ReactNode } from "react";

export function ContentCardWrapper({ children }: { children: ReactNode }) {
  return <div className={styles.content_card_wrapper}>{children}</div>;
}
