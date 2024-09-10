import { Link } from "react-router-dom";
import logo from "../../assets/taskflow.svg";
import styles from "./Header.module.scss";
import Modal from "react-modal";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState, apolloClient } from "../..";
import { HaikuBehavior } from "../../behavior/haiks_behavior";
import { useSelector } from "react-redux";
import { SearchForm } from "./SearchForm";
import { SearchBehavior } from "../../behavior/search_behavior";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [behavior, setBehavior] = useState<HaikuBehavior | null>(null);
  const [searchFormState, setSearchForm] = useState("");
  const [onSubmit, setOnSubmit] = useState(false);
  const [searchBehavior, setSearchBehavior] = useState<SearchBehavior | null>(
    null
  );
  useLayoutEffect(() => {
    const behavior = new HaikuBehavior(apolloClient, dispatch);
    const searchBehavior = new SearchBehavior(apolloClient, dispatch);
    setSearchBehavior(searchBehavior);
    setBehavior(behavior);
    if (behavior !== null) {
      behavior.initializeHaikus();
    }
  }, []);
  useEffect(() => {
    (async () => {
      if (searchFormState === "") {
        behavior?.initializeHaikus();
      } else {
        searchBehavior?.searchHaikus({ input: searchFormState });
      }
    })();
  }, [onSubmit]);
  const haikus = useSelector(
    (state: RootState) => state.haikuStore.backupHaikus.haikus
  );
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
          <p className={` ${styles.title}`}>
            <img src={logo} />
          </p>
          {/* <p className={styles.sub_title}>campers</p> */}
        </Link>
        <SearchForm
          setState={setSearchForm}
          onSubmit={async () => {
            setOnSubmit(!onSubmit);
          }}
        />
        <div className={styles.menu_wrapper}>
          <button
            onClick={() => {
              if (haikus.length) {
                behavior?.undoHaiku({ haiku: haikus[0] });
              }
              return;
            }}
          >
            <i className="i-mdi-undo" />
            戻る
          </button>
          {/* <a
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
