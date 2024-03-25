import { useParams } from "react-router-dom";
import styles from "./CampAreaDetailReview.module.scss";
import imgShihondo from "../../assets/shihondou.jpg";
import { useState } from "react";
import { TabItem, TabSwicher } from "./TabSwitcher";
import Modal from "react-modal";

export type CampAreaDetailReviewProps = {
  // name: string;
  // address: string;
  // addressNumber: string;
  // imgUrl: string;
};

export function CampAreaDetailReview(props: CampAreaDetailReviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rateMock = 4.4;
  const ratePer = (rateMock / 5) * 100;
  return (
    <div>
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
        hello
        <button
          onClick={() => setIsOpen(false)}
          className={styles.review_post_button}
        >
          <i className="i-mdi-pencil" />
          投稿する
        </button>
      </Modal>
      <div className={styles.review_wrapper}>
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
        <button
          onClick={() => setIsOpen(true)}
          className={styles.review_post_button}
        >
          <i className="i-mdi-pencil" />
          口コミを投稿する
        </button>
      </div>
      <h2 className={`${styles.review_content_title}`}>クチコミ全件</h2>
      <div className={`${styles.review_content_wrapper}`}>
        <div className={`m-t20 ${styles.review_content_item}`}>
          <span>
            家族で大変快適に利用させていただきました。
            <br />
            近場に美しい湖があり綺麗でした。また利用させていただきます。
          </span>
          <div
            className={`m-b10 m-t10 ${styles.review_content_item_icon_wrapper}`}
          >
            <div className={styles.review_content_item_icon_base}>
              {(() => {
                const icons = [];
                for (let _i = 0; _i < 5; _i++) {
                  icons.push(
                    <i
                      key={_i}
                      className={`i-mdi-star ${styles.review_content_item_icon_review}`}
                    ></i>
                  );
                }
                return icons;
              })()}
            </div>
            <div
              className={styles.review_content_item_icon_overlay}
              style={{ width: `${ratePer}%` }}
            >
              {(() => {
                const icons = [];
                for (let _i = 0; _i < 5; _i++) {
                  icons.push(
                    <i
                      key={_i}
                      className={`i-mdi-star ${styles.review_content_item_icon_review}`}
                    ></i>
                  );
                }
                return icons;
              })()}
            </div>
            <span className={`${styles.review_content_item_name}`}>
              30代 長崎市在住 夫婦
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
