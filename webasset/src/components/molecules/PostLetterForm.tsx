import { FetchResult } from "@apollo/client";
import styles from "./PostLetterForm.module.scss";
import { useEffect, useState } from "react";
import { produce } from "immer";
import Select from "react-select";
import {
  LetterMutation,
  useCreateSearchLetterMutation,
  useLetterMutation,
  usePoetsQuery,
} from "../../graphql/types";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../..";
import { addLetter } from "../../slice/topPageSlice";

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

  const [postsState, setPoetsState] = useState<Poet[]>([]);
  const [letterMutation] = useLetterMutation();
  const [createSearchLetterMutation] = useCreateSearchLetterMutation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log(data);
    if (data?.poets == undefined) return;

    const poets = data?.poets.map((p) => {
      return { id: Number(p?.id) ?? null, name: p?.name ?? null };
    });

    setPoetsState(poets);
  }, [loading]);

  const handleMutation = async () => {
    if (state.poetId == 0) {
      toast("必須項目が入力されていません。");
      return;
    }
    try {
      const result = await letterMutation({
        variables: {
          ...state,
        },
      });
      console.log(`letterMutation: ${result}`);
      const _fromCreateLetter = (fetchResult: FetchResult<LetterMutation>) => {
        return {
          id: fetchResult.data?.createLetter?.id?.toString() ?? "",
          penname: fetchResult.data?.createLetter?.penname ?? "",
          poet: {
            id: fetchResult.data?.createLetter?.poet?.id ?? "",
            name: fetchResult.data?.createLetter?.poet?.name ?? "",
            birthYear: fetchResult.data?.createLetter?.poet?.birthYear ?? 0,
            diedYear: fetchResult.data?.createLetter?.poet?.diedYear ?? 0,
            imageUrl: fetchResult.data?.createLetter?.poet?.imageUrl ?? "",
          },
          letterBody: fetchResult.data?.createLetter?.letterBody ?? "",
          letterBodyType: fetchResult.data?.createLetter?.letterBodyType ?? "",
          age: fetchResult.data?.createLetter?.age ?? 0,
          imageUrl: fetchResult.data?.createLetter?.imageUrl ?? "",
          address: fetchResult.data?.createLetter?.address ?? "",
          description: fetchResult.data?.createLetter?.description ?? "",
          likesCount: 0,
        };
      };
      dispatch(addLetter(_fromCreateLetter(result)));
      await createSearchLetterMutation({
        variables: {
          inputLetter: {
            id: Number(_fromCreateLetter(result).id),
            penname: _fromCreateLetter(result).penname,
            letterBody: _fromCreateLetter(result).letterBody,
            letterBodyType: _fromCreateLetter(result).letterBodyType,
            description: _fromCreateLetter(result).description,
          },
        },
      });
      toast("投稿しました。");
      props.handleClose();
    } catch (e) {
      toast("投稿に失敗しました。");
      console.log(error);
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
          {/* <li className={styles.form_wrapper}>
            <h3 className={styles.form_label}>名前</h3>
            <input
              className={styles.form_input}
              type="text"
              placeholder={"名前"}
              onChange={(e) =>
                setState(
                  produce(state, (draft) => {
                    draft.penname = e.target.value;
                  })
                )
              }
            />
          </li> */}
          <li className={styles.form_wrapper}>
            <h3 className={styles.form_label}>名前</h3>
            <Select
              placeholder="名前"
              className={`${styles.form_input_select}`}
              options={postsState.map((poet) => {
                return {
                  value: poet.id,
                  label: poet.name,
                };
              })}
              onChange={(event) =>
                setState(
                  produce(state, (draft) => {
                    draft.poetId = event?.value ?? 0;
                  })
                )
              }
            />
          </li>
          <li className={styles.form_wrapper}>
            <h3 className={styles.form_label}>詩</h3>
            <textarea
              className={styles.form_input}
              placeholder={"詩"}
              onChange={(e) =>
                setState(
                  produce(state, (draft) => {
                    draft.letterBody = e.target.value;
                  })
                )
              }
            />
          </li>
          <li className={styles.form_wrapper}>
            <h3 className={styles.form_label}>詩の説明</h3>
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
          <li className={styles.form_wrapper}>
            <h3 className={styles.form_label}>形式</h3>
            <Select
              placeholder="形式"
              className={`${styles.form_input_select}`}
              options={[
                { value: "詩", label: "詩" },
                { value: "定型俳句", label: "定型俳句" },
                { value: "自由律俳句", label: "自由律俳句" },
                { value: "その他", label: "その他" },
              ]}
              onChange={(event) =>
                setState(
                  produce(state, (draft) => {
                    draft.letterBodyType =
                      (event?.value as LetterBodyType) ?? "その他";
                  })
                )
              }
            />
          </li>
          <li className={styles.form_wrapper}>
            <h3 className={styles.form_label}>読まれた場所</h3>
            <input
              className={styles.form_input}
              type="text"
              placeholder={"読まれた場所"}
              onChange={(e) =>
                setState(
                  produce(state, (draft) => {
                    draft.address = e.target.value;
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
