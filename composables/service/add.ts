import { useWordsWithScore } from "../repository/useWordsWithScore";
const wordsWithScore = useWordsWithScore();
export const add = {
  addWord(key: string, value: string) {
    wordsWithScore.value.splice(0, 0, [key, value, 1]);
  },
};
