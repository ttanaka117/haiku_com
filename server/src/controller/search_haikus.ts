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

export const searchHaikus = async ({
  searchRespository,
  haikuRepository,
  input,
}: {
  searchRespository: SearchRepository;
  haikuRepository: HaikuRepository;
  input: SearchHaikusInput;
}) => {
  const { body } = await searchRespository.search({
    index: "haikus",
    input: {
      match: {
        text: input.text,
        // { match: { text_kana: input.textKana } },
        // { match: { author: input.author } },
        // { match: { season: input.season } },
      },
    },
  });

  console.log(body.hits.hits);
  const haikus = await haikuRepository.fetchHaikusByIds({
    ids: body.hits.hits.map((h: Hit) => {
      console.log(h._source.id);
      return Number(h._source.id);
    }),
  });
  console.log(haikus);

  return haikus;
};
