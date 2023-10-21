import { useWordsWithScore } from "../repository/useWordsWithScore";
const wordsWithScore = useWordsWithScore();
export const list = {
  getWordsWithScoreObject() {
    return computed(() => {
      const ret: {
        key: string;
        value: string;
        score: number;
        index: number;
      }[] = [];
      for (let i = 0; i < wordsWithScore.value.length; i++) {
        const row = wordsWithScore.value[i]!;
        ret.push({ key: row[0], value: row[1], score: row[2], index: i });
      }
      return ret;
    });
  },
  deleteAt(index: number) {
    wordsWithScore.value.splice(index, 1);
  },
};
