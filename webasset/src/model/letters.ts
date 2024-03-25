import { Poet } from "./poets";

export type Letters = {
  letters: Letter[];
};
export type Letter = {
  id: string;
  penname: string;
  poet: Poet | null;
  letterBody: string;
  letterBodyType: string;
  address: string;
  age: number;
  imageUrl: string;
  likesCount: number;
  description: string;
};
