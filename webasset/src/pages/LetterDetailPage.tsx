import { LetterDetail } from "../components/atoms/LetterDetail";
import mtFuji from "../assets/mtfuji.jpg";
// import sea from "../assets/sea01.jpg";
import hashi from "../assets/hashi01.jpg";
import mori from "../assets/mori01.jpg";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";

export function LetterDetailPage() {
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    const expected = [mtFuji, hashi, mori];
    const index = Math.floor(Math.random() * (expected.length + 1 - 1) + 1);
    const picked = expected[index - 1];
    setImageUrl(picked);
  }, []);
  return <LetterDetail imgUrl={imageUrl} />;
}
