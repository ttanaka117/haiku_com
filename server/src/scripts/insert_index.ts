import { DataSource } from "typeorm";
import { Poets } from "../model/Poet";
import kigo from "./json/kigo.json" with { type: "json" };
import sanitized from "./json/sanitized/sanitize_kigo.json" with { type: "json" };
import { Kigo, Season } from "../model/Kigo";
import { Client } from "@elastic/elasticsearch";
import { Haiku } from "../model/Haiku";
import { SearchRepository } from "../datasources/repository/search_repository";
import { HaikuRepository } from "../datasources/repository/haiku_repository";

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
const _toInputHaikus = (input: Haiku[]): inputIndexLetter[] => {
  return input.map((i) => {
    return {
      id: i.id,
      text: i.text,
      text_kana: i.textKana,
      season: i.kigo[0]?.season ? i.kigo[0].season : "",
      author: i.author ? i.author?.name : "",
    };
  });
};
export const insertIndex = async (repository: HaikuRepository, client: Client) => {
  const haikus = await repository.fetchHaikus()
  if (!haikus) return;

  const operations = _toInputHaikus(haikus).flatMap((doc) => [
    { index: { _index: "haikus" } },
    doc,
  ]);

  await client.bulk({
    body: operations,
  });
};
