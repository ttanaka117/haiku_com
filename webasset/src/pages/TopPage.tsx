import { LetterContentCard } from "../components/atoms/LetterContentCard";
import { ContentCardWrapper } from "../components/molecules/ContentCardWrapper";
import { useSelector } from "react-redux";
import { type RootState } from "..";
import { useEffect, useState } from "react";
import Fab from "@mui/material/Fab";
import Modal from "react-modal";
import { PostLetterForm } from "../components/molecules/PostLetterForm";
import Pagination from "@mui/material/Pagination";
import styles from "./TopPage.module.scss";
import { HaikuBehavior } from "../behavior/haiks_behavior";
import { GlobalLoader } from "../components/molecules/GlobalLoader";

const ItemCountByPage = 50;
export function TopPage() {
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [pageCount, setPageCount] = useState(0);

  const isLoading = useSelector((state: RootState) => state.haikuStore.loading);
  const haikus = useSelector(
    (state: RootState) => state.haikuStore.value.haikus
  );
  const allHaikusCount = useSelector(
    (state: RootState) => state.haikuStore.allHaikusCount
  );

  const [behavior, setBehavior] = useState<HaikuBehavior | null>(null);

  useEffect(() => {
    behavior?.fetchHaikusWithPagination({
      page: page,
    });
  }, [page]);

  useEffect(() => {
    setPageCount(Math.floor(allHaikusCount / ItemCountByPage));
  }, [allHaikusCount]);

  useEffect(() => {
    behavior?.sortHaikuByPriority();
  }, [haikus]);

  return (
    <div>
      {isLoading && <GlobalLoader />}
      <div id="layout-page" className={styles.wrapper}>
        {/* <Sidebar
          baseZIndex={100000000000}
          visible={true}
          onHide={() => null}
        ></Sidebar> */}
        <div className={styles.sidebar_left}>
          <ul>
            <li>
              <span className={styles.title}>
                <i className="i-mdi-folder-outline" />
                <div>Projects</div>
              </span>
              <ul>
                <li>
                  <span className={styles.item}>
                    <i className="i-mdi-format-list-bulleted" />
                    <div>クライアントポータル</div>
                  </span>
                </li>
                <li>
                  <span className={styles.item}>
                    <i className="i-mdi-format-list-bulleted" />
                    <div>expert/lite開発</div>
                  </span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className={styles.sidebar_right}>
          {/* <SearchForm
            setState={setSearchForm}
            onSubmit={async () => {
              setOnSubmit(!onSubmit);
            }}
          /> */}
          <ContentCardWrapper>
            {/* <LetterTitleCard label="TODO"></LetterTitleCard>
            <LetterTitleCard label="IN REVIEW"></LetterTitleCard>
            <LetterTitleCard label="DONE"></LetterTitleCard> */}
            {haikus.map((haiku) => {
              return (
                <LetterContentCard
                  key={haiku.id}
                  id={haiku.id}
                  text={haiku.text}
                  textKana={haiku.textKana}
                  kigo={haiku.kigo}
                  likesCount={haiku.likesCount}
                  author={haiku.author}
                />
              );
            })}
          </ContentCardWrapper>
          <Fab
            style={{
              position: "fixed",
              bottom: 50,
              right: 280,
              backgroundColor: "rgb(99, 99, 99)",
            }}
            size={"large"}
            color={"primary"}
            onClick={() => setIsOpen(true)}
          >
            <i className={`i-mdi-add f-s20`}></i>
          </Fab>
          <Modal
            isOpen={isOpen}
            closeTimeoutMS={200}
            contentLabel="Post Letter Modal"
            style={{
              overlay: {
                zIndex: 1000 * 1000,
                transition: "opacity 200ms ease-in-out",
              },
              content: {
                width: "700px",
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
                boxShadow: "0px 0px 15px 0px rgba(0, 0, 0, 0.2)",
                padding: "40px",
              },
            }}
          >
            <div>
              <PostLetterForm
                handleClose={() => {
                  setIsOpen(false);
                }}
              />
            </div>
          </Modal>
          {haikus.length > ItemCountByPage ?? (
            <Pagination
              count={pageCount}
              className={styles.pagenation_wrapper}
              classes={{ ul: styles.pagenation_wrapper }}
              page={page}
              onChange={(_, page) => {
                setPage(page);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
