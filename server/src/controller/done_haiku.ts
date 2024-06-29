import { DataSource } from "typeorm";
import { Poets } from "../model/Poet";
import { Haiku } from "../model/Haiku";

export const doneHaiku = async (source: DataSource, haiku_id: number) => {
  const result = await source.getRepository(Haiku).delete({
    id: haiku_id,
  });
  return true;
};
