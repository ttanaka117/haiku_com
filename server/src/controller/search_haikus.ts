import { SearchRepository } from "../datasources/repository/search_repository";
import { HaikuRepository } from "../datasources/repository/haiku_repository";

export type SearchHaikusInput = {
  text?: string;
  textKana?: string;
  author?: string;
  season?: string;
};

interface Hit {
  _index: string;
  _type: string;
  _id: string;
  _score?: number;
  _source: {
    id: string;
    text: string;
    text_kana: string;
    author: string;
    season: string;
  };
}

const INDEX = "haikus";
export const searchHaikus = async ({
  searchRespository,
  haikuRepository,
  input,
}: {
  searchRespository: SearchRepository;
  haikuRepository: HaikuRepository;
  input: SearchHaikusInput;
}) => {
  console.log("start search haikus");
  const { body } = await searchRespository.search({
    index: INDEX,
    query: {
      body: {
        query: {
          bool: {
            should: [
              { match: { text: input.text } },
              { match: { text_kana: input.textKana } },
              { match: { author: input.author } },
              { match: { season: input.season } },
            ],
          },
        },
      },
    },
  });
  const haikus = await haikuRepository.fetchHaikusByIds({
    ids: body.hits.hits.map((h: Hit) => {
      return Number(h._source.id);
    }),
  });

  return haikus;
};
