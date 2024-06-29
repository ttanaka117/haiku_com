import styles from "./PostLetterForm.module.scss";
import { useEffect, useLayoutEffect, useState } from "react";
import Select from "react-select";
import { produce } from "immer";
import {
  useCreateHaikuMutation,
  useCreateSearchLetterMutation,
  usePoetsQuery,
} from "../../graphql/types";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AppDispatch, apolloClient } from "../..";
import { HaikuBehavior } from "../../behavior/haiks_behavior";

type LetterBodyType = "詩" | "定型俳句" | "自由律俳句" | "その他";
type FormLetter = {
  id: number | null;
  penname: string;
  poetId: number;
  letterBody: string;
  letterBodyType: LetterBodyType;
  address: string;
  age: number;
  imageUrl: string;
  description: string;
};

type Poet = {
  id: number | null;
  name: string | null;
};
export function PostLetterForm(props: { handleClose: () => void }) {
  const [state, setState] = useState<FormLetter>({
    id: null,
    penname: "",
    poetId: 0,
    letterBody: "",
    letterBodyType: "その他",
    address: "",
    age: 0,
    imageUrl: "",
    description: "",
  });
  const { loading, error, data } = usePoetsQuery();

  const [haikuMutation] = useCreateHaikuMutation();
  const [createSearchLetterMutation] = useCreateSearchLetterMutation();
  const dispatch = useDispatch<AppDispatch>();
  const [behavior, setBehavior] = useState<HaikuBehavior | null>(null);
  const [done, setDone] = useState(1);

  useLayoutEffect(() => {
    const behavior = new HaikuBehavior(apolloClient, dispatch);
    setBehavior(behavior);
  }, []);
  useEffect(() => {}, [loading]);

  const handleMutation = async () => {
    try {
      await behavior?.addHaiku({
        text: state.letterBody,
        description: state.description,
      });
      toast("投稿しました。");
      props.handleClose();
    } catch (e) {
      toast("投稿に失敗しました。");
      console.log(e);
    }
  };

  return (
    <div className={styles.wrapper}>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await handleMutation();
        }}
        onReset={() => props.handleClose()}
      >
        <ul>
          <li className={styles.form_wrapper}>
            <h3 className={styles.form_label}>やるべきこと</h3>
            <textarea
              className={styles.form_input}
              placeholder={"やるべきこと"}
              onChange={(e) =>
                setState(
                  produce(state, (draft) => {
                    draft.letterBody = e.target.value;
                  })
                )
              }
            />
          </li>
          {/* <Select
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                padding: "7px",
                border: "none",
                fontSize: "14px",
              }),
            }}
            placeholder="作家名"
            className={`${styles.form_input_select}`}
            options={[
              { value: undefined, label: "指定しない" },
              { value: "種田山頭火", label: "種田山頭火" },
              { value: "尾崎放哉", label: "尾崎放哉" },
            ]}
            onChange={(e) =>
              setState(
                produce(state, (draft) => {
                  draft.description = e?.value ?? "";
                })
              )
            }
          /> */}
          <li className={styles.form_wrapper}>
            <h3 className={styles.form_label}>説明</h3>
            <input
              className={styles.form_input}
              type="text"
              placeholder={"説明"}
              onChange={(e) =>
                setState(
                  produce(state, (draft) => {
                    draft.description = e.target.value;
                  })
                )
              }
            />
          </li>
          <div className={`${styles.form_submit_wrapper} m-t40`}>
            <button type="submit" value="保存" className={styles.form_submit}>
              投稿する
            </button>
            <button
              type="reset"
              value="キャンセル"
              className={styles.form_cancel}
            >
              閉じる
            </button>
          </div>
        </ul>
      </form>
    </div>
  );
}
