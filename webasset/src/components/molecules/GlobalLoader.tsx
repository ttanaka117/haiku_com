import { LoaderIcon } from "react-hot-toast";
import styles from "./GlobalLoader.module.scss";

export function GlobalLoader() {
  return (
    <div className={styles.global_loader_wrapper}>
      <LoaderIcon className={styles.global_loader} />
    </div>
  );
}
