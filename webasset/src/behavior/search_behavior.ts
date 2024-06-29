import {
  ApolloClient,
  ApolloQueryResult,
  NormalizedCacheObject,
} from "@apollo/client";
import { HaikusDocument, SearchHaikusDocument } from "../graphql/types";
import { Haiku, HaikusEdges, toHaikuId } from "../model/haikus";
import { AppDispatch } from "..";
import { swapHaikus, isLoading, setAllHaikusCount } from "../slice/haikuSlice";

type Response = {
  searchHaikus: Haiku[];
};
export class SearchBehavior {
  private client: ApolloClient<NormalizedCacheObject>;
  private dispatch: AppDispatch;

  constructor(
    client: ApolloClient<NormalizedCacheObject>,
    dispatch: AppDispatch
  ) {
    this.client = client;
    this.dispatch = dispatch;
  }

  async searchHaikus({ input }: { input: string }) {
    this.dispatch(isLoading(true));
    const apolloQueryResult = await this.client.query<Response>({
      query: SearchHaikusDocument,
      variables: {
        searchHaikusInput: {
          text: input,
        },
      },
    });
    const searchResult: Haiku[] = apolloQueryResult.data.searchHaikus ?? [];
    this.dispatch(setAllHaikusCount(searchResult.length));
    this.dispatch(swapHaikus({ haikus: searchResult }));
    this.dispatch(isLoading(false));
  }

  async fetchHaikusWithPagination({ page }: { page: number }) {
    const response = await this.client.query<HaikusEdges>({
      query: HaikusDocument,
      variables: {
        limit: 50,
        after: page * 50,
      },
    });
    this.dispatch(
      swapHaikus({
        haikus: _toModel(response),
      })
    );
  }
}

const _toModel = (response: ApolloQueryResult<HaikusEdges>): Haiku[] => {
  return response.data.haikus.edges.map((edge) => {
    return {
      id: toHaikuId(edge.node.id),
      text: edge.node.text,
      textKana: edge.node.textKana,
      likesCount: edge.node.likesCount,
      author: edge.node.author,
      kigo: edge.node.kigo,
    };
  });
};
