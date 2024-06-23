import { DataSource } from "typeorm";
import { Poets } from "../model/Poet";
import { Haiku } from "../model/Haiku";

export const likeHaiku = async (source: DataSource, haiku_id: number) => {
  const result = await source.getRepository(Haiku).findOneBy({
    id: haiku_id,
  });
  result.likesCount = result.likesCount + 1;
  source.getRepository(Haiku).save(result);
  return { likesCount: result.likesCount };
};
