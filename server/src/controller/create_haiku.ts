import { DataSource } from "typeorm";
import { Poets } from "../model/Poet";
import { Haiku } from "../model/Haiku";
import { SearchRepository } from "../datasources/repository/search_repository";

type CreateHaikuInput = {
  text: string;
  description: string;
};
export const createHaiku = async (
  source: DataSource,
  searchRespository: SearchRepository,
  input: CreateHaikuInput
) => {
  const newHaiku = new Haiku();
  newHaiku.text = input.text;
  newHaiku.textKana = "kana";
  newHaiku.description = input.description;
  newHaiku.likesCount = 0;
  await source.getRepository(Haiku).save(newHaiku);
  await searchRespository.add_haiku(newHaiku);
  return {
    text: input.text,
    description: input.description,
  };
};
