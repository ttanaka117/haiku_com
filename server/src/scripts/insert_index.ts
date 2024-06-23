import { Repository } from "typeorm";
import { Client } from "@elastic/elasticsearch";
import { Haiku } from "../model/Haiku";

type IndexLetter = {
  id?: number;
  text?: string;
  text_kana?: string;
  season?: string;
  author?: string;
};

type inputIndexLetter = {
  [key in keyof IndexLetter]: string | number;
};
export const toInputHaikus = (input: Haiku[]): inputIndexLetter[] => {
  return input.map((i) => {
    return {
      id: i.id,
      text: i.text,
      text_kana: "",
      season: "",
      author: i.author ? i.author?.name : "",
    };
  });
};
export const insertIndex = async (
  repository: Repository<Haiku>,
  client: Client
) => {
  const haikus = await repository.find();
  console.log(haikus);
  const operations = toInputHaikus(haikus).flatMap((doc) => [
    { index: { _index: "haikus" } },
    doc,
  ]);

  await client.bulk({
    body: operations,
  });
};
