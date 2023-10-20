import { useStorage } from "@vueuse/core";
import { type WordElementWithScore } from "../../types/words";
export const useWordsWithScore = () =>
  useStorage<WordElementWithScore[]>("word_score", []);
