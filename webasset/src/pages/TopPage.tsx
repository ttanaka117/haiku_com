import { LetterContentCard } from "../components/atoms/LetterContentCard";
import { ContentCardWrapper } from "../components/molecules/ContentCardWrapper";
import { useDispatch, useSelector } from "react-redux";
import { apolloClient, AppDispatch, type RootState } from "..";
import { useEffect, useLayoutEffect, useState } from "react";
import { SearchForm } from "../components/atoms/SearchForm";
import Fab from "@mui/material/Fab";
import Modal from "react-modal";
import { PostLetterForm } from "../components/molecules/PostLetterForm";
import { SearchHaikusDocument } from "../graphql/types";
import { Haiku, toSeason } from "../model/haikus";
import Pagination from "@mui/material/Pagination";
import styles from "./TopPage.module.scss";
import { haikuBehavior } from "../behavior/haiks_behavior";
import { GlobalLoader } from "../components/molecules/GlobalLoader";
import { swapHaikus } from "../slice/haikuSlice";

type Response = {
  searchHaikus: Haiku[];
};
export function TopPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const [searchFormState, setSearchForm] = useState("");

  const isLoading = useSelector((state: RootState) => state.haikuStore.loading);
  const haikus = useSelector(
    (state: RootState) => state.haikuStore.value.haikus
  );

  const [onSubmit, setOnSubmit] = useState(false);
  const [behavior, setBehavior] = useState<haikuBehavior | null>(null);

  console.log(haikus);

  useLayoutEffect(() => {
    const behavior = new haikuBehavior(apolloClient, dispatch);
    setBehavior(behavior);
    if (behavior !== null) {
      behavior.initializeHaikus();
    }
  }, []);

  useEffect(() => {
    (async () => {
      await behavior?.fetchHaikusWithPagination({
        page: page,
      });
    })();
  }, [page]);

  useEffect(() => {
    if (searchFormState === "") {
      behavior?.initializeHaikus();
      return;
    }

    (async () => {
      const apolloQueryResult = await apolloClient.query<Response>({
        query: SearchHaikusDocument,
        variables: {
          searchHaikusInput: {
            text: searchFormState,
            textKana: searchFormState,
            author: searchFormState,
            season: toSeason(searchFormState),
          },
        },
      });
      const searchResult: Haiku[] = apolloQueryResult.data.searchHaikus ?? [];
      console.log(searchResult);

      dispatch(swapHaikus({ haikus: searchResult }));
    })();
  }, [onSubmit]);

  useEffect(() => {
    if (searchFormState.length === 0) {
    }
  }, [searchFormState]);

  return (
    <div>
      {isLoading && <GlobalLoader />}
      <div id="layout-page">
        <SearchForm
          setState={setSearchForm}
          onSubmit={async () => {
            setOnSubmit(!onSubmit);
          }}
        />
        <ContentCardWrapper>
          {haikus.map((haiku) => {
            return (
              <LetterContentCard
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
            backgroundColor: "#a42b2b",
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
        <Pagination
          count={40}
          className={styles.pagenation_wrapper}
          classes={{ ul: styles.pagenation_wrapper }}
          page={page}
          onChange={(_, page) => {
            setPage(page);
          }}
        />
      </div>
    </div>
  );
}
