import { DataSource } from "typeorm";
import { fetchUsers } from "../controller/fetch_users";
import { fetchPoets } from "../controller/fetch_poets";
import { fetchHaikus } from "../controller/fetch_haikus";
import { SearchHaikusInput, searchHaikus } from "../controller/search_haikus";
import { poetReposiory, searchRepository } from "..";
import container from "../inversify.config";
import { TYPES } from "../datasources/repository/types";
import { HaikuRepository } from "../datasources/repository/haiku_repository";
import { fetchAllHaikusCount } from "../controller/fetch_all_haikus_count";
import { likeHaiku } from "../controller/like_haiku";
import { createHaiku } from "../controller/create_haiku";
import { dataSource } from "../datasource";
import { SearchRepository } from "../datasources/repository/search_repository";

export const createResolvers = () => {
  return {
    Query: {
      // users: () => fetchUsers(),
      haikus: async (_: string, input: { limit: number; after: number }) =>
        await fetchHaikus({
          repository: container.get<HaikuRepository>(TYPES.HaikuRepository),
          limit: input.limit,
          after: input.after,
        }),
      allHaikusCount: async () =>
        await fetchAllHaikusCount({
          repository: container.get<HaikuRepository>(TYPES.HaikuRepository),
        }),
      poets: async () =>
        await fetchPoets({
          repository: poetReposiory,
        }),
      searchHaikus: async (
        _: string,
        input: { searchHaikusInput: SearchHaikusInput }
      ) => {
        return await searchHaikus({
          searchRespository: searchRepository,
          haikuRepository: container.get<HaikuRepository>(
            TYPES.HaikuRepository
          ),
          input: input.searchHaikusInput,
        });
      },
    },
    Mutation: {
      createHaiku: async (_, { text, description }) =>
        await createHaiku(dataSource, searchRepository, {
          text: text,
          description: description,
        }),
      likeHaiku: async (_, { id }) =>
        await likeHaiku(container.get<DataSource>(TYPES.DataSource), id),
    },
  };
};
