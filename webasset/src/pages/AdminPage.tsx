import { gql, useMutation } from "@apollo/client";
import styles from "./AdminPage.module.scss";
import { useEffect, useState } from "react";
import { produce } from "immer";
import Select, { type OptionsOrGroups, type GroupBase } from "react-select";
import { PREFECTURES } from "../assets/prefectures";
import { usePoetMutation } from "../graphql/types";

export function AdminPage() {
  const [mutation, _] = usePoetMutation();

  const [state, setState] = useState({
    name: "",
    birthYear: "",
    diedYear: "",
    imageUrl: "",
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>歌人を入力</div>
      <form
        onSubmit={async (e) => {
          const result = await mutation({
            variables: {
              ...state,
            },
          });
          e.preventDefault();
        }}
      >
        <ul>
          <li className={styles.form_wrapper}>
            <h3 className={styles.form_label}>名前</h3>
            <input
              className={styles.form_input}
              type="text"
              placeholder={"名前"}
              onChange={(e) =>
                setState(
                  produce(state, (draft) => {
                    draft.name = e.target.value;
                  })
                )
              }
            />
          </li>
          <li className={styles.form_wrapper}>
            <h3 className={styles.form_label}>生年</h3>
            <input
              className={styles.form_input}
              min={1}
              max={9000}
              defaultValue={2000}
              type="number"
              placeholder={"生年月日"}
              onChange={(e) =>
                setState(
                  produce(state, (draft) => {
                    draft.birthYear = e.target.value;
                  })
                )
              }
            />
          </li>
          <li className={styles.form_wrapper}>
            <h3 className={styles.form_label}>享年</h3>
            <input
              className={styles.form_input}
              min={1}
              max={9000}
              defaultValue={2000}
              type="number"
              placeholder={"生年月日"}
              onChange={(e) =>
                setState(
                  produce(state, (draft) => {
                    draft.diedYear = e.target.value;
                  })
                )
              }
            />
          </li>
          <div className={`${styles.form_submit_wrapper} m-t40`}>
            <button type="submit" value="保存" className={styles.form_submit}>
              保存
            </button>
          </div>
        </ul>
      </form>
    </div>
  );
}
