import { LetterDetail } from "../components/atoms/LetterDetail";
import mtFuji from "../assets/mtfuji.jpg";
// import sea from "../assets/sea01.jpg";
import hashi from "../assets/hashi01.jpg";
import mori from "../assets/mori01.jpg";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { PoetsQueryResult, usePoetsQuery } from "../graphql/types";
import { Poet, Poets } from "../model/poets";

export function PoetDetailPage() {
  const [imageUrl, setImageUrl] = useState("");
  const [poets, setPoets] = useState<Poet[]>([]);
  const { loading, error, data } = usePoetsQuery();
  useEffect(() => {
    const expected = [mtFuji, hashi, mori];
    const index = Math.floor(Math.random() * (expected.length + 1 - 1) + 1);
    const picked = expected[index - 1];
    setImageUrl(picked);
    if (data && data.poets) {
      const poets = data.poets.map((p) => {
        return {
          id: p?.id ?? "",
          name: p?.name ?? "",
          birthYear: p?.birthYear ?? 0,
          diedYear: p?.diedYear ?? 0,
          imageUrl: p?.imageUrl ?? "",
        };
      });
      setPoets(poets);
    }
  }, [loading]);
  let params = useParams<"poetId">();
  console.log(params.poetId);

  if (params.poetId == undefined || poets == undefined) return <div></div>;
  return (
    <div>
      {poets.find((p) => p.id == params.poetId)?.id}
      {poets.find((p) => p.id == params.poetId)?.name}
    </div>
  );
  // return <PoetDetail imgUrl={imageUrl} />;
}
