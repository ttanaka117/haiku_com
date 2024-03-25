import { Link } from "react-router-dom";
import styles from "./LetterContentCard.module.scss";
import { Letter } from "../../model/letters";
import { useLikeLetterMutation } from "../../graphql/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../..";
// import { likeLetter } from "../../slice/topPageSlice";
import { useState } from "react";
import { Haiku } from "../../model/haikus";

export function LetterContentCard(props: Haiku) {
  const rateMock = 4.4;
  // const ratePer = (rateMock / 5) * 100;

  const [mutation, { data, error }] = useLikeLetterMutation();
  const dispatch = useDispatch<AppDispatch>();
  const [disabled, setDisabled] = useState(false);

  return (
    <div className={styles.content_card}>
      <Link to={`/letter_detail/${props.id}`}>
        <p className={`${styles.letterBody} m-b10`}>{props.text}</p>
      </Link>
      <div className={styles.letterBodyBottom}>
        <div className={`flex-container`}>
          <button
            className={styles.like_button}
            onClick={() => {
              if (disabled) return;
              try {
                // mutation({ variables: { id: parseInt(props.id) } });
                // dispatch(likeLetter(props.id));
                setDisabled(true);
              } catch {}
            }}
          >
            <i className="i-mdi-heart" />
          </button>
          {props.likesCount}
        </div>
        <div>
          <Link to={`/poet_detail/${props.author?.id}`}>
            {props.author?.name ?? "不明"} /{" "}
          </Link>
          {props.kigo.map((k) => k.name)}
        </div>
      </div>
    </div>
  );
}

{
  /* <p className={styles.address}>{props.letterBodyType}</p> */
}
{
  /* <h3 className={styles.heading}>クチコミ</h3> */
}
{
  /* <div className={`m-t15 ${styles.review_wrapper}`}>
        <div className={styles.icon_wrapper}>
          <div className={styles.icon_base}>
            {(() => {
              const icons = [];
              for (let _i = 0; _i < 5; _i++) {
                icons.push(
                  <i
                    key={_i}
                    className={`i-mdi-star ${styles.icon_review}`}
                  ></i>
                );
              }
              return icons;
            })()}
          </div>
          <div className={styles.icon_overlay} style={{ width: `${ratePer}%` }}>
            {(() => {
              const icons = [];
              for (let _i = 0; _i < 5; _i++) {
                icons.push(
                  <i
                    key={_i}
                    className={`i-mdi-star ${styles.icon_review}`}
                  ></i>
                );
              }
              return icons;
            })()}
          </div>
        </div>
        <span className={styles.rate_num}>{rateMock}</span>
        <span className={styles.review_num}>( 8件 )</span>
      </div> */
}
{
  /* 
      <ul className={styles.check_list}>
        <li>
          <i className={`i-mdi-fire m-r5 ${styles.icon_fire}`} />
          焚き火 OK
        </li>
        <li>
          <i className={`i-mdi-water m-r5 ${styles.icon_water}`} />
          炊事場あり
        </li>
      </ul> */
}
