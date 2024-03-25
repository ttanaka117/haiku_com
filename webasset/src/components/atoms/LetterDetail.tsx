import { useParams } from "react-router-dom";
import styles from "./LetterDetail.module.scss";
import imgShihondo from "../../assets/shihondou.jpg";
import { useState } from "react";
import { CampAreaDetailReview } from "./CampAreaDetailReview";
import { useSelector } from "react-redux";
import { RootState } from "../..";
import { toHumaniseSeason } from "../../model/haikus";

export type LetterDetailProps = {
  imgUrl: string;
};

type ActiveKey = "first" | "second" | "third" | "forth";

export function LetterDetail(props: LetterDetailProps) {
  let params = useParams<"letterId">();
  const [count, setCount] = useState();
  const [activeKey, setActiveKey] = useState<ActiveKey>("first");
  const haiku = useSelector((state: RootState) =>
    state.topPage.value.haikus.find((haiku) => haiku.id == params.letterId)
  );

  console.log(haiku);

  console.log(params.letterId);
  const rateMock = 4.4;
  const ratePer = (rateMock / 5) * 100;
  return (
    <div className={styles.content_card}>
      {haiku == null ?? <div></div>}
      <div className={styles.title}>{haiku?.text}</div>
      <div className="m-t30">
        <div className={`${styles.camp_area_info_wrapper} m-b40`}>
          {/* <i className={`i-mdi-map-marker m-r5 ${styles.icon_map_marker}`} /> */}
          <div className={`${styles.letter_type}`}>{haiku?.textKana}</div>
          {haiku?.kigo.length ? (
            <p>
              季語:{" "}
              {haiku?.kigo.map(
                (k) => `${k.season && toHumaniseSeason(k.season)} / ${k.name}`
              )}
            </p>
          ) : (
            ""
          )}
          <p>作者: {haiku?.author?.name ?? "不明"}</p>
        </div>
        {props.imgUrl && (
          <div className={`m-t50 ${styles.img}`}>
            <img className="img" src={props.imgUrl}></img>
          </div>
        )}
      </div>
    </div>
  );
}

{
  /* <div className={styles.reservation_wrapper}>
        <p className={styles.reservation}>電話予約</p>
      </div> */
}
{
  /* <img className={styles.img} src={props.imgUrl} /> */
}
{
  /* <div className={styles.tab_wrapper}>
        <div
          className={`${styles.tab_item} ${
            activeKey === "first" ? styles.active : ""
          }`}
          onClick={() => setActiveKey("first")}
        >
          キャンプ場情報
        </div>
        <div
          className={`${styles.tab_item} ${
            activeKey === "second" ? styles.active : ""
          }`}
          onClick={() => setActiveKey("second")}
        >
          口コミ
        </div>
        <div
          className={`${styles.tab_item} ${
            activeKey === "third" ? styles.active : ""
          }`}
          onClick={() => setActiveKey("third")}
        >
          写真
        </div>
        <div
          className={`${styles.tab_item} ${
            activeKey === "forth" ? styles.active : ""
          }`}
          onClick={() => setActiveKey("forth")}
        >
          地図
        </div>
      </div> */
}
