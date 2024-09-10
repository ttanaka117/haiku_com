import Select, { type OptionsOrGroups, type GroupBase } from "react-select";
import styles from "./SearchForm.module.scss";
export type SearchFormProps = {
  setState: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
};

export function SearchForm(props: SearchFormProps) {
  return (
    <div className={styles.search_form}>
      <div className={styles.search_form_wrapper}>
        <input
          className={styles.search_form_input}
          type="text"
          onInput={(v) => props.setState(v.currentTarget.value.trimEnd())}
          onKeyDown={(e) => (e.code === "Enter" ? props.onSubmit() : null)}
          placeholder={"タスクを探す"}
        />
        <label
          className={styles.search_form_label}
          onClick={() => props.onSubmit()}
          htmlFor="search-keyword"
        >
          検索
        </label>
      </div>
    </div>
  );
}

{
  /* <div className={styles.nav_heading_wrapper}>
<div
  id={"camp_area"}
  className={`${styles.nav_heading} is_active`}
  onClick={() => console.log("isAc")}
>
  キャンプ場情報
</div>
<div
  id={"review"}
  className={styles.nav_heading}
  onClick={() => setActiveKey("review")}
>
  口コミ
</div>
<div
  id={"photo"}
  className={styles.nav_heading}
  onClick={() => setActiveKey("photo")}
>
  写真
</div>
<div
  id={"map"}
  className={styles.nav_heading}
  onClick={() => setActiveKey("map")}
>
  地図
</div>
</div> */
}
