export type Poets = {
  poets: Poet[];
};
export type Poet = {
  id: string;
  name: string;
  birthYear: number;
  diedYear: number;
  imageUrl: string | null;
};
