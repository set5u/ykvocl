import type { WordElement, WordElementWithScore } from "~/types/words";
import { useWordsWithScore } from "../repository/useWordsWithScore";
const wordsWithScore = useWordsWithScore();
export const settings = {
  wordsToString() {
    const ret: WordElement[] = [];
    for (let i = 0; i < wordsWithScore.value.length; i++) {
      const c = wordsWithScore.value[i]!;
      ret.push([c[0], c[1]]);
    }
    return JSON.stringify(ret);
  },
  wordsWithScoreToString() {
    return JSON.stringify(wordsWithScore.value);
  },
  mergeWordsWithScore(
    data: WordElementWithScore[],
    overwrite: "src" | "dst" | "append",
    needsVaridation = true,
  ) {
    if (needsVaridation) {
      for (let i = 0; i < data.length; i++) {
        const c = data[i]!;
        if (
          c.length !== 3 ||
          typeof c[0] !== "string" ||
          typeof c[1] !== "string" ||
          typeof c[2] !== "number" ||
          c[2] <= 0
        ) {
          throw new Error("Varidation failed.");
        }
      }
    }
    for (let i = 0; i < data.length; i++) {
      const c = data[i]!;
      switch (overwrite) {
        case "src":
          if (wordsWithScore.value.findIndex((val) => val[0] === c[0]) === -1) {
            binaryInsert(wordsWithScore.value, c);
          }
          break;
        case "dst":
          let index: number;
          if (
            (index = wordsWithScore.value.findIndex(
              (val) => val[0] === c[0],
            )) === -1
          ) {
            binaryInsert(wordsWithScore.value, c);
          } else {
            wordsWithScore.value[index] != c;
          }
          break;
        case "append":
          binaryInsert(wordsWithScore.value, c);
      }
    }
  },
  mergeWords(data: WordElement[], overwrite: "src" | "dst" | "append") {
    for (let i = 0; i < data.length; i++) {
      const c = data[i]!;
      if (
        c.length !== 2 ||
        typeof c[0] !== "string" ||
        typeof c[1] !== "string"
      ) {
        throw new Error("Varidation failed.");
      }
    }
    const dataWithScore: WordElementWithScore[] = [];
    for (let i = 0; i < data.length; i++) {
      const c = data[i]!;
      dataWithScore.push([c[0], c[1], 1]);
    }
    settings.mergeWordsWithScore(dataWithScore, overwrite, false);
  },
};
