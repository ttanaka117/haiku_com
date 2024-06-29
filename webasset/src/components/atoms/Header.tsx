import { Link } from "react-router-dom";
import logo from "../../assets/taskflow.svg";
import styles from "./Header.module.scss";
import Modal from "react-modal";
import { useState } from "react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className={styles.header}>
      <Modal
        isOpen={isOpen}
        contentLabel="Example Modal"
        style={{
          overlay: {
            zIndex: 1000,
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <div>
          <div>アカウント機能は準備中です</div>
          <button onClick={() => setIsOpen(false)}>閉じる</button>
        </div>
      </Modal>
      <div className={styles.header_contents}>
        <Link className={styles.link_button} to={`/top`}>
          <p className={`m-t10 ${styles.title}`}>
            <img src={logo} />
          </p>
          {/* <p className={styles.sub_title}>campers</p> */}
        </Link>
        <div className={styles.menu_wrapper}>
          {/* <a onClick={() => setIsOpen(true)}>ログイン</a>
          <a
            onClick={() => setIsOpen(true)}
            className={styles.create_accout_button}
          >
            アカウント作成
          </a> */}
        </div>
      </div>
    </header>
  );
}
