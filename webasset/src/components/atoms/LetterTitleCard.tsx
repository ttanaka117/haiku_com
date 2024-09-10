import styles from "./LetterTitleCard.module.scss";
import { useLikeHaikuMutation } from "../../graphql/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, apolloClient } from "../..";
// import { likeLetter } from "../../slice/topPageSlice";
import { useLayoutEffect, useState } from "react";
import { Haiku } from "../../model/haikus";
import { likeHaiku } from "../../slice/haikuSlice";
import { HaikuBehavior } from "../../behavior/haiks_behavior";

export function LetterTitleCard(props: { label: string }) {
  const [mutation] = useLikeHaikuMutation();
  const dispatch = useDispatch<AppDispatch>();
  const [behavior, setBehavior] = useState<HaikuBehavior | null>(null);
  const [done, setDone] = useState(1);
  const haikus = useSelector(
    (state: RootState) => state.haikuStore.value.haikus
  );
  useLayoutEffect(() => {
    const behavior = new HaikuBehavior(apolloClient, dispatch);
    setBehavior(behavior);
  }, []);

  return (
    <div
      className={styles.content_card}
      style={{
        opacity: done,
      }}
    >
      <p className={`${styles.letterBody}`}>
        <div>{props.label}</div>
        {/* <div
          // onClick={async () => {
          //   setDone(0);
          //   await new Promise(function (resolve) {
          //     setTimeout(resolve, 500);
          //   });
          //   await behavior?.doneHaiku({ haiku_id: props.id });
          //   const haiku = haikus.find((h) => {
          //     return h.id === props.id;
          //   });
          //   if (haiku) {
          //     await behavior?.backupHaiku({ haiku: haiku });
          //   }
          // }}
          className={`${styles.iconDone}`}
        >
          <i className={` i-mdi-check`} />
        </div> */}
      </p>
      {/* <div className={styles.letterBodyBottom}>
        <div className={`flex-container`}>
          <button className={styles.like_button}>
            <i className="i-mdi-priority-high" />
          </button>
        </div>
      </div> */}
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
