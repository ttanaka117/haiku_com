import { Edges } from "./edges";
import { Poet } from "./poets";
import { Id } from "./types";

export type HaikuId = Id<"Haiku"> & number;
export function toHaikuId(haikuId: number): HaikuId {
  return haikuId as HaikuId;
}

export type Haikus = {
  haikus: Haiku[];
};
export type Haiku = {
  id: HaikuId;
  text: string;
  textKana: string;
  author: Poet | null;
  kigo: Kigo[];
  likesCount: number;
};

export type HaikusEdges = {
  haikus: Edges<Haiku>;
};

export type Season = "summer" | "winter" | "fall" | "newyear" | "spring";
type Kigo = {
  id: string;
  name: string;
  nameKana: string;
  season?: Season;
};

export const toHumaniseSeason = (season: Season) => {
  if (season === "summer") return "夏";
  if (season === "winter") return "冬";
  if (season === "fall") return "秋";
  if (season === "newyear") return "新年";
  if (season === "spring") return "春";
  return "";
};

export const toSeason = (season: string) => {
  if (season === "春") return "spring";
  if (season === "夏") return "summer";
  if (season === "秋") return "fall";
  if (season === "新年") return "newyear";
  if (season === "冬") return "winter";
  return "";
};
