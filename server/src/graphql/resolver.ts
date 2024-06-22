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
      // Todo: Implements Haiku
      // createHaiku: async (
      //   _,
      //   {
      //     penname,
      //     poetId,
      //     letterBody,
      //     letterBodyType,
      //     address,
      //     age,
      //     imageUrl,
      //     description,
      //   }
      // ) =>
      //   await createHaiku(source, {
      //     penname: penname,
      //     poetId: poetId,
      //     letterBody: letterBody,
      //     letterBodyType: letterBodyType,
      //     address: address,
      //     age: age,
      //     imageUrl: imageUrl,
      //     description: description,
      //   }),
      // likeLetter: async (_, { id }) =>
      //   await likeLetter(source, {
      //     id: id,
      //   }),
    },
  };
};
