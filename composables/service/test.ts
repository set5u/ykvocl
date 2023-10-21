import { binaryInsert } from "~/utils/binaryInsert";
import { useWordsWithScore } from "../repository/useWordsWithScore";
const wordsWithScore = useWordsWithScore();

export const test = {
  problem: computed(() => wordsWithScore.value[0]),
  updateScore(correct: boolean) {
    const problem = wordsWithScore.value.shift();
    if (problem) {
      correct ? (problem[2] *= 1.5) : (problem[2] /= 2);
      binaryInsert(wordsWithScore.value, problem);
    }
  },
};
